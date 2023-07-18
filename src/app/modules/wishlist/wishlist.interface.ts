import { Model, Types } from 'mongoose'
import { IBook } from '../Book/book.interface'
import { IAuth } from '../Auth/auth.interface'

export type IWishList = {
  book: Types.ObjectId | IBook
  user: Types.ObjectId | IAuth
}

export type WishModal = Model<IBook, Record<string, unknown>>
