import z from 'zod'

export const projectSchema = z.object({
  title: z.string().min(6, { error: 'O título do projeto é obrigatório' }),
  shortDescription: z
    .string()
    .min(10, { error: 'A descrição do projeto é obrigatória' }),
  highlights: z
    .array(z.string())
    .min(1, { error: 'Os destaques do projeto são obrigatórios' }),
  type: z.string().min(4, { error: 'O tipo do projeto é obrigatório' }),
  link: z.url({ error: 'O link do projeto é obrigatório' }),
  stacksIds: z.array(z.number()).optional(),
})
