import { Router } from 'express'
import { validateToken } from '../middlewares/validateToken.js'
import { MovementsController } from '../controllers/movements.controller.js'
import { validateData } from '../middlewares/validateData.js'
import { MovementSchema } from '../schemas/movement.schema.js'

const routes = Router()

routes.get('/movements', validateToken, validateData(MovementSchema), MovementsController.getMovements)
routes.get('/latest-movements', validateToken, MovementsController.latestMovements)
routes.get('/movements-all', validateToken, MovementsController.getAllMovements)

export default routes