const basicAuth = require('basic-auth')
const jwt = require('jsonwebtoken')

class Auth {
  constructor(level) {
    // 权限控制
    this.level = level || 1
    Auth.USER = 8
    Auth.ADMIN = 16
    Auth.SUPER_ADMIN = 32
  }

  get m() {
    return async (ctx, next) => {
      // token进行检测
      const userToken = basicAuth(ctx.req)
      let errMsg = 'token不合法'
      let decode
      if (!userToken || !userToken.name) {
        throw new global.errs.Forbidden(errMsg)
      }
      try {
        decode = jwt.verify(userToken.name, global.config.security.secretKey)
      } catch (error) {
        if (error.name === 'TokenExpiredError') {
          errMsg = 'token令牌过期'
        }
        throw new global.errs.Forbidden(errMsg)
      }

      if (decode.scope < this.level) {
        errMsg = '权限不足'
        throw new global.errs.Forbidden(errMsg)
      }

      ctx.auth = {
        uid: decode.uid,
        scope: decode.scope,
      }
      await next()
    }
  }

  static verifyToken(token) {
    try {
      jwt.verify(token, global.config.security.secretKey)
      return true
    } catch (error) {
      return false
    }
  }
}

module.exports = {
  Auth,
}
