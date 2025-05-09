import { useState } from "react"
import { bankRequest, createProjectRequest, getProjectsRequest } from "../api/bank"
import { toast } from "sonner"
import { handlingErros } from "../errors/error"

export function useBank() {
  const [ totalCredit, setTotalCredit ] = useState(0)
  const [ projects, setProjects ] = useState([])
  const [ loading, setLoading ] = useState(true)

  async function getBankData() {
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
      console.log(response)
      reset()
      toast.success('Proyecto creado correctamente.')
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
    createProject
  }
}