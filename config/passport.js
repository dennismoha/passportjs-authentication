const localStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('../model/user');


module.exports = (passport)=> {
	passport.use(
			new localStrategy({usernameField:'email'},(email,password,done)=> {
				User.findOne({email:email})
				.then((user)=>{
					if(!user) {
						return done(null,false,{message:"that email is not registered"});
					}

					//match password
					bcrypt.compare(password,user.password,(err,isMatch)=>{
						if(err)  throw err;

						if(isMatch) {
							return done(null, user);
						}else {
							return done(null, false, {message:"password incorrect"})
							
						}
					})
				}).catch((error)=> {
					throw error
				})
			})
			)
		passport.serializeUser(function(user, done) {
	  done(null, user.id);
	});

	passport.deserializeUser(function(id, done) {
	  User.findById(id, function(err, user) {
	    done(err, user);
	  });
	});

}

