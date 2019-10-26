const jwt = require('./jwt');
const config = require('../config/config');
const {
  userModel,
  tokenModel
} = require('../models');

module.exports = function (redirect = true) {
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