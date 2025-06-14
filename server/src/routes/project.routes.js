import { Router } from 'express'
import { validateToken } from '../middlewares/validateToken.js'
import { ProjectController } from '../controllers/project.controller.js'
import { validateData } from '../middlewares/validateData.js'
import { projectSchema, TransitionSchema, UpdateStateSchema } from '../schemas/project.schema.js'

const router = Router()

router.get('/projects', validateToken, ProjectController.getProjects )
router.post('/create-project', validateToken, validateData(projectSchema), ProjectController.createProject )
router.put('/update-project/:id', validateToken )
router.put('/update-state/:id', validateToken, validateData(UpdateStateSchema), ProjectController.updateStateProject )
router.delete('/delete-project/:id', validateToken, ProjectController.deleteProject )
router.put('/add-amount/:id', validateToken, validateData(TransitionSchema), ProjectController.addAmount )
router.put('/withdraw-amount/:id', validateToken, validateData(TransitionSchema), ProjectController.withDrawAmount ) 
router.get('/update-expired-projects', ProjectController.updateExpiredProjects)

export default router