const { db } = require('../../config/db')
const { Sequelize, Model } = require('sequelize')

// 点赞业务表
class Favor extends Model {
  static async like(art_id, type, uid) {
    // 对两个表有操作：增加classic表fav_nums的数量，用户点赞记录（数据库事务）
     
  }

  static async disLike(art_id, type, uid) {}
}

Favor.init(
  {
    uid: Sequelize.INTEGER,
    art_id: Sequelize.INTEGER,
    type: Sequelize.INTEGER,
  },
  {
    sequelize: db,
    tableName: 'favor',
  },
)
