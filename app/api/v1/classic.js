const Router = require('koa-router')
const { Flow } = require('@model/flow')
const { Art } = require('@model/art')
const { Auth } = require('@root/middlewares/auth')
const { Favor } = require('@model/favor')

const router = new Router({
  prefix: '/v1/classic',
})

router.get('/latest', new Auth().m, async ctx => {
  const flow = await Flow.findOne({
    order: [['index', 'DESC']],
  })
  const art = await Art.getData(flow.art_id, flow.type)
  const likeLatest = await Favor.userLikeIt(flow.art_id, flow.type, ctx.auth.uid)
  art.setDataValue('index', flow.index)
  art.setDataValue('like_status', likeLatest)
  ctx.body = art
})

router.get('/:index/next', new Auth().m, async ctx => {
})

module.exports = router
