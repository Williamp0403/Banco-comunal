import { db } from "../config/db.js";

export class ProjectModel {

  static async queryGetProjects () {
    const getProjects = await db.execute(
      `SELECT id_proyecto, u.nombre nombre_usuario, apellido apellido_usuario, 
      p.nombre, descripcion, monto_total, monto_gastado, estado, 
      DATETIME(fecha_inicio, '-4 hours') AS fecha_inicio, DATE(fecha_fin) AS fecha_fin 
      FROM Proyectos p JOIN Usuarios u ON p.id_usuario = u.id_usuario
      ORDER BY id_proyecto DESC`
    )
    return getProjects.rows
  }

  static async queryCreateProject (data, id) {
    const { nombre, descripcion, monto_total, estado, fecha_fin } = data

    const normalizeText = (text) => text.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    const normalizedNombre = normalizeText(nombre);

    const existingProject = await db.execute({
      sql: 'SELECT * FROM Proyectos WHERE LOWER(nombre) = LOWER(?)',
      args: [normalizedNombre]
    })

    if (existingProject.rows.length > 0) return { success: false, message: "El nombre del proyecto ya existe." }

    if(estado === "Pendiente") {
      const pendingProject = await db.execute({
        sql: 'INSERT INTO Proyectos (id_usuario, nombre, descripcion, monto_total, estado) VALUES (?, ?, ?, ?, ?) RETURNING *',
        args: [id, nombre, descripcion, monto_total, estado]
      })
      return { success: true, project: pendingProject.rows }
    }

    const progressProject = await db.execute({
      sql: 'INSERT INTO Proyectos (id_usuario, nombre, descripcion, monto_total, estado, fecha_inicio, fecha_fin) VALUES (?, ?, ?, ?, ?, CURRENT_TIMESTAMP, ?) RETURNING *',
      args: [id, nombre, descripcion, monto_total, estado, fecha_fin]
    })
    return { success: true, project: progressProject.rows }
  }

  static async queryUpdateStateProject (data, id) {
    const { fecha_fin } = data
    
    const updatedState = await db.execute({
      sql: 'UPDATE Proyectos SET estado = "En Progreso", fecha_inicio = CURRENT_TIMESTAMP, fecha_fin = ? WHERE id_proyecto = ? AND estado = "Pendiente" RETURNING *',
      args: [ fecha_fin, id]
    })

    if(updatedState.rowsAffected === 0) return { success: false, message: 'El proyecto no existe.' }

    return {
      success: true,
      project: {
        id_proyecto: updatedState.rows[0].id_proyecto,
        estado: updatedState.rows[0].estado,
        fecha_inicio: updatedState.rows[0].fecha_inicio,
        fecha_fin: updatedState.rows[0].fecha_fin
      }
    }
  }


  static async queryUpdateExpiredProjects () {
    await db.execute(`
      UPDATE Proyectos
      SET estado = 'Completado'
      WHERE estado = 'En Progreso' AND fecha_fin <= CURRENT_TIMESTAMP;
      `);
}

  static async queryDeleteProject (id) {
    const deleteProject = await db.execute({
      sql: 'DELETE FROM Proyectos WHERE id_proyecto = ? RETURNING *' ,
      args: [id]
    })

    if(deleteProject.rowsAffected === 0) return { success: false, message: 'El proyecto no existe.' }

    return {
      success: true,
      message: 'Proyecto eliminado correctamente.',
      project: deleteProject.rows[0].id_proyecto
    }
  }

  static async queryAddAmount (data, id, id_user) {
    const { monto, descripcion } = data

    // Agregando el monto al proyecto elegido.
    const addAmount = await db.execute({
      sql: 'UPDATE Proyectos SET monto_total = ROUND(monto_total + ?, 2) WHERE id_proyecto = ? AND estado = "En Progreso" RETURNING *',
      args: [monto ,id]
    })

    // Verificando si el proyecto existe.
    if(addAmount.rowsAffected === 0) return { success: false, message: 'El proyecto no existe.' }

    // Recuperando el saldo total del banco comunal.
    const newAmountBank = await db.execute('SELECT saldo_total FROM BancoComunal WHERE id_banco = 1')

    const project = {
      id_proyecto: addAmount.rows[0].id_proyecto,
      monto_total: addAmount.rows[0].monto_total
    }

    // Agregando la accion a Movimientos.
    const newMovement = await db.execute({
      sql: 'INSERT INTO Movimientos (id_usuario, id_proyecto, transaccion, monto, descripcion, fecha) VALUES (?, ?, ?, ?, ?, CURRENT_TIMESTAMP) RETURNING *',
      args: [id_user, project.id_proyecto, 'Depósito', monto, descripcion]
    })

    // Obteniendo la informacion del movimiento.
    const movement = await db.execute({
      sql: `SELECT m.id_movimiento, m.id_usuario, u.nombre AS nombre_usuario, u.apellido AS apellido_usuario, m.id_proyecto, p.nombre AS nombre_proyecto, m.transaccion, m.monto, m.descripcion, DATETIME(m.fecha, '-4 hours') AS fecha
          FROM Movimientos m
          JOIN Usuarios u ON m.id_usuario = u.id_usuario
          JOIN Proyectos p ON m.id_proyecto = p.id_proyecto 
          WHERE m.id_movimiento = ?`,
      args: [newMovement.rows[0].id_movimiento]
    })

    return {
      success: true,
      message: 'Saldo agregado correctamente.',
      project,
      newTotalAmount: newAmountBank.rows[0].saldo_total,
      movement: movement.rows[0]
    }
  }

  static async queryWithDrawAmount(data, id, id_user) {
    const { monto, descripcion } = data

    const getProject = await db.execute({
      sql: 'SELECT monto_total, monto_gastado FROM Proyectos WHERE id_proyecto = ?',
      args: [id]
    })

    if(getProject.rows.length === 0) return { success: false, status: 404, message: 'EL proyecto no existe.' }

    const { monto_total, monto_gastado } = getProject.rows[0]
    const monto_disponible = monto_total - monto_gastado

    if(monto > monto_disponible) return { success: false, status: 409, message: 'Saldo insuficiente.' }

    const withDrawAmount = await db.execute({
      sql: 'UPDATE Proyectos SET monto_gastado = ROUND(monto_gastado + ?, 2) WHERE id_proyecto = ? AND estado = "En Progreso" RETURNING *' ,
      args: [monto, id]
    })

    const newAmountBank = await db.execute('SELECT saldo_total FROM BancoComunal WHERE id_banco = 1')
 
    const project = {
      id_proyecto: withDrawAmount.rows[0].id_proyecto,
      monto_gastado: withDrawAmount.rows[0].monto_gastado
    }
    
    const newMovement = await db.execute({
      sql: 'INSERT INTO Movimientos (id_usuario, id_proyecto, transaccion, monto, descripcion, fecha) VALUES (?, ?, ?, ?, ?, CURRENT_TIMESTAMP) RETURNING *',
      args: [id_user, project.id_proyecto, 'Retiro', monto, descripcion]
    })

    const movement = await db.execute({
      sql: `SELECT m.id_movimiento, m.id_usuario, u.nombre AS nombre_usuario, u.apellido AS apellido_usuario, m.id_proyecto, p.nombre AS nombre_proyecto, m.transaccion, m.monto, m.descripcion, DATETIME(m.fecha, '-4 hours') AS fecha
          FROM Movimientos m
          JOIN Usuarios u ON m.id_usuario = u.id_usuario
          JOIN Proyectos p ON m.id_proyecto = p.id_proyecto 
          WHERE m.id_movimiento = ?`,
      args: [newMovement.rows[0].id_movimiento]
    })

    return {
      success: true,
      message: 'Operacion realizada exitosamente.',  
      project,
      newTotalAmount: newAmountBank.rows[0].saldo_total,
      movement: movement.rows[0]
    }
  }
}