import z from "zod"

export const TransitionWithProjectSchema = z.object({
  id_proyecto: z
    .number({ message: "El proyecto es requerido." }),

  monto: z.preprocess(
    (val) => {
      if (val === "" || val === null || val === undefined) return undefined;
      if (typeof val === "string") return parseFloat(val.replace(",", "."));
      return val;
    },
    z
      .number({ message: "El monto es requerido." })
      .min(0, { message: "El monto no puede ser menor a 0 Bs." })
      .max(99999999.99, { message: "El monto máximo permitido es 99.999.999,99 Bs" })
  ),

  descripcion: z
    .string({ message: "La descripción es requerida." })
    .trim()
    .min(5, { message: "La descripción debe tener más de 5 caracteres." })
    .max(40, { message: "La descripción no puede tener más de 40 caracteres." })
});

export const TransitionSchema = z.object({
  monto: z
    .number({ message: 'EL monto es requerido.' })
    .min(0, { message: 'El monto no puede ser menor a 0 Bs.' })
    .max(99999999.99, { message: "El monto máximo permitido es 99.999.999,99 Bs" }),
  descripcion: z
    .string({ message: 'La descripción es requerida.' })
    .trim()
    .min(5, { message: 'La descripción debe tener más de 5 caracteres.' })
    .max(40, { message: 'La descripción no puede tener más de 40 caracteres' })  
})
