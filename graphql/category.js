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
const Category = mongoose.model('Category') // 引入Category模块

// const objType = new GraphQLObjectType({
// 	name: 'meta',
// 	fields: {
// 		created_at: {
// 			type: GraphQLString
// 		},
// 		updated_at: {
// 			type: GraphQLString
// 		}
// 	}
// })

const CategoryType = new GraphQLObjectType({
	name: 'Category',
	fields: {
		_id: {
			type: GraphQLID
		},
		name: {
			type: GraphQLString
		},
		cname: {
			type: GraphQLString
		},
		status: {
			type: GraphQLInt
		},
		weight: {
			type: GraphQLInt
		},
		// meta: {
		// 	type: objType
		// }
	}
})


const categories = {
	type: new GraphQLList(CategoryType),
	args: {},
	resolve(root, params, options) {
		return Category.find({}).exec()
	}
}


const category = {
	type: CategoryType,
	args: {
		id: {
			name: 'id',
			type: new GraphQLNonNull(GraphQLID)
		}
	},
	resolve(root, params, options) {
		return Category.findOne({
			_id: params.id
		}).exec()
	}
}


module.exports = {
	CategoryType,
	categories,
	category
}