import { useState } from "react"
import { getMovementsRequest } from "../api/movement"
import { toast } from "sonner"
import { handlingErros } from "../errors/error"

export function useMovement () {
  const [ movements, setMovements ] = useState(null)
  const [ loading, setLoading ] = useState(true)

  async function getMovements (data) {
    try {
      const response = await getMovementsRequest(data)
      setMovements(response.data.movements)
    } catch (e) {
      console.log(e)
      toast.error(handlingErros(e))
    } finally {
      setLoading(false)
    }
  }

  return {
    movements,
    loading,
    getMovements
  }
}
