/**
 * 响应体类的定义
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

/**
 * 响应成功类
 */
class Success extends HttpException {
  constructor(msg, errorCode) {
    super()
    this.code = 201
    this.msg = msg || 'ok'
    this.errorCode = errorCode || 0
  }
}

/**
 * 未查询到资源异常响应类
 */
class NotFound extends HttpException {
  constructor(msg, error_code) {
    super()
    this.message = msg || '资源未找到'
    this.error_code = error_code || 10000
    this.code = 404
  }
}

class AuthFalied extends HttpException {
  constructor(msg, error_code) {
    this.msg = msg || '授权失败'
    this.error_code = error_code
    this.code = 401
  }
}

module.exports = { HttpException, ParameterException, Success, NotFound, AuthFalied }