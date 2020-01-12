const Sequelize = require('sequelize')
const { dbName, user, password, host, port } = require('../config/config').database

const sequelize = new Sequelize(dbName, user, password, {
	dialect: 'mysql',
	host: host,
	port: port,
	logging: true,
	timezone: '+08:00',
	define: {
		timestamps: true,
		paranoid: true,
		createdAt: 'created_at',
		updatedAt: 'updated_at',
		deletedAt: 'deleted_at',
		underscored: true,
	},
})

sequelize.sync({
	force: false,
})

module.exports = {
	db: sequelize,
}
