import { MovementsModel } from "../models/movements.js"

export class MovementsController {
  static async getMovements (req, res) {
    try {
      const responses = await MovementsModel.queryGetMovements(req.query)
      res.json({ movements: responses })
    } catch (e) {
      console.log(e)
      res.status(500).json({ message: 'Error en el servidor.' })
    }
  } 

  static async latestMovements (req, res) {
    try {
      const responses = await MovementsModel.queryLatestMovements()
      res.json({ ultimosMovimientos: responses })
    } catch (e) {
      console.log(e)
      res.status(500).json({ message: 'Error en el servidor.' })
    }
  }

  static async getAllMovements (req, res) {
    try {
      const responses = await MovementsModel.queryGetAllMovements()
      res.json({ movimientos: responses })
    } catch (e) {
      console.log(e)
      res.status(500).json({ message: 'Error en el servidor.' })
    }
  }
}
