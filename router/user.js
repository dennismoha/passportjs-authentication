const express = require('express');

const user = require('../controller/user');
const autth = require('../config/auth')

function isLoggedIn (req, res, next) {
		if(req.isAuthenticated()) {
				return next();
		}
		req.flash('sucess', 'error');
		res.redirect("/user/login")
	}
  


const router = express.Router();

router.get('/',isLoggedIn,user.welcome);
router.get('/signup',user.signup);
router.get('/login',user.login);
router.get('/dashboard',isLoggedIn ,user.dashboard)
router.get('/logout',user.logout)

//post routes
router.post('/register',user.register);
router.post('/signin', user.signin);





	
	


module.exports = router