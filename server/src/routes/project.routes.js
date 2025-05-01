import { Router } from 'express'
import { validateToken } from '../middlewares/validateToken.js'
import { ProjectController } from '../controllers/project.controller.js'

const router = Router()

router.get('/projects', validateToken, ProjectController.getProjects)
router.post('/create-project', validateToken, ProjectController.createProject )
router.put('/update-project/:id', validateToken )
router.delete('/delete-project/:id', validateToken, ProjectController.deleteProject )

export default router