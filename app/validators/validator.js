/**
 * 路由参数校验器（引用lin-validator）
 */

const { LinValidator, Rule } = require('../../core/lin-validator')
const { User } = require('../model/user')
const { LoginType } = require('../lib/enum')

/**
 * 路径参数校验器
 */
class PositiveIntegerValidator extends LinValidator {
  constructor() {
    super()
    this.id = [
      // Rule定义校验规则，三个参数：校验规则，提示信息，可选的附加约束
      new Rule('isInt', '需要是正整数', { min: 1 })
    ]
  }
}

/**
 * 注册信息校验器
 */
class RegisterValidator extends LinValidator {
  constructor() {
    super()
    this.email = [
      new Rule('isEmail', '不符合e-mail规范')
    ]
    this.password = [
      new Rule('isLength', '密码最少6位，最长32位', { min: 6, max: 32 }),
      new Rule('matches', '密码不符合规范', '^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]')
    ]
    this.password2 = this.password1
    this.nickname = [
      new Rule('isLength', '昵称不符合长度规范', { min: 4, max: 32 })
    ]
  }
  /**
   * 验证两密码是否相等
   * @param {object} vals 所有注册信息
   */
  validatePassword(vals) {
    const psw1 = vals.body.password
    const psw2 = vals.body.password2
    if (psw1 !== psw2) {
      throw Error('两个密码必须相同')
    }
  }

  /**
   * 验证邮箱是否重复
   * @param {object} vals 所有注册信息
   */
  async validateEmail(vals) {
    const email = vals.body.email
    const user = await User.findOne({
      where: {
        email: email
      }
    })
    if (user) {
      throw new Error('e-mail已存在')
    }
  }
}

/**
 * token校验器
 */
class TokenValidator extends LinValidator {
  constructor() {
    super()
    this.account = [
      new Rule('isLength', '不符合账号规则', { min: 4, max: 32 })
    ]
    // 因为登录可能有多种形式，因此可以不传入secret，但传入要符合规范（两个验证规则）
    this.secret = [
      new Rule('isOptional'),
      new Rule('isLength', '至少6个字符', { min: 6, max: 128 })
    ]
  }
  // 登录有很多形式，我们用模拟枚举的形式实现
  /**
   * 校验type
   * @param {object} val 
   */
  validateLoginType(val) {
    if (!val.body.type) {
      throw new Error('type是必须参数')
    }
    if (!LoginType.isThisType(val.body.type)) {
      throw new Error('type参数不合法')
    }
  }
}

module.exports = {
  PositiveIntegerValidator,
  RegisterValidator,
  TokenValidator
}