import {
  type Request,
  type RequestHandler,
  type Response,
  Router,
} from 'express'

export interface ICrudController {
  getAll(req: Request, res: Response): Promise<Response>
  getById(req: Request, res: Response): Promise<Response>
  create(req: Request, res: Response): Promise<Response>
  update(req: Request, res: Response): Promise<Response>
  delete(req: Request, res: Response): Promise<Response>
}

interface CrudMiddlewares {
  auth: RequestHandler[]
  validate: RequestHandler[]
  id: RequestHandler[]
}

export function crudRoutes(
  router: Router,
  controller: ICrudController,
  middlewares: CrudMiddlewares,
) {
  router.get('/', (req, res) => controller.getAll(req, res))
  router.get('/:id', ...middlewares.auth, ...middlewares.id, (req, res) =>
    controller.getById(req, res),
  )

  router.post('/', ...middlewares.auth, ...middlewares.validate, (req, res) =>
    controller.create(req, res),
  )
  router.put(
    '/:id',
    ...middlewares.auth,
    ...middlewares.id,
    ...middlewares.validate,
    (req, res) => controller.update(req, res),
  )

  router.delete('/:id', ...middlewares.auth, ...middlewares.id, (req, res) =>
    controller.delete(req, res),
  )
}
