const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const SALT_ROUNDS = 10;

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  balance: {
    type: Number,
    default: 0,
    validate: (value) => value >= 0
  },

  expenses: {
    type: mongoose.Types.ObjectId,
    ref: 'Expense'
  }
});

userSchema.methods = {
  comparePassword: function (password) {
    return bcrypt.compare(password, this.password);
  }
};

userSchema.pre('save', function (next) {
  if (this.isModified('password')) {
    bcrypt.genSalt(SALT_ROUNDS, (err, salt) => {
      if (err) {
        next(err);
        return;
      }
      bcrypt.hash(this.password, salt, (err, hash) => {
        if (err) {
          next(err);
          return;
        }
        this.password = hash;
        next();
      });
    });
  }
});


module.exports = mongoose.model('User', userSchema);