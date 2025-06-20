function getLast7Dates() {
  const today = new Date()
  return Array.from({ length: 7 }, (_, i) => {
    const date = new Date(today)
    date.setDate(today.getDate() - (6 - i))
    return date.toISOString().slice(0, 10) // YYYY-MM-DD
  })
}

export function groupMovementsByDay(movements) {
  const grouped = {}

  // agrupar movimientos existentes
  movements.forEach(({ fecha, transaccion, monto }) => {
    const dia = fecha.split(' ')[0]
    if (!grouped[dia]) {
      grouped[dia] = { ingresos: 0, egresos: 0 }
    }
    if (transaccion === 'Depósito') {
      grouped[dia].ingresos += monto
    } else if (transaccion === 'Retiro') {
      grouped[dia].egresos += monto
    }
  })

  // construir resultado con todos los días
  const diasCompletos = getLast7Dates()
  return diasCompletos.map(dia => ({
    fecha: dia,
    ingresos: Number((grouped[dia]?.ingresos || 0).toFixed(2)),
    egresos: Number((grouped[dia]?.egresos || 0).toFixed(2))
  }))
}
