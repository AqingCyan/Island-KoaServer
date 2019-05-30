const Koa = require('koa')
const parser = require('koa-bodyparser')
const InitManger = require('./core/init')

const PORT = 3000
const app = new Koa()

app.use(parser())
InitManger.initCore(app)

app.listen(PORT)
