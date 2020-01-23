const Router = require('koa-router')
const { TokenValidator, NotEmptyValidator } = require('../../validators/validator')
const { LoginType } = require('../../lib/enum')
const { User } = require('../../model/user')
const { generateToken } = require('../../../core/util')
const { Auth } = require('../../../middlewares/auth')
const { WXManger } = require('../../services/wx')

const router = new Router({
  prefix: '/v1/token',
})

/**
 * 邮箱登录：普通用户登录scope为8
 */
async function emailLogin(account, secret) {
  const user = await User.verifyEmailPassword(account, secret)
  return generateToken(user.id, Auth.USER)
}

router.post('/', async ctx => {
  const v = await new TokenValidator().validate(ctx)
  let token
  // 根据不同登录方式做处理
  switch (v.get('body.type')) {
    case LoginType.USER_EMAIL:
      token = await emailLogin(v.get('body.account'), v.get('body.secret'))
      break
    case LoginType.USER_MINI_PROGRAM:
      token = await WXManger.codeToToken(v.get('body.account'))
      break
    case LoginType.ADMIN_EMAIL:
      break
    default:
      throw new global.errs.ParameterException('没有相应的处理函数')
  }
  ctx.body = {
    token,
  }
})

router.post('/verify', async ctx => {
  const v = await new NotEmptyValidator().validate(ctx)
  const result = Auth.verifyToken(v.get('body.token'))
  ctx.body = {
    is_valide: result,
  }
})

module.exports = router
