import express, { Application, Request, Response } from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
const app: Application = express()

// parser
app.use([
  express.json(),
  cors(),
  express.urlencoded({ extended: true }),
  cookieParser(),
])

// application route

// test route
app.get('/', async (req: Request, res: Response) => {
  res.status(200).json({ message: 'Server start' })
})

// Global Error Handle

// Handle not found route
export default app
