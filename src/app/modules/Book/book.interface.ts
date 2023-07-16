import { Model } from 'mongoose'

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
  reviews?: []
}

// crate custom method
export type BookModel = Model<IBook, Record<string, unknown>>
