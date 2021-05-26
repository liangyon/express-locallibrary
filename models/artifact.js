var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var ArtifactSchema = new Schema(
  {
    name: {type: String, required: true, minlength: 3, maxlength: 100},
    effect2: {type: String, required: true, minlength: 3, maxlength: 300},
    effect4: {type: String, required: true, minlength: 3, maxlength: 300},
    rarity: {type: Number, required: true, min: 4, max: 5},
  }
);

// Virtual for book's URL
ArtifactSchema
.virtual('url')
.get(function () {
  return '/catalog/artifacts/' + this.name;
});

//Export model
module.exports = mongoose.model('Artifact', ArtifactSchema);