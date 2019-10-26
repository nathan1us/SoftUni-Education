const {
  userModel,
  tokenModel
} = require('../models');

const util = require('../util/');
const config = require('../config/config');

module.exports = {
  GET: {
    login: (req, res) => {
      res.render('login.hbs');
    },
    register: (req, res) => {
      res.render('register.hbs');
    }
  },
  POST: {
    login: (req, res) => {
      const {
        username,
        password
      } = req.body;

      userModel.findOne({
          username
        })
        .then(user => Promise.all([user, user.comparePassword(password)]))
        .then(([user, match]) => {
          if (!match) {
            res.render('login.hbs', {
              errors: {
                wrongCredentials: 'The credentials you have entered are incorrect!'
              }
            });
            return;
          }

          const token = util.jwt.createToken({ id: user._id });
          res.cookie(config.authCookie.name, token).redirect('/');
        });
    },
    register: (req, res, next) => {
      const {
        username,
        password,
        repeatPassword
      } = req.body;

      if (password !== repeatPassword) {
        res.render('register.hbs', {
          errors: {
            repeatPassword: 'Passwords must match!'
          }
        });
      }
      
      return userModel.create({
        username,
        password
      }).then(() => {
        res.redirect('/login');
      }).catch(err => {
        if (err.name === 'MongoError' && err.code === 11000) {
          res.render('register.hbs', {
            errors: {
              username: 'Username already taken!'
            }
          });
          return;
        }
        next(err);
      });
    },
    logout: (req, res) => {
      console.log(req.cookies);
      const token = req.cookies[config.authCookie.name];

      tokenModel.create({ token }).then(() => {
        res.clearCookie(config.authCookie.name).redirect('/');
      });
    }
  }
};