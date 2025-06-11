import { useParams } from "react-router-dom"
import { useEffect } from "react";
import { useBank } from "../context/BankContext"
import { ChipState } from "../components/Chip";
import { Loading } from "../components/Loading"
import CalendarTodayIcon from '@mui/icons-material/CalendarTodayOutlined';
import EventBusyIcon from '@mui/icons-material/EventBusy';
import PersonIcon from '@mui/icons-material/Person';
import { Fade } from "@mui/material";

export function DetailsProjectPage () {
  const { id } = useParams()
  const { projects, loading, getBankData } = useBank()

  useEffect(() => {
    if (!projects || projects.length === 0) {
      getBankData()
    }
  }, [projects, getBankData])

  const project = projects?.find(
    (p) => String(p.id_proyecto) === id
  )

  return (
    <Fade in={true} timeout={700}>
      <main className="container mx-auto">
        <section className="p-8 sm:p-10">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-medium mb-5 lg:mb-10">Detalles del Proyecto</h1>
          {
            loading ? <Loading className="flex justify-center"/>
            : !loading && project ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <article className="flex flex-col md:col-span-2 justify-between gap-y-5 bg-white p-5 border border-zinc-400 rounded-lg">
                  <div className="flex items-start justify-between">
                    <h2 className="text-xl sm:text-2xl font-semibold flex-grow">
                      {project.nombre}
                    </h2>
                    <div className="flex-shrink-0">
                      <ChipState title={project.estado} />
                    </div>
                  </div>
                  <div className="text-sm sm:text-base">
                    <h4 className="font-semibold">Descripción</h4>
                    <p className="text-zinc-700">{project.descripcion}</p>
                  </div>
                  {
                    project.fecha_inicio && (
                      <div className="flex items-center gap-x-3 sm:gap-x-20 text-sm sm:text-base">
                        <div>
                          <h4 className="font-semibold">Fecha de inicio</h4>
                          <div className="flex items-start gap-x-2">
                            <CalendarTodayIcon htmlColor="gray" fontSize="small"/>
                            <span className=" text-zinc-700">{project.fecha_inicio}</span>
                          </div>
                        </div>
                        <div>
                          <h4 className="font-semibold">Fecha límite</h4>
                          <div className="flex items-start gap-x-2">
                            <EventBusyIcon htmlColor="gray" fontSize="small"/>
                            <span className=" text-zinc-700">{project.fecha_fin}</span>
                          </div>                        
                        </div>
                      </div>
                    )
                  }  
                  <div className="text-sm sm:text-base">
                    <h4 className="font-semibold">Responsable</h4> 
                    <div className="flex items-center gap-x-1 sm:gap-x-2">
                      <PersonIcon htmlColor="gray" fontSize="medium"/>
                      <span className="text-zinc-700">{project.nombre_usuario + " " + project.apellido_usuario}</span>
                    </div>       
                  </div>
                </article>
                <article className="md:col-span-1 grid grid-cols-2 p-5 gap-y-3 text-sm sm:text-base bg-white border border-zinc-400 rounded-lg">
                  <h2 className="text-xl sm:text-2xl font-semibold">Finanzas</h2>
                  <div className="flex items-center col-span-2 justify-between bg-blue-100 p-3 rounded-lg">
                    <h3 className="text-green-600 font-medium">Monto disponible</h3>
                    <span className="font-bold text-lg sm:text-xl">{ project.monto_total - project.monto_gastado } Bs</span>
                  </div>
                  <div className="flex items-center col-span-2 gap-x-4 justify-between">
                    <div className="bg-blue-100 w-full col-start-1 p-3 rounded-lg">
                      <h3 className="text-blue-600 font-medium">Total ingresos</h3>
                      <span className="font-bold text-lg sm:text-xl">{ project.monto_total } Bs</span>
                    </div>
                    <div className="bg-red-100 w-full col-start-2 p-3 rounded-lg">
                      <h3 className="text-red-600 font-medium">Total gastos</h3>
                      <span className="font-bold text-lg sm:text-xl">{project.monto_gastado}</span>
                    </div>
                  </div>                
                </article>
              </div>
            ) : <h2>El proyecto no existe.</h2>
          }
        </section>
      </main>
    </Fade>
  )
}