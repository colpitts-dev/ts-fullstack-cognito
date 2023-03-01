import express, { Application, Router } from 'express'
import { Server } from 'http'

/**
 * Web App Starter
 * TypeScript + Express node project starter files
 */
class App {
  public app: Application
  public port: number

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(appInit: { port: number; middlewares: any; controllers: any }) {
    this.app = express()
    this.port = appInit.port

    this.middlewares(appInit.middlewares)
    this.routes(appInit.controllers)
  }

  public listen(): Server {
    return this.app.listen(this.port, () => {
      console.log(`🚀 [express]: Web server listening on ${this.port}`)
    })
  }

  private routes(controllers: []) {
    controllers.forEach((controller: { path: string; router: Router }) => {
      this.app.use(controller.path, controller.router)
    })
  }

  private middlewares(middlewares: []) {
    middlewares.forEach((middleware: () => void) => {
      this.app.use(middleware)
    })
  }
}

export default App
