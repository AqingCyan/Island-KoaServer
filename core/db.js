const Sequelize = require('sequelize')
const {
  dbName,
  user,
  password,
  host,
  port,
} = require('../config/config')

const sequelize = new Sequelize(dbName, user, password, {
  dialect: 'mysql',
  host: host,
  port: port,
  logging: true,
  timezone: '+08:00',
  define: {

  }
})

sequelize.sync()

module.exports = {
  db: sequelize,
}
