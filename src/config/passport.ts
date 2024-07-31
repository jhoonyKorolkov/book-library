import passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local'
import User from '../models/auth'

const verify = async (
  userLogin: string,
  userPassword: string,
  done: Function
) => {
  try {
    const user = await User.findOne({ userLogin, userPassword }).exec()
    if (!user) {
      return done(null, false)
    }
    if (user) {
      return done(null, user)
    }
  } catch (error) {
    return done(error, false)
  }
}

const options = {
  usernameField: 'userLogin',
  passwordField: 'userPassword'
}

passport.use('local', new LocalStrategy(options, verify))

passport.serializeUser((user, cb) => {
  if ('_id' in user && user._id) {
    cb(null, user._id.toString())
  }
})

passport.deserializeUser(async (id, cb) => {
  const user = await User.findById(id).exec()
  console.log('deserializeUser', user)
  if (!user) {
    cb({ error: 'Такой пользователь не найден' })
  } else {
    cb(null, user)
  }
})

export default passport
