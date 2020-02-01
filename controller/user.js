const User = require('../model/user')
const bcrypt = require('bcrypt')
const passport = require('passport')
	//template render files
const welcome = (req,res) => {
		res.render('welcome')	
}

const signup = (req,res) => {
		res.render('singup')
}

const login = (req,res) => {
		res.render('login')
}

const dashboard = (req,res)=> {
	res.render('dashboard')
}

const register = (req,res) => {
	
	
	const {name, email, password,password2} = req.body;
	let errors = [];

	if(!name || !email || !password || !password) {
		errors.push({message: "please fill in all the requirements"})
	}
	
	if(password !== password2) {
		errors.push({message: "password do not match"})
	}

	if(password.length < 6) {
		errors.push({message: "password cannot be less than 6 characters"})
	}

	if(errors.length > 0) {
		res.render('singup',{
			errors,name, email, password, password2
		})
	} else {
		User.findOne({email:email})
		.then(user => {
			if(user) {
				errors.push({message:"Email is arleady taken"});
				res.render('singup',{
					errors,name, email, password, password2
				})
			}else {
				
				bcrypt.hash(req.body.password, 10).then((hash)=> {
					const user = new User({
						name,
						email,
						password:hash
					});
					console.log('the user is',user)
					user.save().then(
						()=>{
							req.flash('success','your now registered! login')
							res.redirect('/user/login')
						}).catch((error)=>{
							throw error
						})
				}).catch((error)=> {
					throw error
				})
			}
		})
	}
		
}

const signin = (req,res,next) => {
	passport.authenticate('local',{
		successRedirect : '/user/dashboard',
		failureRedirect: '/user/login',
		failureFlash : true
	})(req,res,next);
	console.log(req.flash)
		
}

const logout = (req,res)=> {
	req.logout();
	req.flash('sucess',"your are logged out");
	res.redirect('/user/login');
}

module.exports = {welcome,signup,login,register,signin,dashboard,logout}