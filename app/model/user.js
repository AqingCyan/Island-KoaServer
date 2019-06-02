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
  nikename: Sequelize.STRING,
  email: Sequelize.STRING,
  password: Sequelize.STRING,
  openid: {
    type: Sequelize.STRING(64),
    unique: true
  }
}, {
    sequelize,
    tableName: 'user'
  })