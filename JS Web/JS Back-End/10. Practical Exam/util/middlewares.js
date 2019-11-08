const jwt = require('./jwt');
const config = require('../config/config');
const {
  userModel,
  tokenModel
} = require('../models');

const selectors = require('./selectors');

module.exports = {
  validateExpense: (req, res, next) => {
    const {
      merchant = null, price = null, category = null, description = null
    } = req.body;

    let validInput = true;
    let errors = [];

    if (merchant.length < 4) {
      validInput = false;
      errors.push({
        type: 'invalidMerchant',
        message: 'The provided merchant has to be a valid string longer than 4 characters'
      });
    }

    if (!selectors.categories[category]) {
      validInput = false;
      errors.push({
        type: 'invalidCategory',
        message: 'The selected category is invalid'
      });
    }

    if (!/[A-z0-9]{10,50}/.test(description)) {
      validInput = false;
      errors.push({
        type: 'invalidDescription',
        message: 'The provided description has to be a valid string'
      });
    }

    if (+price < 0) {
      validInput = false;
      errors.push({
        type: 'invalidPrice',
        message: 'The provided price is invalid'
      });
    }

    if (!validInput) {
      res.render('addExpense.hbs', {
        errors,
        merchant,
        category,
        price,
        description
      });
      return;
    }

    next();
    return;
  },
  validateLogin: (req, res, next) => {
    const {
      username,
      password
    } = req.body;
    let validInput = true;
    let errors = [];

    if (!/[A-z0-9]{5,}/.test(username)) {
      validInput = false;
      errors.push({
        type: 'invalidUsername',
        message: 'The provided username has to be at least 5 characters long and consist only from numbers and English alphabet characters'
      });
    }

    if (!/[A-z0-9]{5,}/g.test(password)) {
      validInput = false;
      errors.push({
        type: 'invalidPassword',
        message: 'The provided password has to be at least 5 characters long and consist only from numbers and English alphabet characters'
      });
    }

    let userQuery = userModel.findOne({
        username: username
      })
      .then(user => {}).catch(err => {
        if (!user) {
          validInput = false;
          errors.push({
            type: 'nonexistentUser',
            message: 'The provided username doesn\'t exist in the records'
          });
        }
      });

    if (!validInput) {
      res.render('login.hbs', {
        errors,
        username
      });
      return;
    }

    next();
    return;
  },
  validateRegister: (req, res, next) => {
    const {
      username,
      password,
      repeatPassword,
      balance
    } = req.body;
    let validInput = true;
    let errors = [];

    if (!/[A-z0-9]{4,}/.test(username)) {
      validInput = false;
      errors.push({
        type: 'invalidUsername',
        message: 'The provided username has to be at least 5 characters long and consist only from numbers and English alphabet characters'
      });
    }

    if (password.length < 8 || password === '') {
      validInput = false;
      errors.push({
        type: 'invalidPassword',
        message: 'The provided password has to be at least 8 characters long'
      });
    }

    if (repeatPassword.length < 8 || repeatPassword === '') {
      validInput = false;
      errors.push({
        type: 'invalidRepeatPassword',
        message: 'The provided repeated password has to be at least 8 characters long'
      });
    }

    if (password !== repeatPassword) {
      validInput = false;
      errors.push({
        type: 'nonMatchingPasswords',
        message: 'The provided passwords must match! (be the same)'
      });
    }

    if (balance < 0) {
      validInput = false;
      errors.push({
        type: 'negativeBalance',
        message: 'The provided balance must be greater than or equal to 0'
      });
    }

    let userQuery = userModel.findOne({
        username: username
      })
      .then(user => {
        if (user) {
          validInput = false;
          errors.push({
            type: 'usernameTaken',
            message: 'The provided username is already taken'
          });
        }
      })

    if (!validInput) {
      res.render('register.hbs', {
        errors,
        username,
        balance
      });
      return;
    }

    next();
    return;
  },
  authenticate: (redirect = true) => {
    return function (req, res, next) {
      const token = req.cookies[config.authCookie.name] || '';

      Promise.all([
          jwt.verifyToken(token),
          tokenModel.findOne({
            token
          })
        ])
        .then(([resData, blacklistedToken]) => {
          if (blacklistedToken) {
            return Promise.reject(new Error('Blacklisted token!'));
          }

          userModel.findById(resData.id)
            .then(user => {
              req.user = user;
              next();
            });
        })
        .catch(err => {
          if (!redirect) {
            next();
            return;
          }
          if ([
              'jwt must be provided',
              'blacklisted token',
              'jwt expired'
            ].includes(err.message)) {
            res.redirect('/login');
            return;
          }

          next(err);
        });
    }
  }
}