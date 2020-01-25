const Router = require('koa-router')
const { HotBook } = require('../../model/hot-book')

const router = new Router()

router.get('/v1/book/hot_list', async ctx => {
  ctx.body = await HotBook.getAll()
})

module.exports = router
