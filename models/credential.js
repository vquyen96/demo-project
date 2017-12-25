var mongoose = require('mongoose');

module.exports = mongoose.model('credentials', {	
	tokenKey: String,
	ownerId: String,	
	createdAt: {
		type: Date,
		default: Date.now
	},
	expiredAt: {
		type: Date,
		default: Date.now
	},
	status: {
		type: Number,
		default: 1
	}
});