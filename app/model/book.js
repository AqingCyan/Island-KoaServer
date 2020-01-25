const { Sequelize, Model } = require('sequelize')
const util = require('util')
const Axios = require('axios')
const { db } = require('../../core/db')

class Book extends Model {
  constructor(id) {
    super()
    this.id = id
  }

  async detail() {
    const url = util.format(global.config.yushu.detailUrl, this.id)
    const { data } = await Axios.get(url)
    return data
  }

  static async searchFormYushu(q, start, count, summary = 1) {
    const url = util.format(global.config.yushu.keywordUrl, encodeURI(q), count, start, summary)
    const { data } = await Axios.get(url)
    return data
  }
}

Book.init({
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
  },
  fav_nums: {
    type: Sequelize.INTEGER,
    default: 0,
  },
}, {
  sequelize: db,
  tableName: 'book',
})

module.exports = {
  Book,
}
