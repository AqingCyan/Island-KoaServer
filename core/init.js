const requireDirectory = require('require-directory')
const Router = require('koa-router')

class InitManager {
  // 入口配置中心
  static initCore(app) {
    InitManager.app = app
    InitManager.initLoadRouters()
    InitManager.loadHttpException()
  }

  // 自动注册路由
  static initLoadRouters() {
    const apiDirectory = `${process.cwd()}/app/api`
    requireDirectory(module, apiDirectory, {
      visit: (obj) => {
        if (obj instanceof Router) {
          InitManager.app.use(obj.routes())
        }
      }
    })
  }

  // 装载异常类到全局
  static loadHttpException() {
    const errors = require('./http-exception')
    global.errs = errors
  }
}

module.exports = InitManager
