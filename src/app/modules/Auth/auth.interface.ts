import { Model, Types } from 'mongoose'

export type IAuth = {
  name: string
  email: string
  password: string
  role?: string
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

export type AuthModel = Model<IAuth, Record<string, unknown>>
