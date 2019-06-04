/**
 * 帮助函数，处理一些细节
 */

/**
 * 成功响应函数（以抛出错误的形式响应成功会使逻辑不好立即，这里做一个处理）
 * @param {string} msg 响应信息
 * @param {number} errorCode 响应码
 */
function success(msg, errorCode) {
  // 以抛出异常的形式来响应成功
  throw new global.errs.Success(msg, errorCode)
}

module.exports = {
  success
}