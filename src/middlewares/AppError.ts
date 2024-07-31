/**
 * @param {string} message - error message
 * @param {number} statusCode - http status code
 */
class AppError extends Error {
  public statusCode: number
  public errorType: string
  public isOperational: boolean

  constructor(message: string, statusCode: number) {
    super(message)
    this.statusCode = statusCode
    this.errorType = `${statusCode}`.startsWith('4') ? 'fail' : 'error'
    this.isOperational = true

    Error.captureStackTrace(this, this.constructor)
  }
}

export default AppError
