const express = require('express');
const schedule = require('node-schedule');
const app = express();

const path = require('path');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const userRoutes = require('./routes/route');
const User = require('./models/Party');
app.use((req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT');
	res.setHeader('Access-Control-Allow-Headers', 'content-type');
	next();
});
app.use(express.json());
app.use(
	session({
		secret: 'screte key',
		resave: false,
		saveUninitialized: true,
	})
);

app.use(passport.session());
app.use(passport.initialize());
passport.use(
	new LocalStrategy({ usernameField: 'email' }, User.authenticate())
);
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(bodyParser.urlencoded({ extended: true }));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static('public'));

app.use(userRoutes);

dotenv.config({ path: './config/config.env' });

// Connecting to data base
const connectToDataBase = async () => {
	const c = await mongoose.connect(process.env.DB_CONNECTION, {});
	console.log('Database connected ', c.connection.host);
};

// Starting server
app.listen(
	process.env.PORT,
	console.log(`server started at port ${process.env.PORT}`)
);

connectToDataBase();
