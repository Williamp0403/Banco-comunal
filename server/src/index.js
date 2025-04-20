import express from 'express'
import dotenv from 'dotenv'
import authRoutes from "./routes/auth.routes.js"

dotenv.config()

const app = express()
const PORT = process.env.PORT

app.use(express.json())
app.use(authRoutes)

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto http://localhost:${PORT}`)
})