var mongoose = require("mongoose");

var babySchema = new mongoose.Schema({
    name: String,
    bornDate: Date,
    gender: Boolean,
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    heightMeasurements: [
      {
        height: Number,
        date: Date
      }
    ],
    weightMeasurements: [
      {
        weight: Number,
        date: Date
      }
    ]
});

module.exports = mongoose.model("Baby", babySchema);
