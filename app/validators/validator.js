/**
 * 路由参数校验器（引用lin-validator）
 */

const { LinValidator, Rule } = require('../../core/lin-validator')

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
   * @param{object} vals 所有注册信息
   */
  validatePassword(vals) {
    const psw1 = vals.body.password
    const psw2 = vals.body.password2
    if (psw1 !== psw2) {
      throw Error('两个密码必须相同')
    }
  }
}

module.exports = {
  PositiveIntegerValidator,
  RegisterValidator
}