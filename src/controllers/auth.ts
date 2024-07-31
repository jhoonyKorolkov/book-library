import { Request, Response, NextFunction } from 'express'
import { registerUser, findUserByUsername } from '../service/auth.js'
import passport from 'passport'

const getLogin = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    res.render('auth/login')
  } catch (error) {
    next(error)
  }
}

const getSignUp = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    res.render('auth/signup')
  } catch (error) {
    next(error)
  }
}

const getProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
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

const userLogout = (req: Request, res: Response, next: NextFunction): void => {
  try {
    req.logout(function (err) {
      if (err) {
        console.error(err)
      }
      res.redirect('/')
    })
  } catch (error) {
    next(error)
  }
}

const userSignIn = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    passport.authenticate(
      'local',
      (err: Error, user: Response, info: Response) => {
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
          return res.redirect('/user/me')
        })
      }
    )(req, res, next)
  } catch (error) {
    next(error)
  }
}

const userSignUp = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { username, password } = req.body

    if (!username || username.length < 3) {
      return res.redirect('/user/signup')
    }
    if (!password || password.length < 5) {
      return res.redirect('/user/signup')
    }

    const existingUser = await findUserByUsername(username)
    if (existingUser) {
      return res.redirect('/user/signup')
    }

    await registerUser(username, password)
    res.redirect('/user/login')
  } catch (error: any) {
    if (error.code === 11000) {
      return res.redirect('/user/signup')
    }
    next(error)
  }
}

export { getLogin, getSignUp, userSignIn, userSignUp, getProfile, userLogout }
