module.exports = {
	// mongodb
	mongodb: {
		// host: 'mongodb://localhost:27017/koa-graphql',
		host: '127.0.0.1',
		database: 'koa-graphql',
		port: 27017,
		user: 'root',
		password: 'mima123456',
	},

	// jsonwebtoken
	jwt: {
		secret: 'jwt_user_token',
		expiresIn: 60 * 10,
		redis_item: 'user_token:', 
		redis_item_key: 'user_'
	},

	// 七牛云
	qiniu: {
		accessKey: '',
		secretKey: '',
		bucket: '',
		origin: '',
		hosturl: '',
	}
};