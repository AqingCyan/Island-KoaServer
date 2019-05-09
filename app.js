const Koa = require('koa')
const PORT = 3000
const app = new Koa()

app.use((ctx, next) => {
  console.log('Aqing Cyan')
  next()
})

app.use((ctx, next) => {
  console.log('第二个中间件')
})

app.listen(PORT)
