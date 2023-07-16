import { Request, Response } from 'express'
import catchAsync from '../../../helper/catchAsync'
import { AuthService } from './auth.service'
import sendResponse from '../../../helper/sendResponse'
import { IAuthResponse } from './auth.interface'

const singUpUser = catchAsync(async (req: Request, res: Response) => {
  const { ...singUpData } = req.body
  const result = await AuthService.singUpUserFromDB(singUpData)
  //   const {refreshToken, ...others} = result
  sendResponse<IAuthResponse>(res, {
    statusCode: 200,
    success: true,
    message: 'User singUp successfully',
    data: result,
  })
})

export const AuthController = {
  singUpUser,
}
