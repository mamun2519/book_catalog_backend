import { Schema, Types, model } from 'mongoose'
import { BookModel, IBook } from './book.interface'

const bookSchema = new Schema<IBook>(
  {
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
    picture: {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },

    reviews: {
      type: [
        {
          user: {
            type: Types.ObjectId,
            ref: 'User',
          },
          comment: {
            type: String,
          },
        },
      ],
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  },
)

export const Book = model<IBook, BookModel>('Book', bookSchema)
