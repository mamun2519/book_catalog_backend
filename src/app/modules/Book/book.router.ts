import express from 'express'
import { BookController } from './book.controller'
const router = express.Router()
router.post('/', BookController.createBook)
router.get('/:id', BookController.getSingleBook)
router.patch('/:id', BookController.patchBook)
router.delete('/:id', BookController.deleteBook)
router.get('/', BookController.getBooks)

export const BookRoute = router
