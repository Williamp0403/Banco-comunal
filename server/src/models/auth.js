import { db } from '../config/db.js'
import dotenv from 'dotenv'
dotenv.config()
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

export class authModel {
  
  static async queryRegister (data) {
    const { nombre, apellido, contraseña } = data

    const hashedPassword = await bcrypt.hash(contraseña, process.env.SALT_ROUND)

    await db.execute({
      sql: 'INSERT INTO Usuarios (nombre, apellido, contraseña) VALUES (?, ?, ?)',
      args: [nombre, apellido, hashedPassword]
    })
    
    return { message: "Registrado correctamente." }
  }

  static async queryLogin (data) {
    const { nombre, contraseña } = data

    // Extraemos la informacion del usuario que quiere ingresar.
    const existingUser = await db.execute({
      sql: 'SELECT * FROM Usuarios WHERE nombre = ?',
      args: [nombre]
    })

    // Comprobamos si el usuario existe.
    if(existingUser.rows.length === 0) return { success: false, message: "Nombre o contraseña incorrectos." }

    // Validamos si la contraseña es correcta
    const validatePassword = await bcrypt.compare(contraseña, existingUser.rows[0].contraseña)

    // Si no es correcta, entra en la condicion.
    if(!validatePassword) return { success: false, message: "Nombre o contraseña incorrectos." }

    const user = {
      id_usuario: existingUser.rows[0].id_usuario,
      nombre: existingUser.rows[0].nombre,
      apellido: existingUser.rows[0].apellido
    }

    // Creamos el token de autenticacion.
    const token = jwt.sign({ id_user: user.id_usuario }, process.env.JWT_SECRET, { expiresIn: '1d' })

    return { 
      success: true,
      usuario: user,
      token
    }
  }

  static async queryGetUser (id) {
    const user = await db.execute({
      sql: 'SELECT * FROM Usuarios WHERE id_usuario = ?',
      args: [id]
    })
    
    if(user.rows.length === 0) return { success: false, message: 'Usuario no encontrado.' }
    
    return {
      success: true,
      usuario: {
        id_usuario: user.rows[0].id_usuario,
        nombre: user.rows[0].nombre,
        apellido: user.rows[0].apellido
      }
    }
  }
}