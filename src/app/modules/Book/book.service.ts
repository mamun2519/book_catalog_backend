import API_Error from '../../../errors/apiError'
import { IBook, IBookFilters } from './book.interface'
import { Book } from './book.model'
import StatusCode, { StatusCodes } from 'http-status-codes'
// import cloudinary from 'cloudinary'
import { IComment, bookSearchableFields } from './book.constant'
import { Auth } from '../Auth/auth.model'

const createBookFromDB = async (payload: IBook): Promise<IBook> => {
  const {
    picture,
    title,
    author,
    publicationDate,
    genre,
    reviews,
    userId,
    year,
  } = payload
  return await Book.create({
    title,
    author,
    publicationDate,
    genre,
    reviews,
    userId,
    year,
    picture: {
      url: picture,
    },
  })
}

const getAllBooksFromDB = async (filters: IBookFilters): Promise<IBook[]> => {
  const { searchTerm, ...filtersData } = filters

  const conditions = []
  if (searchTerm) {
    conditions.push({
      $or: bookSearchableFields.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    })
  }

  if (Object.keys(filtersData).length) {
    conditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    })
  }

  const whereConditions = conditions.length > 0 ? { $and: conditions } : {}

  const books = await Book.find(whereConditions)

  if (!books) {
    throw new API_Error(404, 'Failed to get books')
  }

  return books
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
  const { title, author, publicationDate, genre } = payload

  const book = await Book.findByIdAndUpdate(
    id,
    {
      title,
      author,
      publicationDate,
      genre,
    },
    { new: true },
  )

  if (!book) {
    throw new API_Error(StatusCode.NOT_FOUND, 'Book not found')
  }
  return book
}

const deleteBookFromDB = async (id: string): Promise<IBook | null> => {
  return await Book.findByIdAndDelete(id, { new: true })
}

const addBookCommentFromDB = async (payload: IComment) => {
  const book = await Book.findById(payload.bookId)
  const user = await Auth.findById(payload.user)
  console.log(user)
  console.log(user)
  console.log(book)
  if (!book) {
    throw new API_Error(StatusCodes.NOT_FOUND, 'Not Found')
  }
  book.reviews?.push({
    user: {
      name: user?.name as string,
      email: user?.email as string,
      avatar: user?.picture.url as string,
    },
    comment: payload.comment,
  })
  await book.save({ validateBeforeSave: false })
}

export const BookService = {
  createBookFromDB,
  getAllBooksFromDB,
  getBookDetailsFromDB,
  patchBookFromDB,
  deleteBookFromDB,
  addBookCommentFromDB,
}
