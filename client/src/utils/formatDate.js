import dayjs from "dayjs"
import "dayjs/locale/es"
import customParseFormat from "dayjs/plugin/customParseFormat"
import isToday from "dayjs/plugin/isToday"
import isYesterday from "dayjs/plugin/isYesterday"
import isTomorrow from "dayjs/plugin/isTomorrow"

dayjs.locale("es")
dayjs.extend(customParseFormat)
dayjs.extend(isToday)
dayjs.extend(isYesterday)
dayjs.extend(isTomorrow)

export function formatDate(date) {
  if (!date) return "Fecha no disponible"

  const parsed = dayjs(date)
  const hasTime =
    parsed.hour() !== 0 || parsed.minute() !== 0 || date.includes("T") || date.includes(" ")

  if (parsed.isToday()) {
    return hasTime ? `Hoy, ${parsed.format("h:mm A")}` : "Hoy"
  }

  if (parsed.isYesterday()) {
    return hasTime ? `Ayer, ${parsed.format("h:mm A")}` : "Ayer"
  }

  if (parsed.isTomorrow()) {
    return hasTime ? `Mañana, ${parsed.format("h:mm A")}` : "Mañana"
  }

  const format = hasTime ? "D MMMM, YYYY h:mm A" : "D MMMM, YYYY"
  const formatted = parsed.format(format)

  // Capitaliza el mes
  return formatted.replace(/(\d+\s)([a-zñ]+)(,)/i, (_, d, month, comma) => {
    return d + month.charAt(0).toUpperCase() + month.slice(1) + comma
  })
}
