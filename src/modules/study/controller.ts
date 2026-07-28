import { type Request, type Response } from 'express'
import type { ICrudController } from '../../utils/crudRoutes.js'
import type { StudyService } from './service.js'

export class StudyController implements ICrudController {
  private studyService: StudyService

  constructor(studyService: StudyService) {
    this.studyService = studyService
  }

  async getAll(req: Request, res: Response): Promise<Response> {
    const result = await this.studyService.getAll()
    if (result.ok) {
      return res.status(200).json(result.value)
    }
    return res.status(500).json({ error: result.error })
  }

  async getById(req: Request, res: Response): Promise<Response> {
    const { id } = req.params
    const result = await this.studyService.getById(Number(id))
    if (result.ok) {
      return res.status(200).json(result.value)
    }
    return res.status(500).json({ error: result.error })
  }

  async create(req: Request, res: Response): Promise<Response> {
    const { title, description } = req.body
    if (!title || !description) {
      return res.status(400).json({ error: 'Missing required fields' })
    }
    const result = await this.studyService.create({ title, description })
    if (result.ok) {
      return res.status(201).json(result.value)
    }
    return res.status(500).json({ error: result.error })
  }

  async update(req: Request, res: Response): Promise<Response> {
    const { id } = req.params
    const { title, description } = req.body

    if (!title || !description) {
      return res.status(400).json({ error: 'Missing required fields' })
    }
    const result = await this.studyService.update(Number(id), {
      title,
      description,
    })
    if (result.ok) {
      return res.status(200).json(result.value)
    }
    return res.status(500).json({ error: result.error })
  }

  async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.params
    const result = await this.studyService.delete(Number(id))
    if (result.ok) {
      return res.status(200).json(result.value)
    }
    return res.status(500).json({ error: result.error })
  }
}
