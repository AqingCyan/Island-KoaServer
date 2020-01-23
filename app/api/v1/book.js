const Router = require('koa-router')

const router = new Router()

router.get('/v1/book/latest', ctx => {
  ctx.body = {
    key: 'book',
  }
})

module.exports = router
