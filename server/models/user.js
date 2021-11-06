const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const saltRounds = 10;
const SECRET = "SUPERSECRETPASSWORD123";

const userSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    unique: 1
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  firstname: {
    type: String,
    required: true,
    maxlength: 20
  },
  lastname: {
    type: String,
    required: true,
    maxlength: 20
  },
  role: {
    type: Number,
    default: 0
  },
  token: {
    type: String
  },
});

// ------------jwt and hashing of the password-------------
//hash a password using bcrypt
userSchema.pre("save", function (next) {
  let user=this;
  if (user.isModified("password")) {
    bcrypt.genSalt(saltRounds, function (err, hash) {
      if (err) return next(err);
      bcrypt.hash(user.password, saltRounds, function (err, hash) {
        if (err) return next(err);
        user.password = hash;
        next();
      });
    });
  } else {
    next();
  }
});
//check a password
userSchema.methods.comparePassword = function (candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
    //isMatch is boolean
    if (err) return cb(err);
    cb(null, isMatch);
  });
};
//generate token
userSchema.methods.generateToken = function (cb) {
  let user=this;
  let token = jwt.sign(user._id.toHexString(), SECRET);
  //saving the token to our user
  user.token = token;
  user.save(function (err, user) {
    if (err) return cb(err);
    cb(null, user);
  });
};
//verifying if the signature is valid
userSchema.statics.findByToken = function (token, cb) {
  let user = this;
  jwt.verify(token, SECRET, function (err, decode) {
    user.findOne({ _id: decode, token: token }, function (err, user) {
      if (err) return cb(err);
      cb(null, user);
    });
  });
};
//deleting the token
userSchema.methods.deleteToken = function (token, cb) {
  let user=this;
  this.update({ $unset: { token: 1 } }, (err, user) => {
    if (err) return cb(err);
    cb(null, user);
  });
};

const User = mongoose.model("User", userSchema);
module.exports = { User };
