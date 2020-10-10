const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const flash = require('connect-flash');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
const rateLimit = require("express-rate-limit");
require('dotenv').config()

const app = express();

// Passport Config
require('./config/passport')(passport);

// DB Config
const db = process.env.MONGODB;

// Connect to MongoDB
mongoose
	.connect(
		db,
		{
			useNewUrlParser: true,
			useUnifiedTopology: true
		}
	)
	.then(() => console.log('MongoDB Connected'))
	.catch(err => console.log(err));

//Setting view engine
app.set('view engine', 'pug');
app.set('views', __dirname + '/views');

//Rate limiting
app.set('trust proxy', 1);

const limiter = rateLimit({
	windowMs: 3 * 60 * 1000, // 3 minutes
	max: 50, // limit each IP to 50 requests per windowMs
	message: "bro... too many requests.."
});

// app.use(limiter);

// Express body parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Setting public directory
app.use(express.static('public'))

// Sessions
app.use(session({
	secret: 'KissyKissyAnus',
	resave: false,
	saveUninitialized: false,
	store: new MongoStore({ mongooseConnection: mongoose.connection })
}));

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Connect flash
app.use(flash());

// Global variables

app.use((req, res, next) => {
	res.locals.currentUser = req.user;
	next();
});

app.use(function (req, res, next) {
	res.locals.success_msg = req.flash('success_msg');
	res.locals.error_msg = req.flash('error_msg');
	res.locals.error = req.flash('error');
	next();
});


// Routes
app.use('/', require('./routes/index.js'));

//404
app.use((res, req, next) => {
	var err = new Error('File not found!');
	err.status = 404;
	next(err);
});

//Error Handler
app.use((error, req, res, next) => {
	res.status(500);
	res.render('error');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server started on port ${PORT}`));