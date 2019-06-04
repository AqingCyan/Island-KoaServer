/**
 * user数据库表模型
 */
const bcrpty = require('bcryptjs')
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
  password: {
    type: Sequelize.STRING,
    set(val) {
      // 密码加密，用盐来加密（10是计算机生成盐的时候花费的成本）
      const salt = bcrpty.genSaltSync(10)
      const psw = bcrpty.hashSync(val, salt)
      this.setDataValue('password', psw)
    }
  },
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