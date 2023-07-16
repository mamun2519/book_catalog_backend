import { Request, Response } from 'express'
import catchAsync from '../../../helper/catchAsync'
import { AuthService } from './auth.service'
import sendResponse from '../../../helper/sendResponse'
import { IAuthResponse } from './auth.interface'
import config from '../../../config'

const singUpUser = catchAsync(async (req: Request, res: Response) => {
  const { ...singUpData } = req.body
  const result = await AuthService.singUpUserFromDB(singUpData)
  const { refreshToken, ...others } = result
  // set refresh token into cookie
  const cookieOptions = {
    secure: config.env === 'production',
    httpOnly: true,
  }
  res.cookie('refreshToken', refreshToken, cookieOptions)
  sendResponse<IAuthResponse>(res, {
    statusCode: 200,
    success: true,
    message: 'User singUp successfully',
    data: others,
  })
})

const singInUser = catchAsync(async (req: Request, res: Response) => {
  const { ...loginData } = req.body
  const result = await AuthService.singInUserFromDB(loginData)
  sendResponse<IAuthResponse>(res, {
    statusCode: 200,
    success: true,
    message: 'User signIn successfully',
    data: result,
  })
})

const resetPassword = catchAsync(async (req: Request, res: Response) => {
  const { ...userData } = req.body
  await AuthService.resetPasswordFromDB(userData)
  sendResponse<IAuthResponse>(res, {
    statusCode: 200,
    success: true,
    message: 'Password Reset Successfully',
  })
})
const forgetPassword = catchAsync(async (req: Request, res: Response) => {
  const { ...userData } = req.body
  await AuthService.forgetPasswordFromDB(userData)
  sendResponse<IAuthResponse>(res, {
    statusCode: 200,
    success: true,
    message: 'Password forget Successfully',
  })
})

export const AuthController = {
  singUpUser,
  singInUser,
  resetPassword,
  forgetPassword,
}
