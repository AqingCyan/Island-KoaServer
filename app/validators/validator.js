const { LinValidator, Rule } = require('../../core/lin-validator')
const { User } = require('../model/user')
const { LoginType, ArtType } = require('../lib/enum')

// 校验LoginType类型
function checkLoginType(vals) {
  let type = vals.body.type || vals.path.type
  if (!type) {
    throw new Error('type是必传参数')
  }
  type = parseInt(type, 10)
  if (!LoginType.isThisType(type)) {
    throw new Error('type参数不合法')
  }
}

// 校验ArtType类型
function checkArtType(vals) {
  let type = vals.body.type || vals.path.type
  if (!type) {
    throw new Error('type是必须参数')
  }
  // 从path和params上获取的参数都是字符串，需要转换类型再校验
  type = parseInt(type, 10)
  if (!ArtType.isThisType(type)) {
    throw new Error('type参数不合法')
  }
}

class PositiveIntegerValidator extends LinValidator {
  constructor() {
    super()
    this.id = [new Rule('isInt', '需要传入正整数', { min: 1 })]
  }
}

// 注册验证
class RegisterValidator extends LinValidator {
  constructor() {
    super()
    this.email = [new Rule('isEmail', '不符合Email规范')]
    this.password1 = [
      new Rule('isLength', '密码至少6个字符，最多32个字符', {
        min: 6,
        max: 32,
      }),
      new Rule(
        'matches',
        '密码不符合规范，请包含特殊字符',
        '^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]',
      ),
    ]
    this.password2 = this.password1
    this.nickname = [new Rule('isLength', '昵称长度不符合规范', {
      min: 4,
      max: 32,
    })]
  }

  // 验证两个密码相同
  validatePassword(vals) {
    const psw1 = vals.body.password1
    const psw2 = vals.body.password2
    if (psw1 !== psw2) {
      throw new Error('前后密码必须相同')
    }
  }

  // 验证邮箱
  async validateEmail(vals) {
    const { email } = vals.body
    const user = await User.findOne({ where: { email } })
    if (user) {
      throw new Error('email已经存在')
    }
  }
}

// 凭证验证
class TokenValidator extends LinValidator {
  constructor() {
    super()
    this.account = [new Rule('isLength', '不符合账号规则', {
      min: 4,
      max: 32,
    })]
    this.secret = [
      new Rule('isOptional'),
      new Rule('isLength', '至少六个字符', {
        min: 6,
        max: 128,
      }),
    ]
  }

  // 如果使用邮箱登录，必传密码
  validateEmailPassword(vals) {
    const isEmail = vals.body.type === LoginType.USER_EMAIL
    if (isEmail && !vals.body.secret) {
      throw new Error('密码不能为空')
    }
  }

  // 校验登录类型
  validateLoginType(vals) {
    checkLoginType(vals)
  }
}

class NotEmptyValidator extends LinValidator {
  constructor() {
    super()
    this.token = [new Rule('isLength', '不允许为空', { min: 1 })]
  }
}

// 校验是否点赞的参数
class LikeValidator extends PositiveIntegerValidator {
  constructor() {
    super()
    this.validateType = checkArtType
  }
}

// 校验获取用户对某一期刊是否点赞的参数
class ClassicValidator extends LikeValidator {}

// 校验搜索图书接口参数
class SearchValidator extends LinValidator {
  constructor() {
    super()
    this.q = [
      new Rule('isLength', '搜索关键词不能为空', {
        min: 1,
        max: 16,
      }),
    ]
    this.start = [
      new Rule('isInt', 'start不符合规范', {
        min: 0,
        max: 60000,
      }),
      new Rule('isOptional', '', 0),
    ]
    this.count = [
      new Rule('isInt', 'count不符合规范', {
        min: 1,
        max: 20,
      }),
      new Rule('isOptional', '', 20),
    ]
  }
}

// 校验增加短评接口参数
class AddShortComment extends PositiveIntegerValidator {
  constructor() {
    super()
    this.content = [
      new Rule('isLength', '长度必须在1到12之间', {
        min: 1,
        max: 12,
      }),
    ]
  }
}

module.exports = {
  PositiveIntegerValidator,
  RegisterValidator,
  TokenValidator,
  NotEmptyValidator,
  LikeValidator,
  ClassicValidator,
  SearchValidator,
  AddShortComment,
}
