import z from 'zod'
import dayjs from 'dayjs';

export const projectSchema = z.object({
  nombre: z
    .string({ message: "El nombre es requerido." })
    .trim()
    .min(3, { message: "El nombre debe tener más de 3 caracteres." })
    .max(50, { message: "El nombre no puede tener más de 50 caracteres." }),
  descripcion: z
    .string({ message: "La descripción es requerida." })
    .trim()
    .min(5, { message: "La descripción debe tener más de 5 caracteres." }),
monto_total: z
  .number({
    required_error: "El monto es requerido",
    invalid_type_error: "Debe ser un número válido"
  })
  .min(0.01, "El monto debe ser mayor a 0 Bs.")
  .max(99999999.99, "El monto máximo es 99.999.999,99 Bs."),
  estado: z.enum(["Pendiente", "En Progreso"], {
    errorMap: () => ({
      message: "El estado debe ser 'Pendiente' o 'En Progreso'."
    })
  }),
  fecha_fin: z.string().optional() 
}).superRefine((data, ctx) => {
  if (data.estado === "En Progreso" && !data.fecha_fin) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "La fecha límite es obligatoria.",
      path: ["fecha_fin"]
    });
  }

  if (data.fecha_fin) {
    const fechaSeleccionada = dayjs(data.fecha_fin);
    const tomorrow = dayjs().add(1, "day");

    if (!fechaSeleccionada.isValid()) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "La fecha no es válida.",
        path: ["fecha_fin"]
      });
    }

    if (fechaSeleccionada.isBefore(tomorrow, "day")) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "La fecha límite debe ser posterior a la fecha actual.",
        path: ["fecha_fin"]
      });
    }
  }
});

export const UpdateStateSchema = z.object({
  fecha_fin: z.string()
    .min(1, { message: "La fecha límite es obligatoria." })
    .refine(value => dayjs(value).isValid(), { message: "La fecha ingresada no es válida." })
    .refine(value => dayjs(value).isAfter(dayjs(), "day"), { message: "La fecha límite debe ser posterior a la fecha actual." })
});

export const TransitionSchema = z.object({
  monto: z
    .number({ message: "El monto es requerido." })
    .min(0, { message: "El monto no puede ser menor a 0 Bs." })
    .max(99999999.99, { message: "El monto máximo permitido es 99.999.999,99 Bs." }),
  descripcion: z
    .string({ message: "La descripción es requerida." })
    .trim()
    .min(5, { message: "La descripción debe tener más de 5 caracteres." })
    .max(40, { message: "La descripción no puede tener más de 40 caracteres." }),
  id_proyecto: z
    .number({ message: "El proyecto es requerido." })
    .optional(), // Hace que id_proyecto sea opcional
});