import bcrypt from 'bcrypt'
import User from '../models/auth.js'

const registerUser = async (username, password) => {
  const hashedPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10))
  const newUser = new User({ username, password: hashedPassword })
  await newUser.save()
}

const findUserByUsername = async username => {
  return await User.findOne({ username })
}

export { registerUser, findUserByUsername }
