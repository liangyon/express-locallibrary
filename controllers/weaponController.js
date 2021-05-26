var Weap = require('../models/weapon');
var async = require('async');
var mongoose = require('mongoose');
const { body,validationResult } = require("express-validator");

// Display list of all Char.
exports.weapon_list = function(req, res, next) {
    Weap.find()
        .sort([['type','ascending']])
        .exec(function (err, list_weapons){
            if (err) {return next(err);}
            
            res.render('weapon_list', { title: 'Weapons List', weapon_list:list_weapons});
        });

        
};

exports.weapon_detail = function(req, res, next) {

    async.parallel({
        weapon: function(callback) {
            Weap.findOne({ name: req.params.name })
              .exec(callback)
        },
    }, function(err, results) {
        if (err) { return next(err); } // Error in API usage.
        if (results.weapon==null) { // No results.
            var err = new Error('weapon not found');
            err.status = 404;
            return next(err);
        }
        // Successful, so render.
        res.render('weapon_detail', { title: 'Weapon Detail', weapon: results.weapon} );
    });

};