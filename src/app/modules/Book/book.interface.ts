import { Model, Types } from 'mongoose'
import { IAuth } from '../Auth/auth.interface'

export type IBook = {
  _id: string
  title: string
  author: string
  genre: string
  picture: {
    public_id: string
    url: string
  }
  publicationDate: string
  reviews?: [
    {
      user: Types.ObjectId | IAuth
      comment: string
    },
  ]
}

// crate custom method
export type BookModel = Model<IBook, Record<string, unknown>>
