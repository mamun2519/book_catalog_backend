import { Types } from 'mongoose'
import { IAuth } from '../Auth/auth.interface'
import { IBook } from './book.interface'

export type IComment = {
  userId: Types.ObjectId | IAuth
  bookId: Types.ObjectId | IBook
  comment: string
}
