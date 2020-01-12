const Router = require('koa-router')
const bcrypt = require('bcryptjs')
const { RegisterValidator } = require('../../validators/validator')
const { User } = require('../../model/user')

const router = new Router({
	prefix: '/v1/user',
})

// 注册
router.post('/register', async ctx => {
	const v = await new RegisterValidator().validate(ctx)
	const salt = bcrypt.genSaltSync(10)
	const psw = bcrypt.hashSync(v.get('body.password2'), salt)
	const user = {
		email: v.get('body.email'),
		password: psw,
		nickname: v.get('body.nickname'),
	}
	const r = await User.create(user)
})

module.exports = router
