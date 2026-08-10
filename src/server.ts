import type { VercelRequest, VercelResponse } from '@vercel/node'
import { app } from './app.js'
import { initializeDatabase } from './lib/prisma.js'
import routes from './routes.js'

let initialized = false

async function init() {
  if (!initialized) {
    await initializeDatabase()
    app.use('/', routes)
    initialized = true
  }
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  await init()
  return app(req, res)
}

if (process.env.NODE_ENV !== 'production') {
  const port = process.env.PORT || 4000
  init().then(() => {
    app.listen(port, () => {
      console.log(`Server running on ${port}`)
    })
  })
}
