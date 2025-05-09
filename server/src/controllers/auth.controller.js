import { authModel } from "../models/auth.js"
import jwt from 'jsonwebtoken'

export class authController {
  static async register (req, res) {
    const response = await authModel.queryRegister(req.body)
    res.json({ message: response.message })
  }

  static async login (req, res) {
    try {
      const response = await authModel.queryLogin(req.body)
      if(!response.success) return res.status(401).json({ message: response.message })

      res.cookie('token', response.token, { 
        httpOnly: true,       // Protege la cookie contra accesos desde JS
        secure: true,         // Necesario para HTTPS en producción
        sameSite: 'None',     // Permite que la cookie se comparta entre dominios distintos
        maxAge: 24 * 60 * 60 * 1000, // Expira en 1 día
      }).json({ usuario: response.usuario })
    } catch (e) {
      console.log(e)
      return res.status(500).json({ message: 'Hubo un problema en el servidor. Por favor, intenta de nuevo más tarde.' })
    }
  }

  static async logout(req, res) {
    try {
      res.cookie('token', '', { 
        httpOnly: true, 
        secure: true, 
        sameSite: 'None', 
        expires: new Date(0)
      }).sendStatus(200);
    } catch (e) {
      console.log(e);
      return res.status(500).json({ message: 'Hubo un problema en el servidor. Por favor, intenta de nuevo más tarde.' });
    }
  }
  

  static verifyToken (req, res) {
    const { token } = req.cookies
    if(!token) return res.status(401).json({ message: 'No hay token, acceso denegado' })

    jwt.verify(token, process.env.JWT_SECRET, async (error, user) => {
      if(error) return res.status(401).json({ message: 'Token inválido.' })

      const userFound = await authModel.queryGetUser(user.id_user)
      if(!userFound.success) return res.status(401).json({ message: userFound.message })

      res.json({ usuario: userFound.usuario })
    })
  }
}