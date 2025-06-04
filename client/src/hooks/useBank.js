import { useState } from "react"
import { addAmountRequest, bankRequest, createProjectRequest, getProjectsRequest, withdrawAmountRequest } from "../api/bank"
import { toast } from "sonner"
import { handlingErros } from "../errors/error"

export function useBank() {
  const [ totalCredit, setTotalCredit ] = useState(null)
  const [ projects, setProjects ] = useState([])
  const [ loading, setLoading ] = useState(true)

  async function getBankData () {
    try {
      const [creditResponse, projectsResponse] = await Promise.all([
        bankRequest(),
        getProjectsRequest()
      ])
      setTotalCredit(creditResponse.data.saldoTotal)
      setProjects(projectsResponse.data.proyectos)
    } catch (e) {
      console.error(e);
      toast.error(handlingErros(e))
    } finally {
      setLoading(false)
    }
  }

  async function createProject(data, reset) {
    try {
      const response = await createProjectRequest(data)
      reset()
      toast.success('Proyecto creado correctamente.')
    } catch (e) {
      console.log(e)
      toast.error(handlingErros(e))
    }
  }

  async function addAmount (data, id, close) {
    try {
      const response = await addAmountRequest(data, id)
      const { project: projectUpdated, newTotalAmount } = response.data

      setProjects(prevProjects =>
        prevProjects.map(project =>
          project.id_proyecto === projectUpdated.id_proyecto 
            ? { ...project, monto_total: projectUpdated.monto_total }
            : project
        )
      )
      setTotalCredit(newTotalAmount)

      toast.success('Saldo agregado correctamente.')
      close()
    } catch (e) {
      console.log(e)
      toast.error(handlingErros(e))
    }
  }

  async function withdrawAmount (data, id, close) {
    try {
      const response = await withdrawAmountRequest(data, id)
      const { project: projectUpdated, newTotalAmount } = response.data

      setProjects(prevProjects =>
        prevProjects.map(project =>
          project.id_proyecto === projectUpdated.id_proyecto 
            ? { ...project, monto_gastado: projectUpdated.monto_gastado }
            : project
        )
      )
      setTotalCredit(newTotalAmount)

      toast.success('Operacion realizada exitosamente.')
      close()
    } catch (e) {
      console.log(e)
      toast.error(handlingErros(e))
    }
  }

  return {
    totalCredit,
    projects,
    loading,
    getBankData,
    createProject,
    addAmount,
    withdrawAmount
  }
}