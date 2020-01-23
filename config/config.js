module.exports = {
  environment: 'dev', // prod 为生产环境 dev 为开发环境
  database: {
    dbName: 'island',
    host: 'localhost',
    prot: 3306,
    user: 'root',
    password: 'xkq199862',
  },
  security: {
    secretKey: 'abcdefg',
    expiresIn: 3600 * 24 * 30,
  },
  wx: {
    appId: 'wx450dd912dbc5797d',
    appSecret: 'b82e65cc122d5ab628c923cd9e8ddb19',
    loginUrl: 'https://api.weixin.qq.com/sns/jscode2session?appid=%s&secret=%s&js_code=%s&grant_type=authorization_code',
  },
}
