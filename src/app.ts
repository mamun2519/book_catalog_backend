import express, { Application, NextFunction, Request, Response } from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'

import globalErrorHandler from './app/middleware/globalError'
import { RootRoute } from './app/routes'
const app: Application = express()

// parser
app.use([
  express.json(),
  cors({
    origin: '*',
  }),
  express.urlencoded({ extended: true }),
  cookieParser(),
])

// application route
app.use('/api/v1/', RootRoute)

// test route
app.get('/', async (req: Request, res: Response) => {
  res.status(200).json({ message: 'Server start' })
})

// Global Error Handle
app.use(globalErrorHandler)

// Handle not found route
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({
    success: false,
    message: 'Not Found',
    errorMessages: [{ path: req.originalUrl, message: 'API not found!' }],
  })
  next()
})
export default app
