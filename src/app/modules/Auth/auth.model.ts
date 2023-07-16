/* eslint-disable @typescript-eslint/no-this-alias */
import { model, Schema } from 'mongoose'
import { AuthModel, IAuth } from './auth.interface'
import bcrypt from 'bcrypt'
import config from '../../../config'
const authSchema = new Schema<IAuth>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      minlength: 8,
      required: true,
    },
    role: {
      type: String,
      default: 'User',
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  },
)
authSchema.pre('save', async function (next) {
  const user = this
  user.password = await bcrypt.hash(user.password, Number(config.saltRounds))
  next()
})

export const Auth = model<IAuth, AuthModel>('Auth', authSchema)
