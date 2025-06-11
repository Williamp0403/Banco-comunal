import { ProjectModel } from "../models/project.js";
import cron from "node-cron"

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
      if(!response.success) return res.status(409).json({ message: response.message })

      res.json({ message: 'Proyecto creado exitosamente.', project: response.project })
    } catch (e) {
      console.log(e)
      res.status(500).json({ message: 'Error en el servidor.' })
    }
  }

  static async updateStateProject (req, res) {
    try {
      const response = await ProjectModel.queryUpdateStateProject(req.body, req.params.id)
      if(!response.success) return res.status(404).json({ message: response.message })

      res.json({ project: response.project })
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

  static async addAmount (req, res) {
    try {
      const { id } = req.params
      const response = await ProjectModel.queryAddAmount(req.body, id, req.user.id_user)
      if(!response.success) return res.status(404).json({ message: response.message })

      res.json({ message: response.message, project: response.project, newTotalAmount: response.newTotalAmount })
      
    } catch (e) {
      console.log(e)
      res.status(500).json({ message: 'Error en el servidor.' })     
    }
  }

  static async withDrawAmount (req, res) {
    try {
      const { id } = req.params
      const response = await ProjectModel.queryWithDrawAmount(req.body, id, req.user.id_user)
      if(!response.success) return res.status(response.status).json({ message: response.message })

      res.json({ message: response.message, project: response.project, newTotalAmount: response.newTotalAmount })
    } catch (e) {
      console.log(e)
      res.status(500).json({ message: 'Error en el servidor.' })    
    }
  }
}

cron.schedule("0 0 * * *", async () => {
  console.log("🔄 Ejecutando actualización de proyectos vencidos...");
  try {
    await ProjectModel.updateExpiredProjects();
    console.log("✅ Proyectos vencidos actualizados correctamente.");
  } catch (error) {
    console.error("❌ Error al actualizar proyectos vencidos:", error);
  }
});