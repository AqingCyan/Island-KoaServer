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
}
