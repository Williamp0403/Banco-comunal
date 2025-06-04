import { z } from "zod";
import dayjs from "dayjs";

const isValidDate = (date) => {
  const parsedDate = dayjs(date, "YYYY-MM-DD", true);
  return parsedDate.isValid() && parsedDate.format("YYYY-MM-DD") === date;
};

export const MovementSchema = z.object({
  since: z.string().refine(isValidDate, {
    message: "Fecha inválida o formato incorrecto (YYYY-MM-DD)",
  }),
  until: z.string().refine(isValidDate, {
    message: "Fecha inválida o formato incorrecto (YYYY-MM-DD)",
  }),
  projectId: z.number().optional(),
}).refine((data) => dayjs(data.since).isBefore(dayjs(data.until)), {
  message: "La fecha 'since' debe ser anterior a 'until'",
  path: ["since"],
});