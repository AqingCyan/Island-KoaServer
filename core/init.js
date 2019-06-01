/**
 * 初始化服务器的工具
 */

const requireDirectory = require('require-directory')
const Router = require('koa-router')

class InitManger {
  /**
   * 初始化服务器实例配置
   * @param {object} app 服务器实例
   */
  static initCore(app) {
    InitManger.app = app
    InitManger.initLoaderRouters()
    InitManger.loadHttpException()
    InitManger.loadConfig()
  }

  /**
   * 加载路由文件到app
   */
  static initLoaderRouters() {
    // 获取路由文件的路径（该路径永不出错）
    const apiDirectory = `${process.cwd()}/app/api`
    // 读取路由文件下的路由并写入
    requireDirectory(module, apiDirectory, {
      visit: whenLoadModule
    })
    function whenLoadModule(obj) {
      if (obj instanceof Router) {
        InitManger.app.use(obj.routes())
      }
    }
  }

  /**
   * 加载全局的异常处理到app
   */
  static loadHttpException() {
    const errors = require('./http-exception')
    global.errs = errors
  }

  /**
   * 加载配置
   * @param {string} path 
   */
  static loadConfig(path = '') {
    const configPath = path || process.cwd() + '/config/config.js'
    const config = require(configPath)
    global.config = config
  }
}

module.exports = InitManger