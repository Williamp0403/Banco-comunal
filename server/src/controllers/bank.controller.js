import { BankModel } from "../models/bank.js"

export class BankController {
  static async getBank (req, res) {
    try {
      const response = await BankModel.queryGetBank()
      res.json({ saldoTotal: response.saldoTotal })
    } catch (e) {
      console.log(e)
      res.status(500).json({ message: 'Error en el servidor.' })
    }
  }
}