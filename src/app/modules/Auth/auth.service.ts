import { StatusCodes } from 'http-status-codes'
import API_Error from '../../../errors/apiError'
import { IAuth, IAuthResponse, ILoginUser } from './auth.interface'
import { Auth } from './auth.model'
import { jwtHelper } from '../../../helper/jwtHelper'
import config from '../../../config'
import { Secret } from 'jsonwebtoken'

const singUpUserFromDB = async (payload: IAuth): Promise<IAuthResponse> => {
  const existUser = await Auth.findOne({ email: payload.email })
  if (existUser) {
    throw new API_Error(StatusCodes.OK, 'User Already exist')
  }

  const createUser = await Auth.create(payload)

  // create token
  const data = {
    role: createUser.role,
    userId: createUser._id,
  }
  const accessToken = jwtHelper.createToken(
    data,
    config.jwt.secretToken as Secret,
    config.jwt.expireIn as string,
  )

  const refreshToken = jwtHelper.createToken(
    data,
    config.jwt.refreshToken as Secret,
    config.jwt.refreshExpireIn as string,
  )

  return {
    userId: createUser._id,
    accessToken,
    refreshToken,
  }
}
const singInUserFromDB = async (
  payload: ILoginUser,
): Promise<IAuthResponse> => {
  const { email, password } = payload
  const isUserExist = await Auth.findOne({ email })
  if (!isUserExist) {
    throw new API_Error(StatusCodes.NOT_FOUND, 'User does not exist')
  }

  // match password
  const isPasswordMatch = await Auth.isPasswordMatch(
    password,
    isUserExist.password,
  )
  if (!isPasswordMatch) {
    throw new API_Error(StatusCodes.UNAUTHORIZED, 'Password is incorrect')
  }

  // create token
  const data = {
    role: isUserExist.role,
    userId: isUserExist._id,
  }
  const accessToken = jwtHelper.createToken(
    data,
    config.jwt.secretToken as Secret,
    config.jwt.expireIn as string,
  )

  return {
    userId: isUserExist._id,
    accessToken,
  }
}

export const AuthService = {
  singUpUserFromDB,
  singInUserFromDB,
}
