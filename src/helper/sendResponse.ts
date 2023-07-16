import { Response } from 'express'
type API_IResponse<T> = {
  statusCode: number
  success: boolean
  message?: string | null
  meta?: {
    page?: number
    limit?: number
    total?: number
  }

  data?: T | null
}

const sendResponse = <T>(res: Response, data: API_IResponse<T>): void => {
  const responseData: API_IResponse<T> = {
    statusCode: data.statusCode,
    success: data.success,
    message: data.message || null,
    meta: data.meta || null || undefined,
    data: data.data || null,
  }
  res.status(data.statusCode).json(responseData)
}

export default sendResponse
