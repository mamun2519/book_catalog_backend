import { Request, Response } from 'express'
import catchAsync from '../../../helper/catchAsync'
import sendResponse from '../../../helper/sendResponse'
import { IWishList } from './wishlist.interface'
import { StatusCodes } from 'http-status-codes'
import { WishlistService } from './wishlist.service'
import { IBook } from '../Book/book.interface'

const createWishlist = catchAsync(async (req: Request, res: Response) => {
  const { ...wishlist } = req.body
  const result = await WishlistService.createWishListFromDB(wishlist)
  sendResponse<IWishList | IBook>(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Wishlist Add Successfully!',
    data: result,
  })
})

const getAllWishlist = catchAsync(async (req: Request, res: Response) => {
  const token = req.headers.authorization
  const result = await WishlistService.getAllWishlistFromDb(
    token as string | null,
  )
  console.log(result)
  sendResponse<IWishList[] | IBook[]>(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Wishlist get Successfully!',
    data: result,
  })
})

const deleteWishlist = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params
  const result = await WishlistService.deleteWishListFromDB(id)
  sendResponse<IWishList>(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Wishlist get Successfully!',
    data: result,
  })
})

export const WishListController = {
  createWishlist,
  getAllWishlist,
  deleteWishlist,
}
