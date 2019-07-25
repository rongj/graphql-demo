const mongoose = require('mongoose');
const { mongodb } = require('../config/db');


// 引入 models
require('./schema/category')
require('./schema/news')

const uri = `mongodb://${mongodb.host}:${mongodb.port}/${mongodb.database}?authSource=admin`
// const uri = 'mongodb://localhost:27017/koa-graphql'
const options = {
	user: mongodb.user,
	pass: mongodb.password
}

const mongodbConnect = () => {
	console.log('Connected to MongoDB ', uri)

	// mongoose.set('debug', true)

	mongoose.connect(uri, options)

	mongoose.connection.on('disconnected', () => {
		mongoose.connect(uri, options)
	})
	mongoose.connection.on('error', err => {
		console.error(err)
	})

	mongoose.connection.on('open', async () => {
		console.log('Connected to MongoDB ', uri)
	})
}

module.exports = {
	mongodbConnect
}