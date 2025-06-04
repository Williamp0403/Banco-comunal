import { MovementsModel } from "../models/movements.js"

export class MovementsController {
  static async getMovements (req, res) {
    try {
      const responses = await MovementsModel.queryGetMovements(req.query)
      res.json({ movements: responses })
    } catch (e) {
      console.log(e)
    }
  } 
}