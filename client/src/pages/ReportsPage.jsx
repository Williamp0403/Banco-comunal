import { useReports } from "../hooks/useReports"
import { Loading } from "../components/Loading"
import { Chart, ChartLine } from "../components/Chart"
import { formatCurrency } from "../utils/formatCurrency"
import { Fade } from "@mui/material"

export function ReportsPage () {
  const { fundsPerProject, projectStatus, movementsOverTime, loading } = useReports()

  return (
    <Fade in={true} timeout={700}>
      <main className="container mx-auto">
        <section className="p-8 sm:p-10 space-y-8">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-medium">Reportes Financieros</h1>
          {
            loading ? <Loading className="flex justify-center"/>
            : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="hidden md:block md:col-span-2 bg-white border border-zinc-400 rounded-lg p-5 space-y-3">
                  <h2 className="font-semibold text-xl">Flujo financiero semanal</h2>
                  <p className="text-sm font-medium text-zinc-500">
                    Comparación diaria de ingresos y egresos durante los últimos 7 días
                  </p>
                  {
                    movementsOverTime.every(m => m.ingresos === 0 && m.egresos === 0)
                      ? <p className="text-center text-zinc-500">No hay movimientos registrados en los últimos 7 días</p>
                      : <ChartLine data={movementsOverTime} />
                  }
                </div>
                <div className="bg-white border border-zinc-400 rounded-lg p-5 space-y-3">
                  <h2 className="font-semibold text-xl">Distribución de fondos</h2>
                  <p className="text-sm font-medium text-zinc-500">
                    Distribución actual de recursos entre los proyectos activos del banco comunal
                  </p>
                  {
                    fundsPerProject.length === 0
                      ? <p className="text-center text-zinc-500">No hay proyectos activos en progreso con fondos disponibles</p>
                      : <Chart
                          data={fundsPerProject}
                          valueFormatter={({ value }) => `${formatCurrency(value)} Bs`}
                        />
                  }
                </div>
                <div className="bg-white border border-zinc-400 rounded-lg p-5 space-y-3">
                  <h2 className="font-semibold text-xl">Cantidad de proyectos</h2>
                  <p className="text-sm font-medium text-zinc-500">
                    Muestra el número de proyectos clasificados por estado: Pendiente, En Progreso y Completado
                  </p>
                  {
                    projectStatus.every(p => p.value === 0)
                      ? <p className="text-center text-zinc-500">No hay proyectos registrados actualmente</p>
                      : <Chart
                          data={projectStatus}
                          valueFormatter={({ value }) => `${value} proyecto${value !== 1 ? 's' : ''}`}
                        />
                  }
                </div>
              </div>
            )  
          }
        </section>
      </main>     
    </Fade>
  )
}