const mongoose = require("mongoose");
const { Schema } = mongoose;
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const UserSchema = new Schema({
  first_name: {
    type: String,
    required: [true, "Please add a first name"],
  },
  last_name: {
    type: String,
    required: [true, "Please add a surname"],
  },
  email: {
    type: String,
    required: [true, "Please enter your covenant university email address"],
    unique: true,
    match: [
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Please use a valid email address",
    ],
  },
  password: {
    type: String,
    required: [true, "Please add a password"],
    minlength: 5,
    select: false,
  },
  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user",
  },

  resetPasswordToken: String,
  resetPasswordExpire: Date,
});

UserSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt(10);
  this.set("password", await bcrypt.hash(this.password, salt));
  next();
});

//Generating web token
UserSchema.methods.getSignedJwtToken = () => {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES,
  });
};

//Match User entered password to encrypted password in DB
UserSchema.methods.matchPassword = async function (loginPassword) {
  return await bcrypt.compare(loginPassword, this.password);
};

//Hide Password from being returned in User Object
UserSchema.methods.toJSON = function() {
  const obj = this.toObject();
  delete obj.password;
  return obj;
}

module.exports = mongoose.model("User", UserSchema);
