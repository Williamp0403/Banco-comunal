import { ProjectModel } from "../models/project.js";

export class ProjectController {
  static async getProjects (req, res) {
    try {
      const response = await ProjectModel.queryGetProjects()
      res.json({ proyectos: response })
    } catch (e) {
      console.log(e)
      res.status(500).json({ message: 'Error en el servidor.' })
    }
  }

  static async createProject (req,res) {
    try {
      const response = await ProjectModel.queryCreateProject(req.body, req.user.id_user)
      res.status(201).json({ message: 'Proyecto creado exitosamente.', project: response.project })
    } catch (e) {
      console.log(e)
      res.status(500).json({ message: 'Error en el servidor.' })
    }
  }

  static async deleteProject (req,res) {
    try {
      const { id } = req.params
      const response = await ProjectModel.queryDeleteProject(id)
      if(!response.success) return res.status(404).json({ message: response.message })
      
      res.json({ message: response.message, project: response.project })
    } catch (e) {
      console.log(e)
      res.status(500).json({ message: 'Error en el servidor.' })
    }
  }
}