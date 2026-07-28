import { Router } from 'express'
import { crudRoutes } from '../../utils/crudRoutes.js'
import { ProjectsController } from './controller.js'
import { ProjectsService } from './service.js'

const projectsRoutes = Router()
const projectsController = new ProjectsController(new ProjectsService())

crudRoutes(projectsRoutes, projectsController)

export default projectsRoutes
