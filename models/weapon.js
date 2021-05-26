var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var WeaponSchema = new Schema(
  {
    name: {type: String, required: true, minlength: 3, maxlength: 100},
    type: {type: String, required: true, minlength: 3, maxlength: 10},
    rarity: {type: Number, required: true, min: 4, max: 5},
    description: {type: String, required: true, minlength: 3, maxlength: 300},
    mainStat: {type: Number, required: true, min: 0, max: 9999},
    subStatType: {type: String, required: true, minlength: 3, maxlength: 10},
    subStatValue: {type: Number, required: true, min: 0, max: 9999},
  }
);

// Virtual for book's URL
WeaponSchema
.virtual('url')
.get(function () {
  return '/catalog/weapons/' + this.name;
});

//Export model
module.exports = mongoose.model('Weapon', WeaponSchema);
