import jwt, { Secret } from 'jsonwebtoken'

const createToken = (
  payload: Record<string, unknown>,
  secret: Secret,
  expireIn: string,
): string => {
  return jwt.sign(payload, secret, { expiresIn: expireIn })
}

export const jwtHelper = {
  createToken,
}
