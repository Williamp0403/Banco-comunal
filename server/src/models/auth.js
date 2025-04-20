import { db } from '../config/db.js'

export class authModel {
  static async queryLogin () {
    const dwdw = await db.execute('SELECT * FROM BancoComunal')
    console.log(dwdw)
  }
}