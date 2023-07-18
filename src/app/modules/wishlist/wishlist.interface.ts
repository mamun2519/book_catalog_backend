import { Model, Types } from 'mongoose'
import { IBook } from '../Book/book.interface'

export type IWishList = {
  book: Types.ObjectId | IBook
}

export type WishModal = Model<IBook, Record<string, unknown>>
