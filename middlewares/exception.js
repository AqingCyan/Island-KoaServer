const { HttpException } = require('../core/http-exception')

// 统一处理异常中间件
const catchError = async (ctx, next) => {
  try {
    await next()
  } catch (error) {
    // 不是 HttpException 的情况下且在开发环境，错误抛出
    const isHttpException = error instanceof HttpException
    const isDev = global.config.environment === 'dev'
    if (isDev && !isHttpException) {
      throw error
    }
    if (isHttpException) {
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
