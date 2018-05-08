var mongoose = require("mongoose");
var passportlocalmongoose = require("passport-local-mongoose");
var userSchema = new mongoose.Schema({
    username: String,
    password: String,
    name: String,
    lastname: String,
    babies: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Baby"
      }
    ]
});

userSchema.plugin(passportlocalmongoose);
module.exports = mongoose.model("User", userSchema);
