/**
 * user数据库表模型
 */
const bcrpty = require('bcryptjs')
const { sequelize } = require('../../core/db')
const { Sequelize, Model } = require('sequelize')

class User extends Model {
  /**
   * 数据库查询用户登录信息
   * @param {string} email 登录邮箱
   * @param {string} plainPassword 登录密码
   */
  static async verifyEmailPassword(email, plainPassword) {
    // 通过用户邮箱查询到是否存在该用户
    const user = await User.findOne({
      where: {
        email
      }
    })
    if (!user) {
      throw new global.errs.NotFound('账号不存在')
    }
    // 能通过邮箱查询到该用户，进行密码验证
    const correct = bcrpty.compareSync(plainPassword, user.password)
    if (!correct) {
      throw new global.errs.AuthFailed('密码不正确')
    }
    return user
  }
}

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