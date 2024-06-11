import { Schema, model } from 'mongoose'
import bcrypt from 'bcrypt'

const UserSchema = new Schema({
  username: {
    type: String,
    require: true,
    unique: true 
  },
  password: {
    type: String,
    require: true
  },
})

UserSchema.methods.validPassword = function (password) {
  return bcrypt.compareSync(password, this.password)
}

const User = model('User', UserSchema)

export default User
