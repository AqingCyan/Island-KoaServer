/**
 * token管理接口
 */

const Router = require("koa-router")
const { TokenValidator } = require("../../validators/validator")
const { LoginType } = require("../../lib/enum")
const { User } = require("../../model/user")
const { generateToken } = require("../../../core/util")
const router = new Router({
  prefix: "/v1/token"
})

router.post("/", async ctx => {
  const v = await new TokenValidator().validate(ctx)
  let token
  // 根据不同的type（不同的登录方式），处理登录验证
  switch (v.get("body.type")) {
    case LoginType.USER_EMAIL:
      token = await emailLogin(v.get("body.account"), v.get("body.secret"))
      break
    case LoginType.USER_MINI_PROGRAM:
      break
    default:
      throw new global.errs.ParameterException("没有相应的处理函数")
  }
  ctx.body = {
    token
  }
})

/**
 * 处理邮箱登录类型的业务
 * @param {string} account email
 * @param {string} secret 密码
 */
async function emailLogin(account, secret) {
  // 根据用户传入的账号比对数据库
  const user = await User.verifyEmailPassword(account, secret)
  return generateToken(user.id, 2)
}

module.exports = router
