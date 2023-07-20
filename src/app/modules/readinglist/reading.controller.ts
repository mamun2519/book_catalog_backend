import { Request, Response } from 'express'
import catchAsync from '../../../helper/catchAsync'
import sendResponse from '../../../helper/sendResponse'

import { StatusCodes } from 'http-status-codes'

import { IBook } from '../Book/book.interface'
import { IReadingList } from './readinglist.interface'
import { ReadingService } from './reading.service'

const createReading = catchAsync(async (req: Request, res: Response) => {
  const { ...Reading } = req.body
  const result = await ReadingService.createReadingFromDB(Reading)
  sendResponse<IReadingList | IBook>(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Reading Add Successfully!',
    data: result,
  })
})

const getAllReading = catchAsync(async (req: Request, res: Response) => {
  const token = req.headers.authorization
  const result = await ReadingService.getAllReadingFromDb(
    token as string | null,
  )
  console.log(result)
  sendResponse<IReadingList[] | IBook[]>(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Reading get Successfully!',
    data: result,
  })
})

const deleteReading = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params
  const result = await ReadingService.deleteReadingFromDB(id)
  sendResponse<IReadingList>(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Reading get Successfully!',
    data: result,
  })
})

const patchReading = catchAsync(async (req: Request, res: Response) => {
  const { ...updateData } = req.body
  console.log(updateData)
  const { id } = req.params
  const result = await ReadingService.patchReadingFromDB(id, updateData)
  sendResponse<IReadingList>(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Reading update Successfully!',
    data: result,
  })
})

export const ReadingController = {
  createReading,
  getAllReading,
  deleteReading,
  patchReading,
}
