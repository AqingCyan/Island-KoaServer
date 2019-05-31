/**
 * classic下的路由管理
 */

const Router = require('koa-router')
const router = new Router()
const { HttpException } = require('../../../core/http-exception')

// 若想在url中间传参，就可以使用:id的形式
router.get('/v1/:id/classic/latest', (ctx, next) => {
  const path = ctx.params
  const query = ctx.request.query
  const header = ctx.request.header
  const body = ctx.request.body

  if (true) {
    const error = new HttpException('为什么错误', 10001, 400)
    throw error
  }

  ctx.body = {
    key: 'classic'
  }
})

module.exports = router