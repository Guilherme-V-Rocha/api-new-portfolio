import { type NextFunction, type Request, type Response } from 'express'
import { verifyToken } from '../utils/jwt.js'

// export function auth(req: Request, res: Response, next: NextFunction) {
//   const authHeader = req.headers.authorization

//   if (!authHeader?.startsWith('Bearer ')) {
//     return res
//       .status(401)
//       .json({ error: 'Token não fornecido ou formato inválido' })
//   }

//   const token = authHeader.split(' ')[1]

//   try {
//     if (!token) {
//       return res.status(401).json({ error: 'Token não fornecido' })
//     }
//     req.user = verifyToken(token)
//     next()
//   } catch {
//     return res.status(401).json({ error: 'Token inválido ou expirado' })
//   }
// }

export function auth(req: Request, res: Response, next: NextFunction) {
  // LOG 1: Ver se o header existe
  console.log('=== AUTH DEBUG ===')
  console.log('Headers recebidos:', JSON.stringify(req.headers, null, 2))

  const rawHeader = req.headers.authorization || req.headers['x-auth-token']

  // Normaliza para string
  const authHeader = Array.isArray(rawHeader) ? rawHeader[0] : rawHeader

  // LOG 2: Ver o valor exato
  console.log('authHeader:', authHeader)
  console.log('typeof authHeader:', typeof authHeader)

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res
      .status(401)
      .json({ error: 'Token não fornecido ou formato inválido' })
  }

  const token = authHeader.split(' ')[1]

  // LOG 3: Ver o token extraído
  console.log('Token extraído:', token?.substring(0, 20) + '...')

  try {
    const decoded = verifyToken(token!)

    // LOG 4: Ver o que foi decodificado
    console.log('Token decodificado:', decoded)

    req.user = decoded
    next()
  } catch (err: any) {
    // LOG 5: Ver o erro EXATO do jwt
    console.log('ERRO no verifyToken:', err.message)
    console.log('Stack:', err.stack)
    return res
      .status(401)
      .json({ error: 'Token inválido ou expirado', details: err.message })
  }
}
