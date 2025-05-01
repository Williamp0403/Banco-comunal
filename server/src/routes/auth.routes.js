import { Router } from "express"
import { authController } from "../controllers/auth.controller.js"
import { validateData } from "../middlewares/validateData.js"
import { loginSchema, registerSchema } from "../schemas/auth.schema.js"

const router = Router()

router.post('/register', validateData(registerSchema), authController.register)
router.post('/login', validateData(loginSchema), authController.login)
router.post('/logout', authController.logout)

export default router