const express = require('express');
const app = express();

const path = require('path');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const userRoutes = require('./routes/partyRoutes');
const User = require('./models/Partymodel');


mongoose.connect(process.env.DB_CONNECTION).then((ans) => {
    console.log("ConnectedSuccessful")
  }).catch((err) => {
    console.log(err)
  })

app.use(session({
    secret : 'screte key',
    resave : false,
    saveUninitialized : true
}));

app.use(passport.session());
app.use(passport.initialize());
passport.use(new LocalStrategy({usernameField : 'email'}, User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());



app.use(bodyParser.urlencoded({extended:true}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static('public'));

app.use(userRoutes);

app.listen(process.env.PORT, ()=> {
    console.log('Server is started');
});
