import passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local'
import User from '../models/auth.js'

passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const user = await User.findOne({ username })
      if (!user) {
        return done(null, false, {
          message: 'Пользователя с таким именем не существует.'
        })
      }
      if (!user.validPassword(password)) {
        return done(null, false, { message: 'Не верный пароль.' })
      }
      return done(null, user)
    } catch (err) {
      return done(err)
    }
  })
)

passport.serializeUser((user, done) => {
  done(null, user.id)
})

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id)
    done(null, user)
  } catch (err) {
    done(err)
  }
})

export default passport
