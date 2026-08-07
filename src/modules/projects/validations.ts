import z from 'zod'

export const projectSchema = z.object({
  name: z.string().min(1, { error: 'O nome do projeto é obrigatório' }),
  description: z
    .string()
    .min(1, { error: 'A descrição do projeto é obrigatória' }),
  image: z.url({ error: 'A imagem do projeto deve ser uma URL válida' }),
  link: z.url({ error: 'O link do projeto deve ser uma URL válida' }),
})
