import express from 'express'
import { BookRoute } from '../modules/Book/book.router'
import { AuthRoute } from '../modules/Auth/auth.route'

const router = express.Router()

const moduleRoute = [
  {
    path: '/books',
    route: BookRoute,
  },
  {
    path: '/auth',
    route: AuthRoute,
  },
]

moduleRoute.forEach(route => router.use(route.path, route.route))
export const RootRoute = router
