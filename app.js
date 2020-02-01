const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const flash = require('connect-flash');
const session = require('express-session')
const passport = require('passport');
const passportLocal = require('passport-local')
const app = express();

require('./config/passport')(passport);

//user routes
const user = require('./router/user')



mongoose.connect('mongodb://localhost:27017/traversy', {useNewUrlParser: true});
//express session
app.use(session({
	secret: "secretstringauth",
	resave: true,
	saveUninitialized: true,
	
}));



//body-parser middleware but in express
app.use(express.urlencoded({extended:false}));


//initializing passport
app.use(passport.initialize());
app.use(passport.session());

//connect flash
app.use(flash())

//global variables
app.use((req,res,next)=> {
	res.locals.sucess = req.flash('sucess');
	res.locals.error =  req.flash('error');
	res.locals.error_login =  req.flash('error_login');
	next();
})

app.use(expressLayouts)
app.set('view engine','ejs');


 app.use('/user',user)


app.listen(8000,(err)=> {
	if(err) {
		console.log('server not connected')
	}
		console.log('server good')
})