import { db } from "../config/db.js";

export class ProjectModel {
  static async queryGetProjects () {
    const getProjects = await db.execute('SELECT * FROM Proyectos')
    return getProjects.rows
  }

  static async queryCreateProject (data, id) {
    const { nombre, descripcion, monto_asignado, estado } = data

    if(estado === "Pendiente") {
      const pendingProject = await db.execute({
        sql: 'INSERT INTO Proyectos (id_usuario, nombre, descripcion, monto_asignado, estado) VALUES (?, ?, ?, ?, ?) RETURNING *',
        args: [id, nombre, descripcion, monto_asignado, estado]
      })
      return { project: pendingProject.rows }
    }

    const progressProject = await db.execute({
      sql: 'INSERT INTO Proyectos (id_usuario, nombre, descripcion, monto_asignado, estado, fecha_inicio) VALUES (?, ?, ?, ?, ?, CURRENT_TIMESTAMP ) RETURNING *',
      args: [id, nombre, descripcion, monto_asignado, estado]
    })
    return { project: progressProject.rows }
  }

  static async queryDeleteProject (id) {
    console.log(id)
    const deleteProject = await db.execute({
      sql: 'DELETE FROM Proyectos WHERE id_proyecto = ? RETURNING *' ,
      args: [id]
    })

    console.log(deleteProject)

    if(deleteProject.rowsAffected === 0) return { success: false, message: 'El proyecto no existe.' }

    return {
      success: true,
      message: 'Proyecto eliminado correctamente.',
      project: deleteProject.rows[0].id_proyecto
    }
  }
}