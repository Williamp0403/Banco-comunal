import { Router } from 'express'
import { BankController } from '../controllers/bank.controller.js'
import { validateToken } from '../middlewares/validateToken.js'

const router = Router()

router.get('/bank', validateToken, BankController.getBank)

export default router