// 引入GraphQL各种方法类型
const {
	GraphQLObjectType,
	GraphQLString,
	GraphQLInt,
	GraphQLID,
	GraphQLList,
	GraphQLNonNull
} = require('graphql')

const mongoose = require('mongoose')
const News = mongoose.model('News')


const NewsType = new GraphQLObjectType({
	name: 'News',
	fields: {
		_id: {
			type: GraphQLID
		},
		title: {
			type: GraphQLString
		},
		content: {
			type: GraphQLString
		},
		status: {
			type: GraphQLInt
		},
		category_id: {
			type: GraphQLID
		}
	}
})


const newsList = {
	type: new GraphQLList(NewsType),
	args: {
		pageSize: {
			type: GraphQLInt
		},
		pageNum: {
			type: GraphQLInt
		},
		category_id: {
			type: GraphQLID
		}
	},
	resolve(root, params, options) {
		const { pageNum = 1, pageSize = 10, category_id } = params

		const queryTerm = category_id ? { category_id } : {}
		return News.find(queryTerm).skip(pageSize*(pageNum-1)).limit(pageSize-0).exec()
	}
}


const news = {
	type: NewsType,
	args: {
		id: {
			type: new GraphQLNonNull(GraphQLID)
		}
	},
	resolve(root, params, options) {
		return News.findById(params.id).populate({
			path: 'category_id',
			select: 'name cname'
		}).exec()
	}
}

module.exports = {
	newsList,
	news
}