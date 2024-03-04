const { Schema, model } = require("mongoose");

const userScheme = new Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
});

module.exports = {
  UserModel: model("User", userScheme),
};
