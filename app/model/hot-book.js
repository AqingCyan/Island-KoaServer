const { Sequelize, Model, Op } = require('sequelize')
const { db } = require('../../core/db')
const { Favor } = require('./favor')

class HotBook extends Model {
  static async getAll() {
    const books = await HotBook.findAll({
      order: ['index'],
    })
    const ids = []
    books.forEach(book => {
      ids.push(book.id)
    })
    const favors = await Favor.findAll({
      where: {
        art_id: {
          [Op.in]: ids,
        },
      },
      group: ['art_id'],
      attributes: ['art_id', [Sequelize.fn('COUNT', '*'), 'count']],
    })
    books.forEach(book => {
      HotBook.getEachBookStatus(book, favors)
    })
    return books
  }

  static getEachBookStatus(book, favors) {
    let count = 0
    favors.forEach(favor => {
      if (book.id === favor.art_id) {
        count = favor.get('count')
      }
    })
    book.setDataValue('fav_nums', count)
    return book
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
