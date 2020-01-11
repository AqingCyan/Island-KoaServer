const Router = require('koa-router')

const router = new Router()

router.post('/v1/classic/latest', (ctx, next) => {
  const path = ctx.params
  const query = ctx.request.query
  const headers = ctx.request.header
  const body = ctx.request.body

  if (true) {
    const error = new global.errs.ParameterException()
    throw error
  }

  ctx.body = {
    key: 'classic'
  }
})

module.exports = router
