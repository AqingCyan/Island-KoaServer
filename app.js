const path = require('path')
const Koa = require('koa')
const Parser = require('koa-bodyparser')
const Static = require('koa-static')
const InitManager = require('./core/init')
const catchError = require('./middlewares/exception')

const app = new Koa()

app.use(catchError)
app.use(Parser())
app.use(Static(path.join(__dirname, './static')))

InitManager.initCore(app)

app.listen(10086)
