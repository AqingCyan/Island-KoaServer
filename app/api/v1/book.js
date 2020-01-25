const Router = require('koa-router')
const { HotBook } = require('../../model/hot-book')
const { Book } = require('../../model/book')
const { Favor } = require('../../model/favor')
const { Auth } = require('../../../middlewares/auth')
const { PositiveIntegerValidator, SearchValidator } = require('../../validators/validator')

const router = new Router({
  prefix: '/v1/book',
})

// 获取热门书籍列表
router.get('/hot_list', async ctx => {
  ctx.body = await HotBook.getAll()
})

// 获取书籍详情
router.get('/:id/detail', async ctx => {
  const v = await new PositiveIntegerValidator().validate(ctx)
  const book = new Book(v.get('path.id'))
  ctx.body = await book.detail()
})

// 搜索图书
router.get('/search', async ctx => {
  const v = await new SearchValidator().validate(ctx)
  const q = v.get('query.q')
  const start = v.get('query.start')
  const count = v.get('query.count')
  ctx.body = await Book.searchFormYushu(q, start, count)
})

// 获取我喜欢的书籍的数量
router.get('/favor/count', new Auth().m, async ctx => {
  ctx.body = await Book.getMyFavorBookCount(ctx.auth.uid)
})

// 获取书籍点赞情况
router.get('/:book_id/favor', new Auth().m, async ctx => {
  const v = await new PositiveIntegerValidator().validate(ctx, { id: 'book_id' })
  ctx.body = await Favor.getBookFavor(ctx.auth.uid, parseInt(v.get('path.book_id'), 10))
})

module.exports = router
