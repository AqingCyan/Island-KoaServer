const { Sequelize, Model } = require('sequelize')
const { db } = require('../../core/db')

class Comment extends Model {
  // 新增评论
  static async addComment(bookId, content) {
    const comment = await Comment.findOne({
      where: {
        book_id: bookId,
        content,
      },
    })
    if (!comment) {
      await Comment.create({
        book_id: bookId,
        content,
        nums: 1,
      })
    } else {
      await comment.increment('nums', {
        by: 1,
      })
    }
  }

  // 查询某一book短评详情
  static async getComments(bookId) {
    return Comment.findAll({
      where: {
        book_id: bookId,
      },
    })
  }
}

Comment.prototype.exclude = ['book_id', 'id']

Comment.init({
  content: Sequelize.STRING(12),
  nums: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
  },
  book_id: Sequelize.INTEGER,
}, {
  sequelize: db,
  tableName: 'comment',
})

module.exports = {
  Comment,
}
