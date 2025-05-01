import { Toaster } from "sonner"
import { Header } from "./components/Header"
import { LoginPage } from "./pages/LoginPage"

function App() {

  return (
    <>
      <Toaster richColors/>
      <div className="min-h-screen bg-zinc-100">
        <Header/>
        <LoginPage/>
      </div>
    </>
  )
}

export default App
