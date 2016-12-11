var express = require('express');
var router = express.Router();
var User = require('../models/user');
var jwt = require('jsonwebtoken');
var app = require('../app');

var verifyToken = function(req, res, next) {
	var token = req.body.token || req.query.token || req.headers['x-access-token'];

	jwt.verify(token, app.get('superSecret'), function(err, decoded) {      
		if (err) {
			next({
				code: 403,
				message: 'No authenticated'
			});
		} else {  
		  next();
		}
	}); 
}
	
router.post('/authenticate', function(req, res, next) {
	User.findOne({
		name: req.body.name,
		password: req.body.password
	}, function(err, user) {
		if(!user) {
			res.send('User not found');
		} else {
			var token = jwt.sign(user, app.get('superSecret'), {
			        	expiresIn: '30m'
			        });

			res.send(token);
		}
	});
  
});

router.get('/users', verifyToken, function(req, res) {
	User.find({}, function(err, users) {
	  res.json(users);
	});
});

router.use('*', function(req, res, next) {
 	res.send('No api method');
});

module.exports = router;
