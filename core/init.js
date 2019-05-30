const requireDirectory = require('require-directory')
const Router = require('koa-router')

class InitManger {
  static initCore(app) {
    // 入口方法（初始化app）
    InitManger.app = app
    InitManger.initLoaderRouters()
  }
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
}

module.exports = InitManger