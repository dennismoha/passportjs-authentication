const express = require('express')

const  isLoggedIn = function (req, res, next) {
		if(req.isAuthenticated()) {
				return next();
		}
		req.flash("error", "Please login first!");
		res.redirect("/user/login")
	}

module.exports = {isLoggedIn}