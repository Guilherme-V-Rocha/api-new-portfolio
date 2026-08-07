import { Router } from 'express'
import { auth } from '../../middleawares/auth.js'
import {
  idSchema,
  validateRequest,
} from '../../middleawares/validateRequest.js'
import { crudRoutes } from '../../utils/crudRoutes.js'
import { StudyController } from './controller.js'
import { StudyService } from './service.js'
import { studySchema } from './validations.js'

const studyRoutes = Router()
const studyController = new StudyController(new StudyService())

crudRoutes(studyRoutes, studyController, {
  auth: [auth],
  validate: [validateRequest({ body: studySchema })],
  id: [validateRequest({ params: idSchema })],
})

export default studyRoutes
