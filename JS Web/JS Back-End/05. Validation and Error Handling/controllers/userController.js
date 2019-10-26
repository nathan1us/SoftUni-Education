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

      if (!/[A-z0-9]{5,20}/.test(username)) {
        res.render('login.hbs', {
          errors: {
            message: 'Username should consist only English letters and digits and be at least 5 characters long!'
          }
        });
        return;
      }

      // very bad idea to have english characters and numbers only
      // but I'm not the one making the workshop requirements ¯\_(ツ)_/¯
      if (!/[A-z0-9]{8,100}/g.test(password)) {
        res.render('login.hbs', {
          errors: {
            message: 'Password should consist only English letters and digits and be at least 8 characters long!'
          }
        });
        return;
      }

      userModel.findOne({
          username
        })
        .then(user => {
          if (!user) {
            res.render('login.hbs', {
              errors: {
                message: 'The username you entered doesn\'t exist!'
              }
            });

            return;
          } 

          return Promise.all([user, user.comparePassword(password)]);
        })
        .then(([user, match]) => {
          if (!match) {
            res.render('login.hbs', {
              errors: {
                message: 'The credentials you have entered are incorrect!'
              }
            });
            return;
          }

          const token = util.jwt.createToken({
            id: user._id
          });
          res.cookie(config.authCookie.name, token).redirect('/');
        });
    },
    register: (req, res, next) => {
      const {
        username,
        password,
        repeatPassword
      } = req.body;

      if (!/[A-z0-9]{5,20}/.test(username)) {
        res.render('register.hbs', {
          errors: {
            message: 'Username should consist only English letters and digits and be at least 5 characters long!'
          }
        });
        return;
      }

      // very bad idea to have english characters and numbers only
      // but I'm not the one making the workshop requirements ¯\_(ツ)_/¯
      if (!/[A-z0-9]{8,100}/g.test(password)) {
        res.render('register.hbs', {
          errors: {
            message: 'Password should consist only English letters and digits and be at least 8 characters long!'
          }
        });
        return;
      }

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
        password
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
    },
    logout: (req, res) => {
      console.log(req.cookies);
      const token = req.cookies[config.authCookie.name];

      tokenModel.create({
        token
      }).then(() => {
        res.clearCookie(config.authCookie.name).redirect('/');
      });
    }
  }
};