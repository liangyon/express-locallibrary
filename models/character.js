var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var CharacterSchema = new Schema(
  {
    name: {type: String, required: true, minlength: 3, maxlength: 100},
    element: {type: String, required: true, minlength: 3, maxlength: 10},
    weapon: {type: String, required: true, minlength: 3, maxlength: 10},
    rarity: {type: Number, required: true, min: 4, max: 5},
  }
);

// Virtual for book's URL
CharacterSchema
.virtual('url')
.get(function () {
  return '/catalog/characters/' + this.name;
});

//Export model
module.exports = mongoose.model('Character', CharacterSchema);
