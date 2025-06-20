import { useEffect, useState } from "react"
import { getProjectsRequest } from "../api/bank"
import { getAllMovementsRequest } from "../api/movement"
import { groupMovementsByDay } from '../utils/groupMovementsByDay'
import { toast } from "sonner"
import { handlingErros } from "../errors/error"

export function useReports () {
  const [fundsPerProject, setFundsPerProject] = useState([])
  const [projectStatus, setProjectStatus] = useState([])
  const [movementsOverTime, setMovementsOverTime] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([getProjectsRequest(), getAllMovementsRequest()])
    .then(([projectsResponse, movementsResponse]) => {
      const projects = projectsResponse.data.proyectos
      const movements = movementsResponse.data.movimientos

      // Fondos por proyecto
      const activeProjects = projects.filter(p => p.estado === "En Progreso")
      setFundsPerProject(
        activeProjects.map(p => ({
          label: p.nombre,
          value: Number((p.monto_total - p.monto_gastado).toFixed(2))
        }))
      )

      // Estado de proyectos
      const estados = {
        'Pendiente': 0,
        'En Progreso': 0,
        'Completado': 0
      }
      projects.forEach(p => {
        estados[p.estado] += 1
      })
      setProjectStatus(
        Object.entries(estados).map(([estado, count]) => ({
          label: estado,
          value: count
        }))
      )

      // Movimientos agrupados por día 
      const groupedMovements = groupMovementsByDay(movements)
      setMovementsOverTime(groupedMovements)
    })
    .catch(e => {
      toast.error(handlingErros(e))
    })
    .finally(() => {
      setLoading(false)
    })
  }, [])

  return {
    fundsPerProject,
    projectStatus,
    movementsOverTime,
    loading
  }
}