import { Secret } from 'jsonwebtoken'
import config from '../../../config'
import { jwtHelper } from '../../../helper/jwtHelper'
import { IBook } from '../Book/book.interface'
import { IReadingList } from './readinglist.interface'
import { ReadingList } from './reading.model'

const createReadingFromDB = async (
  payload: IReadingList,
): Promise<IReadingList | IBook> => {
  const list = await ReadingList.create(payload)
  return list
}

const getAllReadingFromDb = async (
  token: string | null,
): Promise<IReadingList[] | IBook[] | null | undefined> => {
  try {
    const tokens = jwtHelper.verifyToken(
      token as string,
      config.jwt.secretToken as Secret,
    )

    const data = await ReadingList.find({ user: tokens?.userId }).populate(
      'book',
    )

    return data
  } catch (er) {
    console.log(er)
  }
}

const deleteReadingFromDB = async (
  id: string,
): Promise<IReadingList | null> => {
  return await ReadingList.findByIdAndDelete(id, { new: true })
}
const patchReadingFromDB = async (
  id: string,
  payload: IReadingList,
): Promise<IReadingList | null> => {
  const result = await ReadingList.findByIdAndUpdate(id, payload, { new: true })
  return result
}
export const ReadingService = {
  createReadingFromDB,
  getAllReadingFromDb,
  deleteReadingFromDB,
  patchReadingFromDB,
}
