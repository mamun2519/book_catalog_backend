import { Schema, Types, model } from 'mongoose'
import { IWishList, WishModal } from './wishlist.interface'

const wishlistSchema = new Schema<IWishList>(
  {
    book: {
      type: Types.ObjectId,
      ref: 'Book',
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
  },
)

export const WishList = model<IWishList, WishModal>('Wishlist', wishlistSchema)
