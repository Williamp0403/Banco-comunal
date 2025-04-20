import { authModel } from "../models/auth.js"

export class authController {
  static async login (req, res) {
    try {
      const response = await authModel.queryLogin()
      res.json({ hola: 'login' })
    } catch (e) {
      console.log(e)
    }
  }

  static async logout (req, res) {
    try {
      res.json({ hola: 'logut' })
    } catch (e) {
      console.log(e)
    }
  }
}