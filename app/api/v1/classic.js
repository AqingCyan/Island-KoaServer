const Router = require('koa-router')
const { Flow } = require('../../model/flow')
const { Auth } = require('../../../middlewares/auth')
const { PositiveIntegerValidator } = require('../../validators/validator')

const router = new Router({
  prefix: '/v1/classic',
})

// 获取最新期刊
router.get('/latest', new Auth().m, async ctx => {
  ctx.body = await Flow.getPreOrNextData(ctx)
})

// 获取上一期期刊
router.get('/:index/previous', new Auth().m, async ctx => {
  const v = await new PositiveIntegerValidator().validate(ctx, { id: 'index' })
  const index = v.get('path.index')
  ctx.body = await Flow.getPreOrNextData(ctx, 'pre', index)
})

// 获取下一期刊
router.get('/:index/next', new Auth().m, async ctx => {
  const v = await new PositiveIntegerValidator().validate(ctx, { id: 'index' })
  const index = v.get('path.index')
  ctx.body = await Flow.getPreOrNextData(ctx, 'next', index)
})

module.exports = router
