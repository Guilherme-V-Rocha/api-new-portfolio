import { type NextFunction, type Request, type Response } from 'express'
import { z } from 'zod'

type ValidationTarget = Partial<{
  body: z.ZodTypeAny
  params: z.ZodTypeAny
}>

export const idSchema = z.object({
  id: z.string().min(1, { error: 'O ID não pode ser vazio' }),
})

export function validateRequest(schemas: ValidationTarget) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      if (schemas.params)
        Object.assign(req, { params: schemas.params.parse(req.params) })
      if (schemas.body)
        Object.assign(req, { body: schemas.body.parse(req.body) })
      next()
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ errors: error.issues })
      }
      next(error)
    }
  }
}
