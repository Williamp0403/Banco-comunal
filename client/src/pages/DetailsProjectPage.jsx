import { useParams } from "react-router-dom"
import { useBank } from "../context/BankContext"
import { Chip } from "../components/Chip";
import CalendarTodayIcon from '@mui/icons-material/CalendarTodayOutlined';

export function DetailsProjectPage () {
  const { id } = useParams()
  const { projects } = useBank()

  const project = projects?.find(
    (p) => String(p.id_proyecto) === id
  );

  console.log(project)

  return (
    <main className="container mx-auto">
      <section className="p-8 sm:p-10">
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-medium mb-5 lg:mb-10">Detalles del Proyecto</h1>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <article className="flex flex-col sm:col-span-2 justify-between gap-y-5 bg-white p-5 border border-zinc-300 rounded-lg">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold">{project.nombre}</h2>
              <Chip title={project.estado}/>
            </div>
            <div>
              <h4 className="font-semibold">Descripción</h4>
              <p className="text-zinc-700">{project.descripcion}</p>
            </div>
            {
              project.fecha_inicio && (
                <div className="">
                  <div>
                    <h4 className="font-semibold">Fecha de creación</h4>
                    <div className="flex items-start gap-x-2 text-zinc-700">
                      <CalendarTodayIcon fontSize="small"/>
                      <span>{project.fecha_inicio}</span>
                    </div>
                  </div>
                  {
                    project.fecha_fin && (
                      <div>
                        <h4 className="font-semibold">Fecha de culminación</h4>
                      </div>
                    )
                  }
                </div>
              )
            }  
            <div>
              <h4 className="font-semibold">Responsable</h4>        
              <span className="text-zinc-700">William Pinto</span>
            </div>
          </article>
          <article className="sm:col-start-3 p-5 bg-white border border-zinc-300 rounded-lg">
            <h2 className="text-2xl font-semibold">Finanzas</h2>
          </article>
          <article className="sm:col-span-3 bg-white p-5 border border-zinc-300 rounded-lg">
            <h2 className="text-2xl font-semibold">Historial de Transacciones</h2>
          </article>
        </div>
      </section>
    </main>
  )
}