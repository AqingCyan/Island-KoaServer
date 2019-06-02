/**
 * 服务器启动文件，用以中间件的注册与服务器配置
 */

const Koa = require('koa')
const parser = require('koa-bodyparser')
const InitManger = require('./core/init')
const catchError = require('./middlewares/exception')

// 初始化数据库user表
require('./app/model/user')

const PORT = 3000
const app = new Koa()

app.use(catchError)
app.use(parser())
InitManger.initCore(app)

app.listen(PORT)
