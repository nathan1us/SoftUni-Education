const {
  userModel,
  tokenModel,
  entityModel
} = require('../models');

const util = require('../util/');
const config = require('../config/config');

module.exports = {
  GET: {
    login: (req, res) => {
      const user = req.user;
      if (user)
        res.redirect('/');
      else
        res.render('login.hbs');
    },
    register: (req, res) => {
      const user = req.user;
      if (user)
        res.redirect('/');
      else
      res.render('register.hbs');
    },
    logout: (req, res) => {
      const token = req.cookies[config.authCookie.name];

      tokenModel.create({
        token
      }).then(() => {
        res.clearCookie(config.authCookie.name).redirect('/');
      });
    },
    profile: (req, res) => {
      const user = req.user;
      user.totalAmount = 0;
      user.totalMerches = 0;

      entityModel.find({
          createdBy: user._id
        })
        .then(res => {
          res.forEach(e => {
            user.totalAmount += e.price;
            user.totalMerches += 1;
          })
        });

      res.render('profile.hbs', {
        user
      });
    }
  },
  POST: {
    login: (req, res) => {
      const {
        username,
        password
      } = req.body;

      userModel.findOne({
          username: {
            $regex: new RegExp(username, "i")
          }
        })
        .then(user => {

          return Promise.all([user, user.comparePassword(password)]);
        })
        .then(([user, match]) => {
          if (!match) {
            let errors = [];
            errors.push({
              type: 'wrongCredentials',
              message: 'You have entered wrong credentials'
            })
            res.render('login.hbs', {
              errors
            });
            return;
          }

          const token = util.jwt.createToken({
            id: user._id
          });
          res.cookie(config.authCookie.name, token).redirect('/');
        })
        .catch(err => {
          let errors = [];
          errors.push({
            type: 'nonexistentUser',
            message: 'The provided username doesn\'t exist in the records'
          });
          res.render('login.hbs', {
            errors
          });

          return;
        });
    },
    register: (req, res, next) => {
      const {
        username,
        password,
        repeatPassword,
        balance
      } = req.body;

      if (password !== repeatPassword) {
        res.render('register.hbs', {
          errors: {
            message: 'Passwords must match!'
          }
        });
        return;
      }

      return userModel.create({
        username,
        password,
        balance
      }).then(() => {
        res.redirect('/login');
      }).catch(err => {
        if (err.name === 'MongoError' && err.code === 11000) {
          res.render('register.hbs', {
            errors: {
              message: 'An error occurred on the server! Please try to register once again.'
            }
          });
          return;
        }
        next(err);
      });
    }
  }
};