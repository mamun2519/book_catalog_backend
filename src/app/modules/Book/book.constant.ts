import { Types } from 'mongoose'
import { IAuth } from '../Auth/auth.interface'
import { IBook } from './book.interface'

export type IComment = {
  user: Types.ObjectId | IAuth
  bookId: Types.ObjectId | IBook
  comment: string
}

export const bookSearchableFields = ['title', 'author', 'genre']

export const bookFilterableFields = ['searchTerm', 'genre', 'year']
