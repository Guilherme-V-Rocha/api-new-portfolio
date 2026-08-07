import { type NextFunction, type Request, type Response } from 'express'
import { verifyToken } from '../utils/jwt.js'

export function auth(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization

  if (!authHeader?.startsWith('Bearer ')) {
    return res
      .status(401)
      .json({ error: 'Token não fornecido ou formato inválido' })
  }

  const token = authHeader.split(' ')[1]

  try {
    if (!token) {
      return res.status(401).json({ error: 'Token não fornecido' })
    }
    req.user = verifyToken(token)
    next()
  } catch {
    return res.status(401).json({ error: 'Token inválido ou expirado' })
  }
}
