const express = require('express');
const router = express.Router();
const passport= require('passport');
const {isLoggedIn, isNotLoggedIn} = require('../lib/auth');

router.get('/signup', isNotLoggedIn, async(req,res)=>{
   res.render('usuarios/signup')
})

router.post('/signup', isNotLoggedIn, passport.authenticate('localSignup', {
    successRedirect: '/eventos',
    failureRedirect: '/signup',
    failureFlash:true
}));

router.get('/signin', isNotLoggedIn, async (req,res)=>{
    res.render('usuarios/signin');
});

router.post('/signin', isNotLoggedIn,  async (req,res,next)=>{
    passport.authenticate('localSignin',{
        successRedirect: '/eventos',
        failureRedirect: '/signin',
        failureFlash:true
    })(req,res,next);
    
});

router.get('/logout', isLoggedIn, async (req,res)=>{
    req.logOut();
    res.redirect('/signin')
})

module.exports = router;