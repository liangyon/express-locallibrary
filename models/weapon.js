var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var WeaponSchema = new Schema(
  {
    name: {type: String, required: true, minlength: 0, maxlength: 100},
    type: {type: String, required: true, minlength: 0, maxlength: 10},
    rarity: {type: Number, required: true, min: 0, max: 5},
    description: {type: String, required: true, minlength: 0, maxlength: 1000},
    baseAtk: {type: Number, required: true, min: 0, max: 9999},
    subStatType: {type: String, required: true, minlength: 0, maxlength: 30},
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
