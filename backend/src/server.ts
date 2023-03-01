import { json, urlencoded } from 'express'
import cors from 'cors'

import { config, initAppEnv } from './config/env'
import App from './app'
import AuthController from './controllers/auth.controller'
import PublicController from './controllers/public.controller'
import DashboardController from './controllers/dashboard.controller'

// Config app env
try {
  initAppEnv()
} catch (e) {
  console.error('\n\nError: dotenv `.env` not found\n\n')
  process.exit(1)
}

// Start app server
const app = new App({
  port: config.port,
  controllers: [
    new AuthController(),
    new PublicController(),
    new DashboardController(),
  ],
  middlewares: [cors(), json(), urlencoded({ extended: true })],
})
const server = app.listen()

// Handle app termination
process.on('SIGTERM', async () => {
  server.close(() => {
    console.log('⭐ Web server closed.')
  })
})
