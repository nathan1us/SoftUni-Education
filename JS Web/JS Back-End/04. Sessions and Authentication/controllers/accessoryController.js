const { accessoryModel, cubeModel } = require('../models');

module.exports = {
  GET: {
    create: (req, res) => {
      const user = req.user;

      res.render('createAccessory.hbs', { user });
    },
    attach: (req, res, next) => {
      const { id: cubeId } = req.params;
      const user = req.user;

      cubeModel.findById(cubeId)
        .then(cube => Promise.all([cube, accessoryModel.find({ cubes: { $nin: cubeId } })])
        ).then(([cube, filteredAccessories]) => {
          res.render('attachAccessory.hbs', {
            cube,
            accessories: filteredAccessories.length > 0 ? filteredAccessories : null,
            user
          });
        });
    }
  },
  POST: {
    create: (req, res, next) => {
      const { name = null, description = null, imageUrl = null } = req.body;

      accessoryModel.create({ name, description, imageUrl })
        .then(created => { res.redirect('/'); })
        .catch(next);
    },
    attach: (req, res, next) => {
      const { id } = req.params;
      const { accessory: accessoryId } = req.body;

      Promise.all([ 
        cubeModel.updateOne({ _id: id}, { $push: { accessories: accessoryId } }),
        accessoryModel.updateOne({ _id: accessoryId }, { $push: { cubes: id } })
      ])
        .then(() => {
          res.redirect('/');
        })
        .catch(next);
    }
  }
};