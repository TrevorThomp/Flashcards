const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema ({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  }
})

// bcrypt hash password
userSchema.pre('save', function(next) {
  const user = this;
  bcrypt.hash(user.password, 10, function(err,hash) {
    if (err) {
      return next(err)
    }
    user.password = hash;
    next();
  })
})

const User = mongoose.model('User', userSchema);
module.exports = User;
