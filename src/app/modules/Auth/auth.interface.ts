import { Model, Types } from 'mongoose'

export type IAuth = {
  name: string
  email: string
  password: string
  role?: string
  picture: {
    public_id: string
    url: string
  }
}

export type IAuthResponse = {
  userId: Types.ObjectId
  accessToken: string
  refreshToken?: string
}

export type ILoginUser = {
  email: string
  password: string
}

export type IResetPassword = {
  email: string
  oldPassword: string
  newPassword: string
}

export type IForgetPassword = {
  email: string
  newPassword: string
}

export type AuthModel = {
  isPasswordMatch(
    givenPassword: string,
    savedPassword: string,
  ): Promise<boolean>
} & Model<IAuth>
