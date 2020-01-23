const util = require('util')
const Axios = require('axios')
const { User } = require('../model/user')
const { generateToken } = require('../../core/util')
const { Auth } = require('../../middlewares/auth')

class WXManger {
  static async codeToToken(code) {
    const { loginUrl, appId, appSecret } = global.config.wx
    const url = util.format(loginUrl, appId, appSecret, code)
    const result = await Axios.get(url)
    if (result.status !== 200) {
      throw new global.errs.AuthFailed('openId获取失败')
    }
    const { errcode } = result.data
    const { errmsg } = result.data
    if (errcode) {
      throw new global.errs.AuthFailed(`openId获取失败:${errmsg}`)
    }

    let user = await User.getUserByOpenid(result.data.openid)
    if (!user) {
      user = await User.registerByOpenid(result.data.openid)
    }
    return generateToken(user.id, Auth.USER)
  }
}

module.exports = {
  WXManger,
}
