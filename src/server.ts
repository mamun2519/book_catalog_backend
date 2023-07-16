import mongoose from 'mongoose'
import express from 'express'
import app from './app'
import config from './config'

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
