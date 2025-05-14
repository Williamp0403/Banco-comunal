import { useBank } from "../context/BankContext"
import { Loading } from "../components/Loading"
import { useEffect } from "react"
import { ProjectCard } from "../components/ProjectCard"

export function ProjectsPage () {
  const { projects, loading, getBankData } = useBank()

  useEffect(() => {
    getBankData()
  }, [])

  const isProjects = projects?.length > 0

  return (
    <main className="container mx-auto ">
      <section className="p-8 sm:p-10">
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-medium mb-5">Proyectos</h1>
      {
        loading ? <Loading/>
        : !loading && isProjects ? (
          <div className="space-y-5">      
            <nav className="space-x-5">
              <button>Todos</button>
              <button>Pendientes</button>
              <button>En Proceso</button>
              <button>Completados</button>
              <button>Cancelados</button>
            </nav>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {
                projects.map(project => {
                  return (
                    <ProjectCard project={project} key={project.id_proyecto}/>
                  )
                })
              }
            </div>
          </div>
        )
        : <h3>No hay proyectos.</h3>   
      }
      </section>
    </main>
  )
}