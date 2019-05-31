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
    // 程序中捕获到Error不应该返回到客户端，应该简化成清晰明了的信息
    if (error instanceof HttpException) {
      ctx.body = {
        msg: error.msg,
        error_code: error.errorCode,
        request: `${ctx.method} ${ctx.path}`
      }
      ctx.status = error.code
    }
  }
}

module.exports = catchError