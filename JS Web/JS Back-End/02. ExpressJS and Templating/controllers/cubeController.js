const cubeModel = require('../models/cubeModel');

module.exports = {
  GET: {
    notFound: (req, res) => {
      res.render('404.hbs');
    },
    index: (req, res, next) => {
      const { from, to, search } = req.query;

      const findFn = item => {
        let result = true;

        if (search) {
          result = item.name.toLowerCase().includes(search);
        }

        if (result && from) {
          result = +item.difficultyLevel >= +from;
        }

        if (result && to) {
          result = +item.difficultyLevel <= +to;
        }

        return result;
      }

      cubeModel.find(findFn).then((cubes) => {
        res.render('index.hbs', { cubes, search, from, to });
      }).catch(next);
    },
    create: (req, res) => {
      res.render('create.hbs');
    },
    about: (req, res) => {
      res.render('about.hbs');
    },
    details: (req, res, next) => {
      const id = +req.params.id;

      cubeModel.getCubeById(id).then(cube => {
        if (!cube) { res.redirect('/not-found'); return; }

        res.render('details.hbs', { cube });
      }).catch(next);
    }
  },
  POST: {
    create: (req, res) => {
      const { name = null, description = null, imageUrl = null, difficultyLevel = null} = req.body;
      const newCubeEntity = cubeModel.create(name, description, imageUrl, difficultyLevel);
      cubeModel.insert(newCubeEntity).then(() => {
        res.redirect('/');
      });
    }
  }
};