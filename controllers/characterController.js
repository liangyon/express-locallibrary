var Char = require('../models/character');
var async = require('async');
var mongoose = require('mongoose');
const { body,validationResult } = require("express-validator");

// Display list of all Char.
exports.character_list = function(req, res, next) {
    Char.find()
        .sort([['name','ascending']])
        .exec(function (err, list_characters){
            if (err) {return next(err);}
            
            res.render('character_list', { title: 'Characters List', character_list:list_characters});
        });

        
};
