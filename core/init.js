const requireDirectory = require('require-directory')
const Router = require('koa-router')

class InitManager {
  // 入口配置中心
  static initCore(app) {
    InitManager.app = app
    InitManager.loadConfig()
    InitManager.initLoadRouters()
    InitManager.loadHttpException()
  }

  // 装载项目环境配置
  static loadConfig(path = '') {
    /* eslint prefer-template: 0 */
    const configPath = path || process.cwd() + '/config/config.js'
    /* eslint import/no-dynamic-require:0 */
    const config = require(configPath)
    global.config = config
  }

  // 自动注册路由
  static initLoadRouters() {
    const apiDirectory = `${process.cwd()}/app/api`
    requireDirectory(module, apiDirectory, {
      visit: (obj) => {
        if (obj instanceof Router) {
          InitManager.app.use(obj.routes())
        }
      },
    })
  }

  // 装载异常类到全局
  static loadHttpException() {
    const errors = require('./http-exception')
    global.errs = errors
  }
}

module.exports = InitManager
