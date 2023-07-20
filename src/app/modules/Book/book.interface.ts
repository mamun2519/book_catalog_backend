import { Model } from 'mongoose'

export type IBook = {
  userId: string
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
      user: {
        name: string
        email: string
        avatar: string
      }
      comment: string
    },
  ]
}

// crate custom method
export type BookModel = Model<IBook, Record<string, unknown>>
