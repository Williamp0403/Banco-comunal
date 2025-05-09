import { db } from "../config/db.js";

export class BankModel {
  static async queryGetBank () {
    const bank = await db.execute('SELECT saldo_total FROM BancoComunal WHERE id_banco = 1')
    return {
      saldoTotal: bank.rows[0].saldo_total
    }
  }
}