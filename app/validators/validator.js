/**
 * 参数校验器（引用lin-validator函数）
 */

const { LinValidator, Rule } = require('../../core/lin-validator')

class PositiveIntegerValidator extends LinValidator {
  constructor() {
    super()
    this.id = [
      // Rule定义校验规则，三个参数：校验规则，提示信息，可选的附加约束
      new Rule('isInt', '需要是正整数', { min: 1 })
    ]
  }
}

module.exports = {
  PositiveIntegerValidator
}