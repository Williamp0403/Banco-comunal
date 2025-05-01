import { useState } from "react"
import { loginRequest } from "../api/auth"
import { toast } from 'sonner';

export function useAuth () {
  const { user, setUser } = useState(null)
  
  async function login (data) {
    try {
      const res = await loginRequest(data)
      console.log(res)
      toast.success(`Bienvenido ${res.data.usuario.nombre + " " +  res.data.usuario.apellido}.` )
    } catch (e) {
      console.log(e)
      toast.error(e.response.data.message)
    }
  }

  return {
    user,
    login
  }
}