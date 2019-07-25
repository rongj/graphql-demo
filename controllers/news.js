const mongoose = require('mongoose')
const News = mongoose.model('News')
const { jsonWrite } = require('../utils/ret')

// 创建新分类
const createNews = async (ctx, next) => {
	const params = ctx.request.body

	if(!params.title || !params.content || !params.category_id) {
		return jsonWrite(ctx, 400)
	}

	// 判断是否存在
	// const results = await News.find({ title: params.title })
	// if(results.length) {
	// 	return jsonWrite(ctx, 402)
	// }

	// 不存在则创建
	const news = new News(params)
	const res = await news.save()

	if (res) {
		jsonWrite(ctx, 200, {
			_id: res._id,
			...params,
		})
	} else {
		jsonWrite(ctx, 201)
	}
}

// 查询新闻列表
const fetchNews = async (ctx, next) => {
	const { pageNum = 1, pageSize = 10, category_id } = ctx.request.query
	const queryTerm = category_id ? { category_id } : {}


	// 查询所有分类返回name, cname
	const results = await News.find(queryTerm, ['title', 'content', 'category']).skip(pageSize*(pageNum-1)).limit(pageSize-0).populate('category_id', 'name cname').exec()
	if (results.length) {
		return jsonWrite(ctx, 200, results)
	}
}

module.exports = {
	createNews,
	fetchNews
}