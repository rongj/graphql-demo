// 引入mongoose
const mongoose = require('mongoose')
const Schema = mongoose.Schema

// 实例CategorySchema
const CategorySchema = new Schema({
	name: {
		type: String,
		// index: true
	},
	cname: String,
	status: {
		type: Number,
		default: 1
	},
	weight: {
		type: Number,
		default: 0
	},
	meta: {
		created_at: {
			type: Date,
			default: Date.now()
		},
		updated_at: {
			type: Date,
			default: Date.now()
		}
	}
})

// 在保存数据之前跟新日期
CategorySchema.pre('save', function(next) {
	if (this.isNew) {
		this.meta.created_at = this.meta.updated_at = Date.now()
	} else {
		this.meta.updated_at = Date.now()
	}
	next()
})

// 建立Category模型
mongoose.model('Category', CategorySchema)