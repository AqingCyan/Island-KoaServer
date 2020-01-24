const { Sequelize, Model } = require('sequelize')
const { db } = require('../../core/db')

class HotBook extends Model {
  static async getAll() {
    const books = await HotBook.findAll({
      order: ['index'],
    })
    const ids = []
    books.forEach(book => {
      ids.push(book.id)
    })
  }
}

HotBook.init({
  index: Sequelize.INTEGER,
  image: Sequelize.STRING,
  author: Sequelize.STRING,
  title: Sequelize.STRING,
}, {
  sequelize: db,
  tableName: 'hot_book',
})

module.exports = {
  HotBook,
}
