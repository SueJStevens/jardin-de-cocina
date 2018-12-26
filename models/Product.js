var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProductSchema = new Schema({

  plantCategory: String,
  commonName: String,
  plantAttributes: [{
    daysToMaturity: String,
    sun: String,
    height: String,
    plantingTime: String,
    thin: String,
    //leafTexture: String,
    fruitSize: String,
    spread: String,
    sowMethod: String,
    sowTime: String,
    lifeCycle: String
  }],
  createdOn: { type: Date, default: Date.now }
});

// This creates our model from the above schema, using mongoose's model method
var Product = mongoose.model("Product", ProductSchema);

// Expose (export) the model now ...
module.exports = Product;
