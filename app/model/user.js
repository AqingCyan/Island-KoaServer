/**
 * user数据库表模型
 */

const { sequelize } = require('../../core/db')
const { Sequelize, Model } = require('sequelize')

class User extends Model { }

/**
 * 设置user表模型
 */
User.init({
  id: {
    type: Sequelize.INTEGER,
    // 确定为主键
    primaryKey: true,
    autoIncrement: true
  },
  nickname: Sequelize.STRING,
  email: {
    type: Sequelize.STRING(128),
    unique: true
  },
  password: Sequelize.STRING,
  openid: {
    type: Sequelize.STRING(64),
    unique: true
  }
}, {
    sequelize,
    tableName: 'user'
  })

module.exports = {
  User
}