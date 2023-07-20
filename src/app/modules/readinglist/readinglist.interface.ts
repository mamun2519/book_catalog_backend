import { Model, Types } from 'mongoose'
import { IBook } from '../Book/book.interface'
import { IAuth } from '../Auth/auth.interface'

export type IReadingList = {
  book: Types.ObjectId | IBook
  user: Types.ObjectId | IAuth
  reading: boolean
  complete: boolean
  readSoon: boolean
}

export type ReadingModel = Model<IReadingList, Record<string, unknown>>
