import express from 'express'
import { BookRoute } from '../modules/Book/book.router'
import { AuthRoute } from '../modules/Auth/auth.route'
import { WishListRoute } from '../modules/wishlist/wishlitst.router'
import { ReadingRoute } from '../modules/readinglist/reading.route'

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
  {
    path: '/wishlist',
    route: WishListRoute,
  },
  {
    path: '/readList',
    route: ReadingRoute,
  },
]

moduleRoute.forEach(route => router.use(route.path, route.route))
export const RootRoute = router
