import express from 'express'
import { BookRoute } from './book.router'
const router = express.Router()

const moduleRoute = [
  {
    path: '/book',
    route: BookRoute,
  },
]

moduleRoute.forEach(route => router.use(route.path, route.route))
export const RootRoute = router
