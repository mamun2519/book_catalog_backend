import { IBook } from '../Book/book.interface'
import { IWishList } from './wishlist.interface'
import { WishList } from './wishlist.model'

const createWishListFromDB = async (
  payload: IWishList,
): Promise<IWishList | IBook> => {
  const list = await WishList.create(payload)
  return list
}

const getAllWishlistFromDb = async (
  id: string,
): Promise<IWishList[] | IBook[] | null> => {
  console.log(id)
  const data = await WishList.find({ user: id }).populate('book')

  console.log(data)
  return data
}

const deleteWishListFromDB = async (id: string): Promise<IWishList | null> => {
  return await WishList.findByIdAndDelete(id, { new: true })
}

export const WishlistService = {
  createWishListFromDB,
  getAllWishlistFromDb,
  deleteWishListFromDB,
}
