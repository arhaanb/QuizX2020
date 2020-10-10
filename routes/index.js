const express = require('express');
const router = express.Router();
const { ensureAuthenticated, forwardAuthenticated, ensureAdmin } = require('../config/auth');
const passport = require('passport');
// Load models
const User = require('../models/user');
const Quiz = require('../models/quiz');
// const questions = require('../questions.js');

function createQuiz(
	school,
	ans1,
	ans2,
	ans3,
	ans4,
	ans5,
	ans6,
	ans7,
	ans8,
	ans9,
	ans10,
	ans11,
	ans12,
	ans13,
	ans14,
	ans15,
	ans16,
	ans17,
	ans18,
	ans19,
	ans20
) {

	var quizData = {
		school,
		ans1,
		ans2,
		ans3,
		ans4,
		ans5,
		ans6,
		ans7,
		ans8,
		ans9,
		ans10,
		ans11,
		ans12,
		ans13,
		ans14,
		ans15,
		ans16,
		ans17,
		ans18,
		ans19,
		ans20
	}

	Quiz.create(quizData, (error, log) => {
		if (error) {
			return next(error);
		}
	});
}

// Quiz
router.get('/', ensureAuthenticated, (req, res) => {
	if (req.user.quizStarted) {
		return res.render('over')
	} else {
		User.findById(req.user.id, function (err, user) {
			user.quizStarted = 1
			user.save()
			return res.render('quiz')
		})
	}
});

router.post('/quiz', ensureAuthenticated, async (req, res) => {
	createQuiz(
		req.user.school,
		req.body.ans1,
		req.body.ans2,
		req.body.ans3,
		req.body.ans4,
		req.body.ans5,
		req.body.ans6,
		req.body.ans7,
		req.body.ans8,
		req.body.ans9,
		req.body.ans10,
		req.body.ans11,
		req.body.ans12,
		req.body.ans13,
		req.body.ans14,
		req.body.ans15,
		req.body.ans16,
		req.body.ans17,
		req.body.ans18,
		req.body.ans19,
		req.body.ans20,
	)

	return res.render('over')
});

// Login Page
router.get('/login', forwardAuthenticated, (req, res) => {
	return res.render('login')
});

router.get('/admin/quiz', ensureAdmin, (req, res) => {
	Quiz.find().exec(function (err, team) {
		if (err) {
			console.log(err)
			return res.send('internal server error')
		}
		return res.render('adminquiz', { team })
	})
});

// Login
router.post('/login', (req, res, next) => {
	passport.authenticate('local', function (err, user, info) {
		if (err) { return next(err) }
		if (!user) {
			return res.render('login', { message: info.message })
		}
		req.logIn(user, function (err) {
			if (err) {
				return next(err);
			}
			return res.redirect('/');
		});
	})(req, res, next);
});

// Logout
router.get('/logout', (req, res) => {
	req.logout();
	req.flash('success_msg', `You've been logged out`);
	res.redirect('/login');
});

module.exports = router;