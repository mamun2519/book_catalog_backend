import { Schema, Types, model } from 'mongoose'
import { IReadingList, ReadingModel } from './readinglist.interface'

const readingSchema = new Schema<IReadingList>(
  {
    book: {
      type: Types.ObjectId,
      ref: 'Book',
    },
    user: {
      type: Types.ObjectId,
      ref: 'User',
    },
    complete: {
      type: Boolean,
      default: false,
    },
    reading: {
      type: Boolean,
      default: false,
    },
    readSoon: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
  },
)

export const ReadingList = model<IReadingList, ReadingModel>(
  'ReadingList',
  readingSchema,
)
