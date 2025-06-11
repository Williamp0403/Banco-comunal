import { z } from "zod";
import dayjs from "dayjs";

const isValidDate = (date) => {
  const parsedDate = dayjs(date, "YYYY-MM-DD", true);
  return parsedDate.isValid() && parsedDate.format("YYYY-MM-DD") === date;
};

const isPastOrToday = (date) => {
  return dayjs(date).diff(dayjs(), "day") <= 0; 
};

export const MovementSchema = z.object({
  since: z.string().min(1, { message: "La fecha 'desde' es obligatoria." }).refine(isValidDate, {
    message: "Fecha inválida o formato incorrecto (YYYY-MM-DD)",
  }).refine(isPastOrToday, {
    message: "La fecha 'desde' no puede ser en el futuro",
  }),

  until: z.string().min(1, { message: "La fecha 'hasta' es obligatoria." }).refine(isValidDate, {
    message: "Fecha inválida o formato incorrecto (YYYY-MM-DD)",
  }).refine(isPastOrToday, {
    message: "La fecha 'hasta' no puede ser en el futuro",
  }),

  projectId: z.number().optional(),
}).refine((data) => dayjs(data.since).diff(dayjs(data.until), "day") <= 0, {
  message: "La fecha 'desde' debe ser anterior o igual a 'hasta'",
  path: ["since"],
});
