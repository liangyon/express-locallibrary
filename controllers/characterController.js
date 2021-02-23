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

exports.character_detail = function(req, res, next) {

    async.parallel({
        character: function(callback) {
            Char.findOne({ _name: req.params._name })
              .exec(callback)
        },
    }, function(err, results) {
        if (err) { return next(err); } // Error in API usage.
        if (results.character==null) { // No results.
            var err = new Error('Character not found' + results.character);
            err.status = 404;
            return next(err);
        }
        // Successful, so render.
        res.render('character_detail', { title: 'Character Detail', character: results.character} );
    });

};