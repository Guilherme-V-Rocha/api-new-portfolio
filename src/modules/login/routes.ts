import { Router } from 'express'
import { validateRequest } from '../../middleawares/validateRequest.js'
import { LoginController } from './controller.js'
import { LoginService } from './service.js'
import { loginSchema, registerSchema } from './validations.js'

const loginRoutes = Router()
const loginController = new LoginController(new LoginService())

loginRoutes.post('/login', validateRequest({ body: loginSchema }), (req, res) =>
  loginController.login(req, res),
)

loginRoutes.post(
  '/register',
  validateRequest({ body: registerSchema }),
  (req, res) => loginController.register(req, res),
)

loginRoutes.delete('/:id', (req, res) =>
  loginController.deleteAccount(req, res),
)

export default loginRoutes
