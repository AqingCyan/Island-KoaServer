const Router = require('koa-router')
const { PositiveIntegerValidator } = require('../../validators/validator')

const router = new Router()

router.post('/v1/:id/classic/latest', async (ctx, next) => {
  const path = ctx.params
  const query = ctx.request.query
  const header = ctx.request.header
  const body = ctx.request.body

  const v = await new PositiveIntegerValidator().validate(ctx)
  const id = v.get('path.id', parsed = false)

  ctx.body = {
    key: 'classic'
  }
})

module.exports = router
