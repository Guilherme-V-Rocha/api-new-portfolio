import cors from 'cors'
import express from 'express'

const app = express()

app.use(
  cors({ origin: 'https://guilherme-v-rocha.github.io/guilhermevieira/' }),
)

app.use(express.json())

export { app }
