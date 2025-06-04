import z from "zod"

export const TransitionSchema = z.object({
  id_proyecto: z
    .number({ message: 'El proyecto es requerido.' }),
  monto: z
    .number({ message: 'EL monto es requerido.' })
    .min(0, { message: 'El monto no puede ser menor a 0 Bs.' })
    .max(99999999.99, { message: "El monto máximo permitido es 99.999.999,99 Bs" }),
  descripcion: z
    .string({ message: 'La descripción es requerida.' })
    .trim()
    .min(5, { message: 'La descripción debe tener más de 5 caracteres.' }),    
})
