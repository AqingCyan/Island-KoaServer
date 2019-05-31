/**
 * 异常响应体类
 */

/**
 * Http异常信息基类
 */
class HttpException extends Error {
  constructor(msg = '服务器错误', errorCode = 10000, code = 400) {
    super()
    this.errorCode = errorCode
    this.code = code
    this.msg = msg
  }
}

/**
 * 参数类型错误类
 */
class ParameterException extends HttpException {
  constructor(msg, errorCode) {
    super()
    this.code = 400
    this.msg = msg || '参数错误'
    this.errorCode = errorCode || 10000
  }
}

module.exports = { HttpException, ParameterException }