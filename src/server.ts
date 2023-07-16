import mongoose from 'mongoose'
import app from './app'
import config from './config'
import { v2 as cloudinary } from 'cloudinary'

// config cloudinary image server
cloudinary.config({
  cloud_name: 'mamun2519',
  api_key: '933866718522549',
  api_secret: 'Oij3EaktvRrr1IhNNJZiSipv__Q',
})

async function Bootstrap() {
  try {
    await mongoose.connect(config.db_uri as string)
    console.log('database connect successfully')
    app.listen(config.port, () => {
      console.log('Server Run successfully')
    })
  } catch (error) {
    console.log(error)
  }
}
Bootstrap()
