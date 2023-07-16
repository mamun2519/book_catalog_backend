import { Model } from 'mongoose'

export type IBook = {
  title: string
  author: string
  genre: string
  publicationDate: string
  reviews: []
}

// crate custom method
export type BookModel = Model<IBook, Record<string, unknown>>
