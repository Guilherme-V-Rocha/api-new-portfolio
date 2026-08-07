import { Router } from 'express'
import { auth } from '../../middleawares/auth.js'
import {
  idSchema,
  validateRequest,
} from '../../middleawares/validateRequest.js'
import { crudRoutes } from '../../utils/crudRoutes.js'
import { StackController } from './controller.js'
import { StackService } from './service.js'
import { stackSchema } from './validations.js'

const stackRoutes = Router()
const stackController = new StackController(new StackService())

crudRoutes(stackRoutes, stackController, {
  auth: [auth],
  validate: [validateRequest({ body: stackSchema })],
  id: [validateRequest({ params: idSchema })],
})

export default stackRoutes
