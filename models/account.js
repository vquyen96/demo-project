var mongoose = require('mongoose');

module.exports = mongoose.model('accounts', {
	rollNumber: {
		type: String,
		required: 'Please enter roll number.'
	},
	username: String,
	password: String,
	salt: String,
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