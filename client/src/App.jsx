import { Toaster } from "sonner"
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { LoginPage } from "./pages/LoginPage"
import { AuthProvider } from "./context/AuthContext"
import { DashboardPage } from "./pages/DashboardPage"
import { PublicRoute } from "./PublicRoute"
import { ProtectedRoute } from "./ProtectedRoute"
import { BankProvider } from "./context/BankContext"
import { ProjectsPage } from "./pages/ProjectsPage"
import { CreateProjectPage } from "./pages/CreateProjectPage"

function App() {

  return (
    <AuthProvider>
      <BankProvider>
        <Toaster richColors/>
        <BrowserRouter>
            <div className="min-h-screen bg-zinc-100">
              <Routes>

                  <Route element={<PublicRoute/>}>
                    <Route path="/" element={<LoginPage/>}/>  
                  </Route>

                  <Route element={<ProtectedRoute/>}>  
                    <Route path="/dashboard" element={<DashboardPage/>}/>
                    <Route path="/proyectos" element={<ProjectsPage/>}/>
                    <Route path="/crear-proyecto" element={<CreateProjectPage/>}/>
                  </Route>

                  <Route path='*' element={<h1>404 Not Found</h1>}/>

              </Routes>
            </div>
        </BrowserRouter>
      </BankProvider>
    </AuthProvider>
  )
}

export default App
