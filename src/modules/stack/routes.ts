import { Router } from 'express'
import { crudRoutes } from '../../utils/crudRoutes.js'
import { StackController } from './controller.js'
import { StackService } from './service.js'

const stackRoutes = Router()
const stackController = new StackController(new StackService())

crudRoutes(stackRoutes, stackController)

export default stackRoutes
