import { Document } from 'mongoose'

interface UserInterface extends Document {
  username: string
  password: string
  validPassword(password: string): boolean
  id: string
}

export default UserInterface
