import API_Error from '../../../errors/apiError'
import { IBook } from './book.interface'
import { Book } from './book.model'
import StatusCode from 'http-status-codes'
const createBookFromDB = async (payload: IBook): Promise<IBook> => {
  return await Book.create(payload)
}

const getAllBooksFromDB = async (): Promise<IBook[]> => {
  return await Book.find({})
}

const getBookDetailsFromDB = async (id: string): Promise<IBook | null> => {
  const book = await Book.findById(id)
  if (!book) {
    throw new API_Error(StatusCode.NOT_FOUND, 'Book not found')
  }
  return book
}

const patchBookFromDB = async (
  id: string,
  payload: IBook,
): Promise<IBook | null> => {
  const book = await Book.findByIdAndUpdate(id, payload, { new: true })
  if (!book) {
    throw new API_Error(StatusCode.NOT_FOUND, 'Book not found')
  }
  return book
}

const deleteBookFromDB = async (id: string): Promise<IBook | null> => {
  return await Book.findByIdAndDelete(id, { new: true })
}

export const BookService = {
  createBookFromDB,
  getAllBooksFromDB,
  getBookDetailsFromDB,
  patchBookFromDB,
  deleteBookFromDB,
}
