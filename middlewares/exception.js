const { HttpException } = require('../core/http-exception')

// 统一处理异常中间件
const catchError = async (ctx, next) => {
  try {
    await next()
  } catch (error) {
    if (global.config.environment === 'dev') {
      throw error
    }
    if (error instanceof HttpException) {
      ctx.body = {
        msg: error.msg,
        error_code: error.errorCode,
        request: `${ctx.method} ${ctx.path}`,
      }
      ctx.status = error.code
    } else {
      ctx.body = {
        msg: '抱歉，未知的错误',
        error_code: 999,
        request: `${ctx.method} ${ctx.path}`,
      }
      ctx.status = 500
    }
  }
}

module.exports = catchError
