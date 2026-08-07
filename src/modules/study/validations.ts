import z from 'zod'

export const studySchema = z.object({
  title: z.string().min(1, { error: 'O título do estudo é obrigatório' }),
  description: z
    .string()
    .min(1, { error: 'A descrição do estudo é obrigatória' }),
})
