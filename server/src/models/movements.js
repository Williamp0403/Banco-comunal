import { db } from "../config/db.js";

export class MovementsModel {
  static async queryGetMovements (data) {
    const since = `${data.since} 00:00:00`
    const until = `${data.until} 23:59:59`

    const movements = await db.execute({
      sql: `SELECT  m.id_movimiento,
          m.id_usuario,
          u.nombre AS nombre_usuario,
          u.apellido AS apellido_usuario,
          m.id_proyecto,
          p.nombre AS nombre_proyecto,
          m.transaccion,
          m.monto,
          m.descripcion,
          DATETIME(m.fecha, '-4 hours') AS fecha
          FROM Movimientos m
          JOIN Usuarios u ON m.id_usuario = u.id_usuario
          JOIN Proyectos p ON m.id_proyecto = p.id_proyecto
          WHERE DATETIME(m.fecha, '-4 hours') BETWEEN ? AND ?
          ORDER BY fecha DESC;
      `,
      args: [since, until],
    });
    
    return movements.rows;
  }

  static async queryLatestMovements () {
    const latestMovements = await db.execute(
        `SELECT m.id_movimiento,
          m.id_usuario,
          u.nombre AS nombre_usuario,
          u.apellido AS apellido_usuario,
          m.id_proyecto,
          p.nombre AS nombre_proyecto,
          m.transaccion,
          m.monto,
          m.descripcion,
          DATETIME(m.fecha, '-4 hours') AS fecha
          FROM Movimientos m
          JOIN Usuarios u ON m.id_usuario = u.id_usuario
          JOIN Proyectos p ON m.id_proyecto = p.id_proyecto 
          ORDER BY fecha DESC LIMIT 5
        `,
    );
    return latestMovements.rows 
  }
  
}
