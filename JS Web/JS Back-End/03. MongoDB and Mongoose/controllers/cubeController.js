const {
  cubeModel
} = require('../models/index');

module.exports = {
    GET: {
      notFound: (req, res) => {
        res.render('404.hbs');
      },
      index: (req, res, next) => {
        const { from, to, search } = req.query;
        let query = {};

        if (search) {
          query = { ...query, name: { $regex: search } };
        }

        if (to) {
          query = { ...query, difficultyLevel: { $lte: +to } };
        }

        if (from) {
          query = { ...query, difficultyLevel: { ...query.difficultyLevel, $gte: +from } };
        }
      
      cubeModel.find(query).then((cubes) => {
        res.render('index.hbs', {
          cubes, search, from, to
        });
      }).catch(next);
    },
    create: (req, res) => {
      res.render('create.hbs');
    },
    about: (req, res) => {
      res.render('about.hbs');
    },
    details: async (req, res, next) => {
      const id = req.params.id;
      try {
        const cube = await cubeModel.findById(id).populate('accessories');
        if (!cube) {
          res.redirect('/not-found');
          return;
        }

        res.render('details.hbs', {
          cube
        });
      } catch (e) {
        next(e);
      }
    }
  },
  POST: {
    create: (req, res) => {
      const {
        name = null, description = null, imageUrl = null, difficultyLevel = null
      } = req.body;

      cubeModel.create({
        name,
        description,
        imageUrl,
        difficultyLevel
      }).then((cube) => {
        res.redirect('/');
      });
    }
  }
};