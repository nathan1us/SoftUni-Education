const {
  entityModel,
  userModel
} = require('../models');

const {
  selectors
} = require('../util');

module.exports = {
  GET: {
    notFound: (req, res) => {
      const user = req.user;

      res.render('404.hbs', {
        user
      });
    },
    index: (req, res, next) => {
      const user = req.user;

      if (user) {
        entityModel.find({
            createdBy: user._id
          })
          .then((entities) => {
            res.render('index-guest.hbs', {
              user,
              entities
            });
          }).catch(next);
      } else {
        res.render('index-guest.hbs');
        return;
      }
    },
    about: (req, res) => {
      const user = req.user;

      res.render('about.hbs', {
        user
      });
    }
  },
  POST: {
    index: (req, res, next) => {
      const {
        salary = null
      } = req.body;
      const user = req.user;

      let errors = [];
      let validInput = true;

      userModel.updateOne({
          _id: user._id
        }, {
          balance: user.balance += +salary
        })
        .then(user => {
          res.redirect('/');
        });

    }
  }
};