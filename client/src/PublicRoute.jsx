import { Navigate, Outlet } from "react-router-dom"
import { useAuth } from "./context/AuthContext"
import { Header } from "./components/Header"
import { Loading } from "./components/Loading"

export function PublicRoute () {
  const { isAuthenticated, loading } = useAuth()

  if(loading) return <Loading className='flex justify-center items-center min-h-screen'/>

  if(!loading && isAuthenticated) return <Navigate to='/dashboard' replace />

  return (
    <>
      <Header/>
      <Outlet />
    </>
  )
}