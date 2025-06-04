import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import { HeaderPrivate } from "./components/HeaderPrivate";
import { Loading } from "./components/Loading";

export function ProtectedRoute () {
  const { isAuthenticated, loading } = useAuth()

  if(loading) return <Loading className='flex justify-center items-center min-h-screen'/>

  if(!loading && !isAuthenticated) return <Navigate to='/' replace />

  return (
    <>
      <HeaderPrivate/>
      <Outlet />
    </>
  )
}