const Router = require('koa-router')
const { HotBook } = require('../../model/hot-book')
const { Book } = require('../../model/book')
const { Favor } = require('../../model/favor')
const { Comment } = require('../../model/book-comment')
const { Auth } = require('../../../middlewares/auth')
const { PositiveIntegerValidator, SearchValidator, AddShortComment } = require('../../validators/validator')
const { success } = require('../../lib/helper')

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
  const book = new Book()
  ctx.body = await book.detail(v.get('path.id'))
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

// 增加短评
router.post('/add/short_comment', new Auth().m, async ctx => {
  const v = await new AddShortComment().validate(ctx, { id: 'book_id' })
  await Comment.addComment(v.get('body.book_id'), v.get('body.content'))
  success()
})

// 获取书籍短评
router.get('/:book_id/short_comment', new Auth().m, async ctx => {
  const v = await new PositiveIntegerValidator().validate(ctx, { id: 'book_id' })
  ctx.body = await Comment.getComments(v.get('path.book_id'))
})

// 模拟一个热搜接口（web开发无法解决）
router.get('/hot_keyword', async ctx => {
  ctx.body = {
    hot: [
      'JavaScript',
      'Golang',
      '村上村树',
      '东野圭吾',
      'NodeJs',
      '王小波',
    ],
  }
})

module.exports = router
