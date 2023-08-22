import { Request, Response } from 'express'
import catchAsync from '../../../helper/catchAsync'
import sendResponse from '../../../helper/sendResponse'
import { IBook } from './book.interface'
import StatusCode from 'http-status-codes'
import { BookService } from './book.service'
import pick from '../../../shared/pick'
import { bookFilterableFields } from './book.constant'

const createBook = catchAsync(async (req: Request, res: Response) => {
  const { ...bookData } = req.body

  const result = await BookService.createBookFromDB(bookData)

  sendResponse<IBook>(res, {
    statusCode: StatusCode.OK,
    success: true,
    message: 'Book create successfully',
    data: result,
  })
})

const getBooks = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, bookFilterableFields)
  console.log(req.query)
  const result = await BookService.getAllBooksFromDB(filters)
  sendResponse<IBook[]>(res, {
    statusCode: StatusCode.OK,
    success: true,
    message: 'Book get Successfully!',
    data: result,
  })
})

const getSingleBook = catchAsync(async (req: Request, res: Response) => {
  const result = await BookService.getBookDetailsFromDB(req.params.id)
  sendResponse<IBook>(res, {
    statusCode: StatusCode.OK,
    success: true,
    message: 'Book get Successfully!',
    data: result,
  })
})

const patchBook = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params
  const { ...updatedData } = req.body
  console.log(updatedData)
  const result = await BookService.patchBookFromDB(id, updatedData)
  sendResponse<IBook>(res, {
    statusCode: StatusCode.OK,
    success: true,
    message: 'Book update Successfully!',
    data: result,
  })
})

const deleteBook = catchAsync(async (req: Request, res: Response) => {
  const result = await BookService.deleteBookFromDB(req.params.id)
  sendResponse<IBook>(res, {
    statusCode: StatusCode.OK,
    success: true,
    message: 'Book delete Successfully!',
    data: result,
  })
})

const addBookComment = catchAsync(async (req: Request, res: Response) => {
  const { ...commentData } = req.body
  console.log(commentData)
  await BookService.addBookCommentFromDB(commentData)
  sendResponse(res, {
    statusCode: StatusCode.OK,
    success: true,
    message: 'Comment Add Successfully!',
  })
})

export const BookController = {
  createBook,
  getBooks,
  getSingleBook,
  patchBook,
  deleteBook,
  addBookComment,
}
