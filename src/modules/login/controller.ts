import { type Request, type Response } from 'express'
import type { LoginService } from './service.js'

export class LoginController {
  private loginService: LoginService

  constructor(loginService: LoginService) {
    this.loginService = loginService
  }

  async login(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body
    const result = await this.loginService.login(email, password)
    if (result.ok) {
      return res.status(200).json(result.value)
    }
    return res.status(401).json({ error: result.error.message })
  }

  async register(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body
    const result = await this.loginService.register(email, password)
    if (result.ok) {
      return res.status(201).json(result.value)
    }
    return res.status(400).json({ error: result.error.message })
  }

  async deleteAccount(req: Request, res: Response): Promise<Response> {
    const { id } = req.params
    if (!id) {
      return res.status(400).json({ error: 'User ID is required' })
    }
    const result = await this.loginService.deleteAccount(id)
    if (result.ok) {
      return res.status(200).json(result.value)
    }
    return res.status(400).json({ error: result.error.message })
  }
}
