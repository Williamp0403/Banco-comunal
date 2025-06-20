import { useEffect } from "react"
import { useAuth } from "../context/AuthContext"
import { useBank } from "../context/BankContext"
import { Loading } from "../components/Loading"
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { NavProjects } from "../components/NavProjects"
import { Fade } from "@mui/material"
import { CardMovement } from "../components/CardMovement";
import { useFilter } from "../hooks/useFilter";
import { formatCurrency } from "../utils/formatCurrency"

export function DashboardPage () {
  const { user } = useAuth()
  const { getBankData, totalCredit, latestMovements, loading, projects } = useBank()
  const { filteredProjects } = useFilter()

  useEffect(() => {
    getBankData()
  }, [])

  const projectsInProgress = filteredProjects("En Progreso", projects).length;
  const projectsCompleted = filteredProjects("Completados", projects).length;

  return (
    <Fade in={true} timeout={700}>   
      <main className="container mx-auto ">
        <section className="p-8 sm:p-10 space-y-8">
          <h1 className="text-2xl md:text-3xl font-medium mb-5 lg:mb-10">
            Bienvenido {user.nombre + " " + user.apellido}
          </h1>
          {
            loading ? <Loading className='flex justify-center'/>
            : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <article className="flex flex-col justify-between gap-y-5 bg-white p-5 border border-zinc-400 rounded-lg">
                  <div className="flex flex-col gap-y-1">
                    <h3 className="text-lg md:text-xl font-medium">Saldo Total</h3>
                    <h2 className="text-xl lg:text-2xl font-bold">
                      {formatCurrency(totalCredit)} Bs
                    </h2>
                  </div>
                  <p className="text-sm sm:text-base text-zinc-500">Fondos disponibles en el banco comunal</p>
                </article>
                <article className="flex flex-col justify-between gap-y-5 bg-white p-5 border border-zinc-400 rounded-lg">
                  <div className="flex flex-col gap-y-1">
                    <h3 className="text-lg md:text-xl font-medium">Proyectos En Progreso</h3>
                    <h2 className="text-xl lg:text-2xl font-bold">{projectsInProgress}</h2>
                  </div>
                  <p className="text-sm sm:text-base text-zinc-500">Cantidad total de proyectos en progreso</p>  
                </article>
                <article className="flex flex-col justify-between gap-y-5 bg-white p-5 border border-zinc-400 rounded-lg">
                    <div className="flex flex-col gap-y-1">
                      <h3 className="text-lg md:text-xl font-medium">Proyectos Completados</h3>
                      <h2 className="text-xl lg:text-2xl font-bold">{projectsCompleted}</h2>
                    </div>
                    <p className="text-sm sm:text-base text-zinc-500">Cantidad total de proyectos completados</p>  
                </article>
               <article className="flex flex-col md:col-span-3 justify-between gap-y-5 bg-white p-5 border border-zinc-400 rounded-lg">
                <div className="flex items-center gap-x-2 bg-white">
                  <AccessTimeIcon />
                  <h1 className="text-xl md:text-2xl font-semibold">Últimos Movimientos</h1>
                </div>
                
                {latestMovements.length > 0 ? (
                  latestMovements.map(movement => (
                    <CardMovement key={movement.id_movimiento} movement={movement} />
                  ))
                ) : (
                  <p className="text-center text-gray-500">No hay movimientos recientes.</p>
                )}
              </article>
                <NavProjects/>
              </div>
            )
          }
        </section>
      </main>
    </Fade>
  )
}
