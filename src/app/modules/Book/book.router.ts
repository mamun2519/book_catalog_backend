import express from 'express'
import { BookController } from './book.controller'
const router = express.Router()

router.get('/:id', BookController.getSingleBook)
router.patch('/:id', BookController.patchBook)
router.delete('/:id', BookController.deleteBook)
router.get('/:id', BookController.getBooks)
router.post('/', BookController.createBook)

export const BookRoute = router
