var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({

	username: String,
	email: String,
	accessCode: String,
	confirmed: Number,
	quizStarted: {
		type: Number,
		default: 0
	},
	disqualified: {
		type: Number,
		default: 0
	},
	password: String,
	school: String,
	name: String,
	role: {
		type: String,
		default: "user"
	},
	xParticipant: {
		type: Number,
		default: 1
	},
	eliminated: {
		type: Number,
		default: 0
	}

});

module.exports = mongoose.model('User', UserSchema);