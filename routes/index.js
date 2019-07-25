const { graphqlKoa, graphiqlKoa } = require('graphql-server-koa')

const category = require('../controllers/Category')
const news = require('../controllers/news')

// 引入schema
const schema = require('../graphql/schema')

const router = require('koa-router')()

// add url-route:
// router.get('/hello/:name', async (ctx, next) => {
//     var name = ctx.params.name;
//     ctx.response.body = `<h1>Hello, ${name}!</h1>`;
// });

// router.get('/', async (ctx, next) => {
//     ctx.render('index')
// });

router.post('/category/create', category.createCategory)
	.get('/category/all', category.fetchCategory)
	.post('/news/create', news.createNews)
	.get('/news/list', news.fetchNews)


router.post('/graphql', async(ctx, next) => {
		await graphqlKoa({ schema: schema })(ctx, next) // 使用schema
	})
	.get('/graphql', async(ctx, next) => {
		await graphqlKoa({ schema: schema })(ctx, next) // 使用schema
	})
	.get('/graphiql', async(ctx, next) => {
		await graphiqlKoa({ endpointURL: '/graphql' })(ctx, next) // 重定向到graphiql路由
	})

module.exports = router