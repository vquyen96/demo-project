var mongoose = require('mongoose');

module.exports = mongoose.model('categories', {	
	name: String,
	description: String,
	imageUrl: String,
	createdAt: {
		type: Date,
		default: Date.now
	},
	updatedAt: {
		type: Date,
		default: Date.now
	},
	status: {
		type: Number,
		default: 1
	}
});