import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import morgan from 'morgan'
import cookieParser from 'cookie-parser'
import authRoutes from "./routes/auth.routes.js"
import projectRoutes from "./routes/project.routes.js"
import bankRoutes from "./routes/bank.routes.js"
import movementsRoutes from "./routes/movements.routes.js"
import "./controllers/project.controller.js"

dotenv.config()

const app = express()
const PORT = process.env.PORT

app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}))
app.use(morgan('dev'))
app.use(express.json())
app.use(cookieParser())

app.use(authRoutes)
app.use(projectRoutes)
app.use(bankRoutes)
app.use(movementsRoutes)

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto http://localhost:${PORT}`)
})