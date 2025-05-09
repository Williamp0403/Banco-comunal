import z from 'zod'

export const registerSchema = z.object({
  nombre: z
    .string({ message: 'El nombre es requerido.' })
    .trim()
    .min(3, { message: 'El nombre debe tener más de 3 caracteres.' })
    .max(20, { message: 'El nombre no puede tener más de 20 caracteres.' }),
  apellido: z
    .string({ message: 'El apellido es requerido.' })
    .trim()
    .min(3, { message: 'El apellido debe tener más de 3 caracterres' })
    .max(20, { message: 'El apellido no puede tener más de 20 caracteres.' }),
  contraseña: 
    z.string({ message: 'La contraseña es requerida.' })
    .trim()
    .min(8, { message: 'La contrasena debe tener más de 8 caracteres.' })
})

export const loginSchema = z.object({
  nombre: z
    .string({ message: 'El nombre es requerido.' })
    .trim()
    .min(3, { message: 'El nombre debe tener al menos 3 caracteres' })
    .max(20, { message: 'El nombre no debe tener más de 20 caracteres.' }),
  contraseña: z
    .string({ message: 'La contraseña es requerida.' })
    .trim()
    .min(8, { message: 'La contraseña debe al menos 8 caracteres.' })
})