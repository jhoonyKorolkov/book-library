import { Schema, model } from 'mongoose'

const UserSchema = new Schema({
  username: {
    type: String,
    require: true
  },
  password: {
    type: String,
    require: true
  }
})

const User = model('User', UserSchema)

export default User
