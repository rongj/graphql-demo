const mongoose = require('mongoose')
const Category = mongoose.model('Category')
const { jsonWrite } = require('../utils/ret')

// 创建新分类
const createCategory = async (ctx, next) => {
	const params = ctx.request.body

	if(!params.name || !params.cname) {
		return jsonWrite(ctx, 400)
	}

	// 判断分类名name是否存在
	const results = await Category.find({ name: params.name })
	if(results.length) {
		return jsonWrite(ctx, 402, '分类已存在!')
	}

	// 不存在则创建
	const category = new Category(params)
	const res = await category.save()

	if (res) {
		jsonWrite(ctx, 200, {
			_id: res._id,
			...params
		})
	} else {
		jsonWrite(ctx, 201)
	}
}

// 查询所有分类
const fetchCategory = async (ctx, next) => {
	// 查询所有分类返回name, cname
	const results = await Category.find({}, ['name', 'cname'])
	if (results.length) {
		return jsonWrite(ctx, 200, results)
	}
}

module.exports = {
	createCategory,
	fetchCategory
}