var mongoose = require("mongoose");

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

// Using the Schema constructor, create a new UserSchema object
var PlantSchema = new Schema({
  plantCategories: [String],
  plantClass: [String],
  commonName: String,
  variety: String,
  plantAttrURL: String,
  plantAttributes:
   { DaysToMaturity: String,
     Sun: String,
     Height: String,
     PlantingTime: String,
     Thin: String,
     LeafTexture: String,
     FruitSize: String,
     FruitWeight: String,
     FruitBearing: String,
     Type: String,
     Spread: String,
     SowMethod: String,
     SowTime: String,
     LifeCycle: String, },
  createdOn: { type: Date, default: Date.now }
});

// This creates our model from the above schema, using mongoose's model method
var Plant = mongoose.model("Plant", PlantSchema);

// Export the Plant model
module.exports = Plant;
