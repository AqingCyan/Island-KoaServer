const { db } = require('@root/core/db')
const { Sequelize, Model } = require('sequelize')
const { Art } = require('./art')
const { Favor } = require('./favor')

class Flow extends Model {
  static async getPreOrNextData(ctx, type, index) {
    let flow
    if (type) {
      const id = type === 'pre' ? index - 1 : index + 1
      const finder = {
        where: {
          id,
        },
      }
      flow = await Flow.findOne(finder)
    } else {
      flow = await Flow.findOne({
        order: [['index', 'DESC']],
      })
    }
    if (!flow) {
      throw new global.errs.NotFound()
    }
    const art = await Art.getData(flow.art_id, flow.type)
    const likeContent = await Favor.userLikeIt(flow.art_id, flow.type, ctx.auth.uid)
    art.setDataValue('index', flow.index)
    art.setDataValue('like_status', likeContent)
    return art
  }
}

Flow.init(
  {
    index: Sequelize.INTEGER,
    art_id: Sequelize.INTEGER,
    type: Sequelize.INTEGER,
  },
  {
    sequelize: db,
    tableName: 'flow',
  },
)

module.exports = {
  Flow,
}
