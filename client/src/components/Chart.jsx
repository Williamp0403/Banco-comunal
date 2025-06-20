import { LineChart, PieChart } from '@mui/x-charts'
import { formatCurrency } from '../utils/formatCurrency'
import { formatDate } from '../utils/formatDate'

export function Chart ({ data, valueFormatter }) {
  const total = data.reduce((acc, item) => acc + item.value, 0)

  const dataWithPercent = data.map(item => {
    const porcentaje = ((item.value / total) * 100).toFixed(1)
    return {
      ...item,
      label: `${item.label} (${porcentaje}%)`
    }
  })

  return (
    <PieChart
      series={[
        {
          data: dataWithPercent,
          innerRadius: 15,
          paddingAngle: 2,
          highlightScope: { fade: 'global', highlight: 'item' },
          faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
          valueFormatter: valueFormatter || (({ value }) => value)
        }
      ]}
      height={250}
      slotProps={{
        legend: {
          direction: 'row',
          position: { vertical: 'bottom', horizontal: 'middle' }
        }
      }}
    />
  )
}

export function ChartLine({ data }) {
  // Función para formatear montos con "Bs" al final
  const formatMoney = (value) => `${formatCurrency(value)} Bs`;

  return (
    <LineChart
      xAxis={[{
        data: data.map(m => m.fecha),
        scaleType: 'band',
        valueFormatter: (value) => formatDate(value)
      }]}
      yAxis={[{
        valueFormatter: (value) => formatMoney(value) // Eje Y con "Bs"
      }]}
      series={[
        {
          data: data.map(m => m.ingresos),
          label: 'Ingresos',
          color: '#16a34a',
          valueFormatter: (value) => formatMoney(value) // Leyenda con "Bs"
        },
        {
          data: data.map(m => m.egresos),
          label: 'Egresos',
          color: '#dc2626',
          valueFormatter: (value) => formatMoney(value) // Leyenda con "Bs"
        }
      ]}
      height={400}
      slotProps={{
        legend: {
          position: 'top'
        },
        tooltip: {
          content: ({ series, dataIndex }) => {
            const dia = data[dataIndex]
            return (
              <div style={{ padding: 6 }}>
                <strong>{formatDate(dia.fecha)}</strong><br />
                Ingresos: {formatMoney(dia.ingresos)}<br /> {/* Tooltip con "Bs" */}
                Egresos: {formatMoney(dia.egresos)}
              </div>
            )
          }
        }
      }}
    />
  )
}

