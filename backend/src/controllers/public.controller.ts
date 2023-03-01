import express, { Request, Response } from 'express'

class PublicController {
  public path = '/'
  public router = express.Router()

  constructor() {
    this.initRoutes()
  }

  private initRoutes() {
    this.router.get('/', this.landing)
  }

  landing(req: Request, res: Response) {
    res.json({
      status: 'success',
      data: { message: 'Welcome back! Please sign in to continue.' },
    })
  }
}

export default PublicController
