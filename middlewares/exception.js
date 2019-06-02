/**
 * 全局异常处理中间件
 * @param{object} ctx 全局上下文
 * @param{object} next 洋葱模型中的下一层中间件调用
 */

const { HttpException } = require('../core/http-exception')

const catchError = async (ctx, next) => {
  try {
    await next()
  } catch (error) {
    const isHttpException = error instanceof HttpException
    const isDev = global.config.enviroment === 'dev'
    // 判断开发环境，在开发环境，服务器错误使命令行进程进行错误抛出
    if (isDev && !isHttpException) {
      throw error
    }
    // if 判断异常是否是在HttpException中定义好异常信息的已知异常
    if (isHttpException) {
      ctx.body = {
        msg: error.msg,
        error_code: error.errorCode,
        request: `${ctx.method} ${ctx.path}`
      }
      ctx.status = error.code
    } else {
      // 若为异常（通常是原生Error）
      ctx.body = {
        msg: 'we made a mistake',
        error_code: 999,
        request: `${ctx.method} ${ctx.path}`
      }
      ctx.status = 500
    }
  }
}

module.exports = catchError