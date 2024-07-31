import mongoose from 'mongoose'
import { MONGO_URI } from './config/config.js'

const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI)
    console.log('MongoDB connected successfully')
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error connecting to MongoDB:', error.message)
    } else {
      console.error('Unexpected error:', error)
    }
  }
}

export default connectDB
