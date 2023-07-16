import dotenv from 'dotenv'
import path from 'path'
dotenv.config({ path: path.join(process.cwd(), '.env') })

export default {
  env: process.env.NODE_ENV,
  port: process.env.PORT,
  db_uri: process.env.DATABASE_URI,
  saltRounds: process.env.SALT_ROUNDS,
  jwt: {
    secretToken: process.env.SECRET_TOKEN,
    expireIn: process.env.EXPIRE_IN,
    refreshToken: process.env.REFRESH_TOKEN,
    refreshExpireIn: process.env.REFRESH_EXPIRE_IN,
  },
}
