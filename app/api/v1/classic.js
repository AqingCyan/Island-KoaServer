const Router = require('koa-router')
const { Flow } = require('@model/flow')
const { Art } = require('@model/art')
const { Auth } = require('@root/middlewares/auth')
const { Favor } = require('@model/favor')
const { PositiveIntegerValidator } = require('@validators/validator')

const router = new Router({
  prefix: '/v1/classic',
})

// 获取最新期刊
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

// 获取下一期刊
router.get('/:index/next', new Auth().m, async ctx => {
  const v = await new PositiveIntegerValidator().validate(ctx, { id: 'index' })
  console.log(v)
  const index = v.get('path.index')
  const flow = await Flow.findOne({
    where: {
      index: index + 1,
    },
  })
  if (!flow) {
    throw new global.errs.NotFound()
  }
  const art = await Art.getData(flow.art_id, flow.type)
  const likeNext = await Favor.userLikeIt(flow.art_id, flow.type, ctx.auth.uid)
  art.setDataValue('index', flow.index)
  art.setDataValue('like_status', likeNext)
  ctx.body = art
})

// 获取下期期刊
router.get('/:index/previous', new Auth().m, async ctx => {
  const v = await new PositiveIntegerValidator().validate(ctx, { id: 'index' })
  const index = v.get('path.index')
  const flow = await Flow.findOne({
    where: {
      index: index - 1,
    },
  })
  if (!flow) {
    throw new global.errs.NotFound()
  }
  const art = await Art.getData(flow.art_id, flow.type)
  const likePre = await Favor.userLikeIt(flow.art_id, flow.type, ctx.auth.uid)
  art.setDataValue('index', flow.index)
  art.setDataValue('like_status', likePre)
  ctx.body = art
})


module.exports = router
