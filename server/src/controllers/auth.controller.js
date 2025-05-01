import { authModel } from "../models/auth.js"

export class authController {
  static async register (req, res) {
    const response = await authModel.queryRegister(req.body)
    res.json({ message: response.message })
  }

  static async login (req, res) {
    try {
      const response = await authModel.queryLogin(req.body)
      if(!response.success) return res.status(404).json({ message: response.message })

      res.cookie('token', response.token, { 
        maxAge: 24 * 60 * 60 * 1000,
      }).json({ usuario: response.usuario })
    } catch (e) {
      console.log(e)
    }
  }

  static async logout (req, res) {
    try {
      res.clearCookie('token').sendStatus(200)
    } catch (e) {
      console.log(e)
    }
  }
}