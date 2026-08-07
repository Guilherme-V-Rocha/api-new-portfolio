import z from 'zod'

export const stackSchema = z.object({
  name: z.string().min(1, { error: 'O nome da stack é obrigatório' }),
  icon: z.string().min(1, { error: 'O ícone da stack é obrigatório' }),
})
