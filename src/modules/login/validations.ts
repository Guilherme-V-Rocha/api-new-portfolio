import { z } from 'zod'

export const loginSchema = z.object({
  email: z.email('Formato de e-mail inválido'),
  password: z.string().min(6, 'A senha precisa ter no mínimo 6 caracteres'),
})

export const registerSchema = loginSchema.partial()
