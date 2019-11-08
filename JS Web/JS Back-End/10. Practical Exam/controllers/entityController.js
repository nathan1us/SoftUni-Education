const {
  entityModel,
  userModel
} = require('../models');

const util = require('../util/');
const config = require('../config/config');

module.exports = {
  GET: {
    create: (req, res) => {
      const user = req.user;

      res.render('addExpense.hbs', {
        user
      });
    },
    details: async (req, res) => {
      const user = req.user;
      const entityId = req.params.id;

      try {
        const entity = await entityModel.findById(entityId);

        if (!entity) {
          res.redirect('/404');
          return;
        }
        if (user)
          user.creator = entity.createdBy.toString() === user._id.toString() ? true : false;

        res.render('details.hbs', {
          entity,
          user
        });
      } catch (e) {
        next(e);
      }
    }
  },
  POST: {
    create: (req, res) => {
      const user = req.user;
      const userId = user.id;
      let {
        merchant = null, price = null, vault = null, category = null, description = null, report = null, createdBy = userId
      } = req.body;

      report = report === 'on' ? true : false;

      entityModel.create({
        merchant,
        price,
        vault,
        category,
        description,
        report,
        createdBy
      }).then((entity) => {
        user.balance -= price;

        userModel.updateOne({
          _id: user._id
        }, {
          balance: user.balance <= 0 ? 0 : user.balance 
        })
        .then(user => {
          res.redirect('/');
        });
      });
    },
    delete: async (req, res) => {
      const id = req.params.id;
      const user = req.user;

      entityModel.deleteOne({
          _id: id,
          createdBy: user._id
        })
        .then(() => {
          res.redirect('/');
        });
    }
  }
};