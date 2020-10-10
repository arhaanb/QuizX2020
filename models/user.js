var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({

	username: String,
	paused: Number,
	cryptxlevel: {
		type: Number,
		default: 0
	},
	lastLevelOn: Date,
	eliminated: {
		type: Boolean,
		default: 0
	},
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
	event: String,
	funds: {
		type: Number,
		default: 0
	},
	startup: {
		name: String,
		description: String,
		image: String
	},
	teacher: {
		name: String,
		email: String,
		phoneNumber: String
	},
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
	},
	team: {
		notcreated: {
			type: Number,
			default: 1
		},
		design: {
			p1: {
				name: String,
				email: String
			},
			p2: {
				name: String,
				email: String
			},
			p3: {
				name: String,
				email: String
			}
		},
		pitching: {
			p1: {
				name: String,
				email: String
			},
			p2: {
				name: String,
				email: String
			}
		},
		programming: {
			p1: {
				name: String,
				email: String
			},
			p2: {
				name: String,
				email: String
			}
		},
		robotics: {
			p1: {
				name: String,
				email: String
			},
			p2: {
				name: String,
				email: String
			},
		},
		quiz: {
			p1: {
				name: String,
				email: String
			},
			p2: {
				name: String,
				email: String
			}
		},
		crossword: {
			p1: {
				name: String,
				email: String
			},
			p2: {
				name: String,
				email: String
			}
		},
		gaming: {
			p1: {
				name: String,
				email: String
			},
			p2: {
				name: String,
				email: String
			}
		},
		gd: {
			p1: {
				name: String,
				email: String
			}
		},
		surprise: {
			p1: {
				name: String,
				email: String
			},
			p2: {
				name: String,
				email: String
			}
		},
		photography: {
			p1: {
				name: String,
				email: String
			}
		},
		filmmaking: {
			p1: {
				name: String,
				email: String
			},
			p2: {
				name: String,
				email: String
			},
			p3: {
				name: String,
				email: String
			},
			p4: {
				name: String,
				email: String
			}
		}
	}

});

module.exports = mongoose.model('User', UserSchema);