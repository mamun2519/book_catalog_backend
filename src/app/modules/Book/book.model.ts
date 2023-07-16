import { Schema, model } from 'mongoose'
import { BookModel, IBook } from './book.interface'

const bookSchema = new Schema<IBook>({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  author: {
    type: String,
    required: true,
    trim: true,
  },
  genre: {
    type: String,
    required: true,
  },
  publicationDate: {
    type: String,
    required: true,
  },
  reviews: {
    type: [],
  },
})

export const Book = model<IBook, BookModel>('Book', bookSchema)
