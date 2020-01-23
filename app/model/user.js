const bcrypt = require('bcryptjs')
const { Sequelize, Model } = require('sequelize')
const { db } = require('@root/core/db')

class User extends Model {
  static async verifyEmailPassword(email, plainPassword) {
    const user = await User.findOne({
      where: {
        email,
      },
    })
    if (!user) {
      throw new global.errs.NotFound('账号不存在')
    }
    const correct = bcrypt.compareSync(plainPassword, user.password)
    if (!correct) {
      throw new global.errs.AuthFailed('密码不正确')
    }
    return user
  }

  static async getUserByOpenid(openid) {
    const user = await User.findOne({
      where: {
        openid,
      },
    })
    return user
  }

  static async registerByOpenid(openid) {
    return User.create({ openid })
  }
}

User.init(
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nickname: Sequelize.STRING,
    email: {
      type: Sequelize.STRING(128),
      unique: true,
    },
    password: {
      type: Sequelize.STRING,
      set(val) {
        const salt = bcrypt.genSaltSync(10)
        const psw = bcrypt.hashSync(val, salt)
        this.setDataValue('password', psw)
      },
    },
    openid: {
      type: Sequelize.STRING(64),
      unique: true,
    },
  },
  {
    sequelize: db,
    tableName: 'user',
  },
)

module.exports = {
  User,
}
