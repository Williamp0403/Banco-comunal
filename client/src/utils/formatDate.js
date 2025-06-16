import dayjs from "dayjs"
import "dayjs/locale/es"
import customParseFormat from "dayjs/plugin/customParseFormat"
import isToday from "dayjs/plugin/isToday"

dayjs.locale("es")
dayjs.extend(customParseFormat)
dayjs.extend(isToday)

export function formatDate(date) {
  if (!date) return "Fecha no disponible"

  const parsed = dayjs(date)
  const hasTime = parsed.hour() !== 0 || parsed.minute() !== 0 || date.includes("T") || date.includes(" ")

  if (parsed.isToday()) {
    return hasTime
      ? `Hoy, ${parsed.format("h:mm A")}`
      : "Hoy"
  }

  const format = hasTime ? "D MMMM, YYYY h:mm A" : "D MMMM, YYYY"
  const formatted = parsed.format(format)

  // Capitaliza el mes
  return formatted.replace(/(\d+\s)([a-zñ]+)(,)/i, (_, d, month, comma) => {
    return d + month.charAt(0).toUpperCase() + month.slice(1) + comma
  })
}
