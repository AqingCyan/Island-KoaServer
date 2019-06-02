/**
 * classic下的路由管理
 */

const Router = require('koa-router')
const router = new Router()
const { PositiveIntegerValidator } = require('../../validators/validator')

// 若想在url中间传参，就可以使用:id的形式
router.post('/v1/:id/classic/latest', async (ctx, next) => {
  const path = ctx.params
  const query = ctx.request.query
  const header = ctx.request.header
  const body = ctx.request.body

  // 使用定义的参数校验器校验参数
  const v = await new PositiveIntegerValidator().validate(ctx)
  // 获取http参数，parsed为false不进行类型的转换
  const id = v.get('path.id', parsed = false)
  ctx.body = `success, param's id is ${id}`
})

module.exports = router