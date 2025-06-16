export function formatCurrency(value) {
  if (typeof value !== "number") return "0,00"
  return value.toLocaleString("es-VE", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  })
}
