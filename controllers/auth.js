import { registerUser, getUserData } from '../service/auth.js'
import passport from 'passport'

const getLogin = async (req, res, next) => {
  try {
    res.render('auth/login')
  } catch (error) {
    next(error)
  }
}

const getSignUp = async (req, res, next) => {
  try {
    res.render('auth/signup')
  } catch (error) {}
}

const getProfile = async (req, res, next) => {
  if (req.isAuthenticated()) {
    res.render('auth/user', { user: req.user });
  } else {
    res.redirect('/login');
  }
}


сщтые

const userSignIn = async (req, res, next) => {
  try {
    passport.authenticate('local', (err, user, info) => {
      if (err) {
        return next(err)
      }
      if (!user) {
        return res.redirect('/user/login')
      }
      req.logIn(user, err => {
        if (err) {
          return next(err)
        }
        req.flash('success_msg', 'Hello')
        return res.redirect('/user/me')
      })
    })(req, res, next)
  } catch (error) {
    next(error)
  }
}

const userSignUp = async (req, res, next) => {
  try {
    const { username, password } = req.body
    await registerUser(username, password)
    res.redirect('/')
  } catch (error) {
    next(error)
  }
}

export { getLogin, getSignUp, userSignIn, userSignUp,getProfile }
