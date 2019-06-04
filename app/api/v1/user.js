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
  // 密码加密，用盐来加密（10是计算机生成盐的时候花费的成本）
  const salt = bcrpty.genSaltSync(10)
  const psw = bcrpty.hashSync(v.get('body.password2'), salt)
  const user = {
    email: v.get('body.email'),
    password: psw,
    nickname: v.get('body.nickname')
  }
  const r = await User.create(user)

})

module.exports = router