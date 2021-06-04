var async = require('async');
const { body ,validationResult } = require('express-validator');
var User = require('../models/user');
var mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const passport = require('passport')


exports.register_get = function(req, res, next){
    res.render('register');

};

//handle user creation
exports.register_post = [
    body('username', 'Username required').trim().isLength({ min: 4}).escape(),
    body('email', 'Email required').trim().isLength({ min: 4}).normalizeEmail().isEmail().escape(),
    body('password', 'Password required').trim().isLength({ min: 8}).escape(),
    body('password2', 'Password required').trim().isLength({ min: 8}).equals('password').escape(),

    (req, res, next) => {
        const errors = validationResult(req);

        //create a user object with parsed and sanitized data
        var user = new User(
            { 
                username: req.body.username,
                email: req.body.email,
                password: req.body.password 
            }
        )

        bcrypt.genSalt(10, function(err, salt){
            bcrypt.hash(user.password, salt, function(err, hash){
                if(err){
                    console.log(err);
                }
                user.password = hash;
            });
        });



        if (!errors.isEmpty()) {
            res.render('register',  { title: 'Create User', user: user, errors: errors.array()});
        }else {

            User.findOne({$or: [{email: req.body.email}, {username: req.body.username}] })
              .exec( function(err, found_user) {
                 if (err) { return next(err); }
      
                 if (found_user) {
                   // Genre exists, redirect to its detail page.
                    res.render('register',  { title: 'Register', user: user, errors: errors.array()});
                    return;
                }
                 else {
                   user.save(function (err) {
                     if (err) { return next(err); }
                     // Genre saved. Redirect to genre detail page.
                     res.redirect("/catalog");
                   });
      
                 }
      
               });
          }



    }


];


exports.login_get = function(req, res, next){
    res.render('login');

};

exports.login_post = [
    (req, res, next) => {
        passport.authenticate('local', {
            successRedirect:'/catalog',
            failureRedirect:'/users/login',
        })(req, res, next)
    }
]

exports.logout_get= function(req, res){
    req.logout();
    res.redirect('/catalog')
}
