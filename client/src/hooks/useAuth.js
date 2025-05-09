import { useEffect, useState } from "react"
import { loginRequest, logoutRequest, verifyTokenRequest } from "../api/auth"
import { toast } from 'sonner';
import { handlingErros } from "../errors/error";

export function useAuth () {
  const [ user, setUser ] = useState(null)
  const [ loading, setLoading ] = useState(true)
  const [ isAuthenticated, setIsAuthenticated ] = useState(false)

  useEffect(() => {
    const verifyToken = async () => {
      try {
        const res = await verifyTokenRequest()
        setIsAuthenticated(true)
        setUser(res.data.usuario)
      } catch (e) {
        setIsAuthenticated(false)
        setUser(null)
      } finally {
        setLoading(false)
      }
    };

    verifyToken()
  }, [])
  
  async function login (data) {
    try {
      const res = await loginRequest(data)
      console.log(res)
      setUser(res.data.usuario)
      setIsAuthenticated(true)
      toast.success(`Sesion iniciada correctamente.` )
    } catch (e) {
      console.log(e)
      toast.error(handlingErros(e))
    }
  }

  async function logout () {
    try {
      const res = await logoutRequest()
      console.log('logut', res)
      setIsAuthenticated(false)
      setUser(null)
    } catch (e) {
      console.log(e)
    }
  }

  return {
    user,
    loading,
    isAuthenticated,
    login,
    logout
  }
}