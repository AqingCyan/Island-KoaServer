/**
 * Mysql数据库相关配置，使用Sequelize操作
 */

const Sequelize = require('sequelize')
const { dbName, host, port, user, password } = require('../config/config').database

const sequelize = new Sequelize(dbName, user, password, {
  dialect: 'mysql',
  host,
  port,
  logging: true, // 控制台可以打印sql具体操作
  timezone: '+08:00',
  define: {
    timestamps: true, // 数据表自动记录操作数据时间的选项
    paranoid: true, // 数据表自动记录删除数据时间的选项
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',
    underscored: true
  }
})

sequelize.sync({
  force: false // 不开启当数据表变化删除原表建立新表选项
})

module.exports = { sequelize }