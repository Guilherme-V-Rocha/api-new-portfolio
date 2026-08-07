import { Router } from 'express'
import loginRoutes from './modules/login/routes.js'
import projectsRoutes from './modules/projects/routes.js'
import stackRoutes from './modules/stack/routes.js'
import studyRoutes from './modules/study/routes.js'

const routes = Router()

routes.use('/login', loginRoutes)
routes.use('/projects', projectsRoutes)
routes.use('/stacks', stackRoutes)
routes.use('/study', studyRoutes)

export default routes
