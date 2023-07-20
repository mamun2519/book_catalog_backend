import { Secret } from 'jsonwebtoken'
import config from '../../../config'
import { jwtHelper } from '../../../helper/jwtHelper'
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
  token: string | null,
): Promise<IWishList[] | IBook[] | null | undefined> => {
  try {
    const tokens = jwtHelper.verifyToken(
      token as string,
      config.jwt.secretToken as Secret,
    )

    const data = await WishList.find({ user: tokens?.userId }).populate('book')
    console.log(data)
    return data
  } catch (er) {
    console.log(er)
  }
}

const deleteWishListFromDB = async (id: string): Promise<IWishList | null> => {
  return await WishList.findByIdAndDelete(id, { new: true })
}

export const WishlistService = {
  createWishListFromDB,
  getAllWishlistFromDb,
  deleteWishListFromDB,
}
