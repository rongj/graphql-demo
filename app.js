const Koa = require('koa')
const Router = require('koa-router')
const bodyParser = require('koa-bodyparser')
const KoaStatic = require('koa-static')

const { mongodbConnect } = require('./mongodb') // 引入mongodb
mongodbConnect() // 链接数据库并且初始化数据模型

const GraphqlRouter = require('./routes')

const app = new Koa()
const router = new Router()

// log request URL:
// app.use(async (ctx, next) => {
//     console.log(`Process ${ctx.request.method} ${ctx.request.url}...`);
//     await next();
// });


// body-parser
app.use(bodyParser());

// static
app.use(KoaStatic(__dirname + '/public'))


router.use('', GraphqlRouter.routes())

// add router middleware:
app.use(router.routes())

app.listen(4001);
console.log('app started at port 4001...')