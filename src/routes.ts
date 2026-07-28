import { Router } from 'express'
import projectsRoutes from './modules/projects/routes.js'
import stackRoutes from './modules/stack/routes.js'
import studyRoutes from './modules/study/routes.js'

const routes = Router()

routes.get('/', (req, res) => {
  res.status(200).json({ message: 'Route for listing projects is working!' })
})

routes.use('/projects', projectsRoutes)
routes.use('/stacks', stackRoutes)
routes.use('/study', studyRoutes)

export default routes
