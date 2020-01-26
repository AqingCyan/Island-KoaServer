const { Sequelize, Model } = require('sequelize')
const { unset, clone, isArray } = require('lodash')
const { dbName, user, password, host, port } = require('../config/config').database

const sequelize = new Sequelize(dbName, user, password, {
  dialect: 'mysql',
  host,
  port,
  logging: true,
  timezone: '+08:00',
  define: {
    timestamps: true,
    paranoid: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',
    underscored: true,
    scopes: {
      bh: {
        attributes: {
          exclude: ['updated_at', 'deleted_at', 'created_at'],
        },
      },
    },
  },
})

sequelize.sync({
  force: false,
})

Model.prototype.toJSON = function () {
  const data = clone(this.dataValues)
  unset(data, 'updated_at')
  unset(data, 'created_at')
  unset(data, 'deleted_at')
  for (const key in data) {
    if (key === 'image') {
      if (!data[key].startsWith('http')) {
        data[key] = global.config.host + data[key]
      }
    }
  }
  if (isArray(this.exclude)) {
    this.exclude.forEach(value => {
      unset(data, value)
    })
  }
  return data
}

module.exports = {
  db: sequelize,
}
