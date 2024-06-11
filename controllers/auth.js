import { registerUser, findUserByUsername } from '../service/auth.js'
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
  } catch (error) {
    next(error)
  }
}

const getProfile = async (req, res, next) => {
  const { user } = req
  try {
    if (req.isAuthenticated()) {
      res.render('profile/user', { user })
    } else {
      res.redirect('/user/login')
    }
  } catch (error) {
    next(error)
  }
}

const userLogout = (req, res, next) => {
  try {
    req.logout(function (err) {
      if (err) {
        console.error(err)
        return req.flash('error_msg', 'Ошибка')
      }
      res.redirect('/')
    })
  } catch (error) {
    next(error)
  }
}

const userSignIn = async (req, res, next) => {
  try {
    passport.authenticate('local', (err, user, info) => {
      if (err) {
        return next(err)
      }
      if (!user) {
        req.flash('error_msg', info.message)
        return res.redirect('/user/login')
      }
      req.logIn(user, err => {
        if (err) {
          return next(err)
        }
        req.flash('success_msg', 'Успешно авторезированы')
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

    if (!username || username.length < 3) {
      req.flash(
        'error_msg',
        'Имя пользователя должно содержать не менее 3 символов'
      )
      return res.redirect('/user/signup')
    }
    if (!password || password.length < 5) {
      req.flash('error_msg', 'Пароль должен содержать не менее 5 символов')
      return res.redirect('/user/signup')
    }

    const existingUser = await findUserByUsername(username)
    if (existingUser) {
      req.flash('error_msg', 'Имя пользователя уже занято')
      return res.redirect('/user/signup')
    }

    await registerUser(username, password)
    req.flash('success_msg', 'Регистрация успешна!')
    res.redirect('/user/login')
  } catch (error) {
    if (error.code === 11000) {
      req.flash('error_msg', 'Имя пользователя уже занято')
      return res.redirect('/user/signup')
    }
    next(error)
  }
}

export { getLogin, getSignUp, userSignIn, userSignUp, getProfile, userLogout }
