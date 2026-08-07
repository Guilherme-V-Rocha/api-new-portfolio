import type { UserPayload } from '../utils/jwt.js' // Ajuste o caminho se necessário

declare module 'express-serve-static-core' {
  interface Request {
    user?: UserPayload
  }
}
