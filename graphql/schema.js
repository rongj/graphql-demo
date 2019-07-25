// 引入GraphQL各种方法类型
const {
	GraphQLSchema,
	GraphQLObjectType
} = require('graphql')

// 引入 type 
const { categories, category } = require('./category')
const { newsList, news } = require('./news')

module.exports = new GraphQLSchema({
	query: new GraphQLObjectType({
		name: 'Queries',
		fields: {
			categories,
			category,
			newsList,
			news
		}
	})
})