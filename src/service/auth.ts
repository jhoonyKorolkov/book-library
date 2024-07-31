import bcrypt from 'bcrypt'
import User from '../models/auth'

const registerUser = async (username: string, password: string) => {
  const hashedPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10))
  const newUser = new User({ username, password: hashedPassword })
  await newUser.save()
}

const findUserByUsername = async (username: string) => {
  return await User.findOne({ username })
}

export { registerUser, findUserByUsername }
