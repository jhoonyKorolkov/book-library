import router from '../routes/index.js'
import { Express } from 'express'

const configureRoutes = (app: Express) => {
  app.use(router)
}

export default configureRoutes
