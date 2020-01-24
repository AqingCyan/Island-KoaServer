const { Sequelize, Model, Op } = require('sequelize')
const { db } = require('../../core/db')
const { Art } = require('../model/art')

// 点赞业务表
class Favor extends Model {
  static async like(artId, type, uid) {
    // 对两个表有操作：增加classic表fav_nums的数量，用户点赞记录（数据库事务）
    const favor = await Favor.findOne({
      where: {
        art_id: artId,
        type,
        uid,
      },
    })
    if (favor) {
      throw new global.errs.LikeError()
    }
    return db.transaction(async t => {
      await Favor.create(
        {
          art_id: artId,
          type,
          uid,
        },
        { transaction: t },
      )
      const art = await Art.getData(artId, type, false)
      await art.increment('fav_nums', { by: 1, transaction: t })
    })
  }

  static async disLike(artId, type, uid) {
    const favor = await Favor.findOne({
      where: {
        art_id: artId,
        type,
        uid,
      },
    })
    if (!favor) {
      throw new global.errs.DisLikeError()
    }
    return db.transaction(async t => {
      await favor.destroy({
        force: true,
        transaction: t,
      })
      const art = await Art.getData(artId, type, false)
      await art.decrement('fav_nums', { by: 1, transaction: t })
    })
  }

  // 查询用户是否点赞过该期刊
  static async userLikeIt(artId, type, uid) {
    const favor = await Favor.findOne({
      where: {
        uid,
        art_id: artId,
        type,
      },
    })
    return !!favor
  }

  // 查询用户点赞过的期刊
  static async getMyClassicFavors(uid) {
    const arts = await Favor.findAll({
      where: {
        uid,
        type: {
          [Op.not]: 400,
        },
      },
    })
    if (!arts) {
      throw new global.errs.NotFound()
    }
    return await Art.getList(arts)
  }
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

module.exports = {
  Favor,
}
