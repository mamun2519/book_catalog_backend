/* eslint-disable @typescript-eslint/no-this-alias */
import { model, Schema } from 'mongoose'
import { AuthModel, IAuth } from './auth.interface'
import bcrypt from 'bcrypt'

const authSchema = new Schema<IAuth, AuthModel>(
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
// authSchema.pre('save', async function (next) {
//   const user = this
//   user.password = await bcrypt.hash(user.password, Number(config.saltRounds))
//   next()
// })
authSchema.statics.isPasswordMatch = async function (
  givenPassword: string,
  savedPassword: string,
): Promise<boolean> {
  return await bcrypt.compare(givenPassword, savedPassword)
}

export const Auth = model<IAuth, AuthModel>('Auth', authSchema)
