import API_Error from '../../../errors/apiError'
import { IBook } from './book.interface'
import { Book } from './book.model'
import StatusCode from 'http-status-codes'
import cloudinary from 'cloudinary'
const createBookFromDB = async (payload: IBook): Promise<IBook> => {
  const { picture, title, author, publicationDate, genre, reviews } = payload
  const myCloud = await cloudinary.v2.uploader.upload(picture.url, {
    folder: 'products',
    width: 150,
    crop: 'scale',
  })
  return await Book.create({
    title,
    author,
    publicationDate,
    genre,
    reviews,
    picture: {
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
    },
  })
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