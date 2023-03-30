const express = require('express');
const router = express.Router();
const passport = require('passport');
const crypto = require('crypto');
const async = require('async');

const Party = require('../models/Party');
const {
	createParty,
	login,
	updateParty,
	deleteParty,
	changePassword
} = require('../Controllers/party');


router.get('/signup',(req,res)=>{
    res.render('signup');
})
router.get('/login',(req,res)=>{
    res.render('login');
})
router.get('/update',(req,res)=>{
    res.render('update');
})
router.get('/delete',deleteParty);



router.post('/signup',createParty);
router.post('/login',login);

router.put('/update',updateParty);



module.exports = router;