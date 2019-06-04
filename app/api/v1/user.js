/**
 * 用户API路由管理
 */

const Router = require('koa-router')
const bcrpty = require('bcryptjs')
const { RegisterValidator } = require('../../validators/validator')
const { User } = require('../../model/user')
const router = new Router({
  prefix: '/v1/user'
})

/**
 * 注册用户
 * 注册信息校验 -> 获取注册信息，并保存信息到数据库 -> 响应信息
 */
router.post('/register', async (ctx) => {
  const v = await new RegisterValidator().validate(ctx)
  const user = {
    email: v.get('body.email'),
    password: v.get('body.password2'),
    nickname: v.get('body.nickname')
  }
  const r = await User.create(user)
  // 以抛出异常的形式来响应成功
  throw new global.errs.Success()
})

module.exports = router