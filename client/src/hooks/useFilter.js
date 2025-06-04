import { useState } from "react"

export function useFilter () {
  const [filter, setFilter] = useState("Todos")

  const mapFilterToStatus = (filterValue) => {
    switch (filterValue) {
      case "Pendientes":
        return "Pendiente";
      case "En Progreso":
        return "En Progreso";
      case "Completados":
        return "Completado";
      default:
        return null;
    }
  };
  
  const filteredProjects = (filter, projects) => {
    if(filter === "Todos") return projects
    const status = mapFilterToStatus(filter);
    return projects.filter(project => project.estado === status)
  }
  
  return {
    filter,
    setFilter,
    filteredProjects
  }
}