var mongoose = require("mongoose");

var foodSchema = new mongoose.Schema({
    name: String,
    category: String,
    texture: String,
    image: String,
    month: Number,
    calories: Number,
    servingSize: Number,
    servingMeasure: String,
    allergy: Boolean
});

module.exports = mongoose.model("Food", foodSchema);
