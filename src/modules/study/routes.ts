import { Router } from 'express'
import { crudRoutes } from '../../utils/crudRoutes.js'
import { StudyController } from './controller.js'
import { StudyService } from './service.js'

const studyRoutes = Router()
const studyController = new StudyController(new StudyService())

crudRoutes(studyRoutes, studyController)

export default studyRoutes
