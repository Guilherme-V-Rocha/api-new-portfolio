import { Router } from 'express'
import { auth } from '../../middleawares/auth.js'
import {
  idSchema,
  validateRequest,
} from '../../middleawares/validateRequest.js'
import { crudRoutes } from '../../utils/crudRoutes.js'
import { ProjectsController } from './controller.js'
import { ProjectsService } from './service.js'
import { projectSchema } from './validations.js'

const projectsRoutes = Router()
const projectsController = new ProjectsController(new ProjectsService())

crudRoutes(projectsRoutes, projectsController, {
  auth: [auth],
  validate: [validateRequest({ body: projectSchema })],
  id: [validateRequest({ params: idSchema })],
})

export default projectsRoutes
