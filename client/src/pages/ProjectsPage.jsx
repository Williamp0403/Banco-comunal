import { useBank } from "../context/BankContext";
import { Loading } from "../components/Loading";
import { useEffect } from "react";
import { ProjectCard } from "../components/ProjectCard";
import { useFilter } from "../hooks/useFilter";
import { Fade } from "@mui/material";

export function ProjectsPage() {
  const { projects, loading, getBankData } = useBank();
  const { filter, setFilter, filteredProjects } = useFilter();

  useEffect(() => {
    getBankData();
  }, []);

  const filtersResult = filteredProjects(filter, projects);

  return (
    <Fade in={true} timeout={700}>
      <main className="container mx-auto">
        <section className="p-8 sm:p-10">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-medium mb-5">
            Proyectos
          </h1>
          {loading ? (
            <Loading className="flex justify-center" />
          ) : (
            <div className="space-y-5">
              <nav className="flex flex-nowrap overflow-x-auto space-x-2  md:space-x-5 pb-3">
                {["Todos", "Pendientes", "En Progreso", "Completados"].map(
                  (type) => (
                    <button
                      key={type}
                      className={`px-4 whitespace-nowrap text-xs sm:text-base font-medium py-1 border rounded-full cursor-pointer ${
                        filter === type
                          ? "bg-red-400 text-white border-red-600"
                          : "bg-white text-gray-700 border"
                      }`}
                      onClick={() => setFilter(type)}
                    >
                      {type}
                    </button>
                  )
                )}
              </nav>
              { filtersResult && filtersResult.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {filtersResult.map((project) => (
                    <ProjectCard key={project.id_proyecto} project={project} />
                  ))}
                </div>
              ) : (
                <h3 className="font-medium text-zinc-600">
                  No hay proyectos{" "}
                  {filter !== "Todos" ? filter.toLowerCase() : ""}.
                </h3>
              )}
            </div>
          )}
        </section>
      </main>
    </Fade>
  );
}
