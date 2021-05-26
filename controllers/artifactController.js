var Arti = require('../models/weapon');
var async = require('async');
var mongoose = require('mongoose');
const { body,validationResult } = require("express-validator");

// Display list of all Char.
exports.artifact_list = function(req, res, next) {
    Arti.find()
        .sort([['rarity','ascending']])
        .exec(function (err, list_artifacts){
            if (err) {return next(err);}
            
            res.render('artifact_list', { title: 'Artifact List', artifact_list:list_artifacts});
        });

        
};

exports.artifact_detail = function(req, res, next) {

    async.parallel({
        artifact: function(callback) {
            Weap.findOne({ name: req.params.name })
              .exec(callback)
        },
    }, function(err, results) {
        if (err) { return next(err); } // Error in API usage.
        if (results.artifact==null) { // No results.
            var err = new Error('artifact not found');
            err.status = 404;
            return next(err);
        }
        // Successful, so render.
        res.render('artifact_detail', { title: 'Artifact Detail', artifact: results.artifact} );
    });

};