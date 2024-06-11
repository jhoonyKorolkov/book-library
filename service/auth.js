import AppError from '../middlewares/AppError.js'
import books from '../models/books.js'
import path from 'path'
import { unlink } from 'fs/promises'
import { BASE_URL } from '../config.js'

import passport from 'passport'
import { check, validationResult } from 'express-validator'
import bcrypt from 'bcrypt'
import User from '../models/auth.js'
// const getAllBooks = async () => {
//   const books = await Book.find().select('-__v -mimetype -fileName')
//   if (!books) {
//     throw new AppError('Books not found', 404)
//   }
//   return books
// }

const registerUser = async (username, password) => {
  const hashedPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10))
  const newUser = new User({ username, password: hashedPassword })
  await newUser.save()
}

const getUserData = async () => {
  const user = await User.findOne({ username })
  return user
}



export { registerUser, getUserData }
