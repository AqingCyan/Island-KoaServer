/**
 * 开发环境参数
 */
module.exports = {
  // 环境参数
  enviroment: "dev",
  // 数据库参数
  database: {
    dbName: "island",
    host: "localhost",
    port: 3306,
    user: "root",
    password: "xkq199862"
  },
  // 定义jwt中的key字段
  security: {
    secretKey: "aqingcyan",
    expiresIn: 60 * 60
  }
}
