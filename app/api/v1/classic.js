const Router = require('koa-router')
const { Flow } = require('../../model/flow')
const { Auth } = require('../../../middlewares/auth')
const { Art } = require('../../model/art')
const { Favor } = require('../../model/favor')
const { PositiveIntegerValidator, ClassicValidator } = require('../../validators/validator')

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

// 获取某一期刊详细信息
router.get('/:type/:id', new Auth().m, async ctx => {
  const v = await new ClassicValidator().validate(ctx)
  const id = v.get('path.id')
  // 从path和params上获取的参数都是字符串，以便外面调用get获取到的是数字类型
  const type = parseInt(v.get('path.type'), 10)
  const artDetail = await new Art(id, type).getDetail(ctx.auth.uid)
  artDetail.art.setDataValue('like_status', artDetail.like_status)
  ctx.body = artDetail.art
})

// 获取用户对某一期刊是否点赞
router.get('/:type/:id/favor', new Auth().m, async ctx => {
  const v = await new ClassicValidator().validate(ctx)
  const id = v.get('path.id')
  const type = parseInt(v.get('path.type'), 10)
  const artDetail = await new Art(id, type).getDetail(ctx.auth.uid)
  ctx.body = {
    fav_nums: artDetail.art.fav_nums,
    like_status: artDetail.like_status,
  }
})

// 获取用户点赞过的期刊
router.get('/favor', new Auth().m, async ctx => {
  const { uid } = ctx.auth
  ctx.body = await Favor.getMyClassicFavors(uid)
})

module.exports = router
