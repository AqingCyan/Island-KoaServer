/**
 * 用户API路由管理
 */

const Router = require('koa-router')
const { RegisterValidator } = require('../../validators/validator')
const router = new Router({
  prefix: '/v1/user'
})

/**
 * 注册用户
 */
router.post('/register', async (ctx) => {
  const v = new RegisterValidator().validate(ctx)
})

module.exports = router