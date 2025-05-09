import { useEffect } from "react"
import { useAuth } from "../context/AuthContext"
import { useBank } from "../context/BankContext"
import { Loading } from "../components/Loading"
import { NavProjects } from "../components/NavProjects"

export function DashboardPage () {
  const { user } = useAuth()
  const { getBankData, totalCredit, loading } = useBank()

  useEffect(() => {
    getBankData()
  }, [])

  return (
    <main className="container mx-auto ">
      <section className="p-8 sm:p-10">
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-medium mb-5 lg:mb-10">Bienvenido {user.nombre + " " + user.apellido}.</h1>
        {
          loading ? <Loading/> :
          <h2 className="text-xl lg:text-2xl font-medium">{totalCredit} Bs.</h2> 
        }
        <NavProjects/>
      </section>
    </main>
  )
}