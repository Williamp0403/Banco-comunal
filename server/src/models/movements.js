import { db } from "../config/db.js";

export class MovementsModel {
  static async queryGetMovements(data) {
    const since = `${data.since} 00:00:00`
    const until = `${data.until} 23:59:59`

    const movements = await db.execute({
      sql: "SELECT * FROM Movimientos WHERE fecha BETWEEN ? AND ?",
      args: [since, until],
    });
    
    return movements.rows;
  }
}
