import { useState } from "react"
import { addAmountRequest, bankRequest, createProjectRequest, deleteProjectRequest, getProjectsRequest, updateStateRequest, withdrawAmountRequest } from "../api/bank"
import { toast } from "sonner"
import { handlingErros } from "../errors/error"
import { latestMovementsRequest } from "../api/movement"

export function useBank() {
  const [ totalCredit, setTotalCredit ] = useState(null)
  const [ projects, setProjects ] = useState([])
  const [ latestMovements, setLatestMovements ] = useState([])
  const [ loading, setLoading ] = useState(true)

  async function getBankData() {
    try {
      const [{ data: creditData }, { data: projectsData }, { data: movementsData }] = await Promise.all([
        bankRequest(),
        getProjectsRequest(),
        latestMovementsRequest()
      ])

      setTotalCredit(creditData.saldoTotal);
      setProjects(projectsData.proyectos);
      setLatestMovements(movementsData.ultimosMovimientos);
    } catch (e) {
      toast.error(handlingErros(e));
    } finally {
      setLoading(false);
    }
  }

  async function createProject(data, reset) {
    try {
      await createProjectRequest(data)
      reset()
      toast.success('Proyecto creado correctamente.')
    } catch (e) {
      toast.error(handlingErros(e))
    }
  }

  async function updateState (data, id, handleCloseMenu) {
    try {
      const response = await updateStateRequest(data, id)
      const projectUpdated = response.data.project
      setProjects(prevProjects =>
        prevProjects.map(project =>
          project.id_proyecto === projectUpdated.id_proyecto 
            ? { 
                ...project, 
                estado: projectUpdated.estado, 
                fecha_inicio: projectUpdated.fecha_inicio,
                fecha_fin: projectUpdated.fecha_fin
              }
            : project
        )
      )
      handleCloseMenu()
      toast.success('Proyecto actualizado ha "En progreso" exitosamente.')
    } catch (e) {
      toast.error(handlingErros(e))
    }
  }

  async function deleteProject (id) {
    try {
      await deleteProjectRequest(id)
      setProjects(prevProjects => prevProjects.filter(project => (project.id_proyecto !== id)))
      toast.success('Proyecto eliminado correctamente.')
    } catch (e) {
      toast.error(handlingErros(e))
    }
  }

  async function addAmount (data, id, close) {
    try {
      const response = await addAmountRequest(data, id)
      const { project: projectUpdated, newTotalAmount, movement } = response.data

      setProjects(prevProjects =>
        prevProjects.map(project =>
          project.id_proyecto === projectUpdated.id_proyecto 
            ? { ...project, monto_total: projectUpdated.monto_total }
            : project
        )
      )
      setTotalCredit(newTotalAmount)
      setLatestMovements(prevMovements => [movement, ...prevMovements].slice(0, 5))
      toast.success('Saldo agregado correctamente.')
      close()
    } catch (e) {
      toast.error(handlingErros(e))
    }
  }

  async function withdrawAmount (data, id, reset) {
    try {
      const response = await withdrawAmountRequest(data, id)
      const { project: projectUpdated, newTotalAmount, movement } = response.data

      setProjects(prevProjects =>
        prevProjects.map(project =>
          project.id_proyecto === projectUpdated.id_proyecto 
            ? { ...project, monto_gastado: projectUpdated.monto_gastado }
            : project
        )
      )
      setTotalCredit(newTotalAmount)
      setLatestMovements(prevMovements => [movement, ...prevMovements].slice(0, 5))
      toast.success('Operacion realizada exitosamente.')
      reset()
    } catch (e) {
      toast.error(handlingErros(e))
    }
  }

  return {
    totalCredit,
    projects,
    latestMovements,
    loading,
    getBankData,
    createProject,
    updateState,
    deleteProject,
    addAmount,
    withdrawAmount
  }
}