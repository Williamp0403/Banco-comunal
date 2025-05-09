import z from 'zod'

export const projectSchema = z.object({
  nombre: z
    .string({ message: 'El nombre es requerido.' })
    .trim()
    .min(3, { message: 'El nombre debe tener más de 3 caracteres.' })
    .max(50, { message: 'EL nombre no puede tener más de 50 caracteres.' }),
  descripcion: z
    .string({ message: 'La descripción es requerida.' })
    .trim()
    .min(5, { message: 'La descripción debe tener más de 5 caracteres.' }),
  monto_asignado: z
    .number({ message: 'El monto es requerido.' })
    .min(0, { message: 'El monto no puede ser menor a 0bs.' })
    .max(99999999.99, { message: "El monto máximo permitido es 99,999,999.99bs" }),
  estado: z
    .enum(
      ["Pendiente", "En Progreso"],
      {
        errorMap: () => ({
          message: "El estado debe ser 'Pendiente' o 'En Progreso'."
        })
      }
    )
})