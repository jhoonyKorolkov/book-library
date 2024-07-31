import { Schema, model } from 'mongoose'
import bcrypt from 'bcrypt'
import UserInterface from '../interfaces/UserInterface'

const UserSchema = new Schema<UserInterface>({
  username: {
    type: String,
    require: true,
    unique: true
  },
  password: {
    type: String,
    require: true
  }
})

UserSchema.methods.validPassword = function (password: string) {
  return bcrypt.compareSync(password, this.password)
}

const User = model<UserInterface>('User', UserSchema)

export default User
