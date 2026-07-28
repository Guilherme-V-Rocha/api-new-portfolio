import { app } from './app.js'
import { initializeDatabase } from './lib/prisma.js'
import routes from './routes.js'

const port = process.env.APP_PORT || 3000

initializeDatabase()
  .then(() => {
    app.use('/api', routes)
    app.listen(port, () => {
      console.log(`Server running on ${port}`)
    })
  })
  .catch((error) => {
    console.error('Error starting server:', error)
    process.exit(1)
  })
