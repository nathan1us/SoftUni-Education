const {
  cubeModel
} = require('../models/index');

module.exports = {
  GET: {
    notFound: (req, res) => {
      const user = req.user;
      res.render('404.hbs', {
        user
      });
    },
    index: (req, res, next) => {
      const {
        from,
        to,
        search
      } = req.query;
      const user = req.user;

      let query = {};

      if (search) {
        query = {
          ...query,
          name: {
            $regex: search
          }
        };
      }

      if (to) {
        query = {
          ...query,
          difficultyLevel: {
            $lte: +to
          }
        };
      }

      if (from) {
        query = {
          ...query,
          difficultyLevel: {
            ...query.difficultyLevel,
            $gte: +from
          }
        };
      }

      cubeModel.find(query).then((cubes) => {
        res.render('index.hbs', {
          user,
          cubes,
          search,
          from,
          to
        });
      }).catch(next);
    },
    create: (req, res) => {
      const user = req.user;

      const options = [{
          title: '1 - Very Easy',
          selected: true
        },
        {
          title: '2 - Easy',
          selected: false
        },
        {
          title: '3 - Medium (Standard 3x3)',
          selected: false
        },
        {
          title: '4 - Intermediate',
          selected: false
        },
        {
          title: '5 - Expert',
          selected: false
        },
        {
          title: '6 - Hardcore',
          selected: false
        },
      ];

      res.render('create.hbs', {
        user,
        options
      });
    },
    details: async (req, res, next) => {
      const id = req.params.id;
      const user = req.user;

      try {
        const cube = await cubeModel.findById(id).populate('accessories');

        if (!cube) {
          res.redirect('/not-found');
          return;
        }
        if (user)
          user.creator = cube.createdBy.toString() === user._id.toString() ? true : false;

        res.render('details.hbs', {
          cube,
          user
        });
      } catch (e) {
        next(e);
      }
    },
    edit: async (req, res, next) => {
      const id = req.params.id;
      const user = req.user;

      try {
        const cube = await cubeModel.findById(id).populate('accessories');
        if (!cube) {
          res.redirect('not-found');
          return;
        }

        if (user)
          user.creator = cube.createdBy.toString() === user._id.toString() ? true : false;
        if (!user.creator) {
          res.redirect('/');
          return;
        }

        const options = [{
            title: '1 - Very Easy',
            selected: 1 === cube.difficultyLevel
          },
          {
            title: '2 - Easy',
            selected: 2 === cube.difficultyLevel
          },
          {
            title: '3 - Medium (Standard 3x3)',
            selected: 3 === cube.difficultyLevel
          },
          {
            title: '4 - Intermediate',
            selected: 4 === cube.difficultyLevel
          },
          {
            title: '5 - Expert',
            selected: 5 === cube.difficultyLevel
          },
          {
            title: '6 - Hardcore',
            selected: 6 === cube.difficultyLevel
          },
        ];

        res.render('editCube.hbs', {
          cube,
          options,
          user
        });
      } catch (e) {
        next(e);
      }
    },
    delete: async (req, res, next) => {
      const id = req.params.id;
      const user = req.user;

      const cube = await cubeModel.findById(id).populate('accessories');
      if (!cube) {
        res.redirect('not-found');
        return;
      }

      if (user)
        user.creator = cube.createdBy.toString() === user._id.toString() ? true : false;
      if (!user.creator) {
        res.redirect('/');
        return;
      }

      const options = [{
          title: '1 - Very Easy',
          selected: 1 === cube.difficultyLevel
        },
        {
          title: '2 - Easy',
          selected: 2 === cube.difficultyLevel
        },
        {
          title: '3 - Medium (Standard 3x3)',
          selected: 3 === cube.difficultyLevel
        },
        {
          title: '4 - Intermediate',
          selected: 4 === cube.difficultyLevel
        },
        {
          title: '5 - Expert',
          selected: 5 === cube.difficultyLevel
        },
        {
          title: '6 - Hardcore',
          selected: 6 === cube.difficultyLevel
        },
      ];

      res.render('deleteCube.hbs', {
        cube,
        options,
        user
      });
    },
    about: (req, res) => {
      const user = req.user;

      res.render('about.hbs', {
        user
      });
    }
  },
  POST: {
    create: (req, res) => {
      const userId = req.user.id;
      const {
        name = null, description = null, imageUrl = null, difficultyLevel = null, createdBy = userId
      } = req.body;

      const options = [{
          title: '1 - Very Easy',
          selected: 1 === difficultyLevel
        },
        {
          title: '2 - Easy',
          selected: 2 === difficultyLevel
        },
        {
          title: '3 - Medium (Standard 3x3)',
          selected: 3 === difficultyLevel
        },
        {
          title: '4 - Intermediate',
          selected: 4 === difficultyLevel
        },
        {
          title: '5 - Expert',
          selected: 5 === difficultyLevel
        },
        {
          title: '6 - Hardcore',
          selected: 6 === difficultyLevel
        },
      ];

      if (!/[A-z0-9 ]{5,30}/g.test(name)) {
        res.render('create.hbs', {
          errors: {
            message: 'Name should be at least 5 characters long and must not contain only letters, digits and spaces!'
          },
          name,
          description,
          imageUrl,
          options
        });
        return;
      }

      if (!/[A-z0-9 ]{20,}/g.test(description)) {
        res.render('create.hbs', {
          errors: {
            message: 'Description should be at least 20 characters long and must not contain only letters, digits and spaces!'
          },
          name,
          description,
          imageUrl,
          options
        });
        return;
      }

      if (!/^(http|https):\/\//.test(imageUrl)) {
        res.render('create.hbs', {
          errors: {
            message: 'Please provide a valid URL for the image.'
          },
          name,
          description,
          imageUrl,
          options
        });
        return;
      }

      cubeModel.create({
        name,
        description,
        imageUrl,
        difficultyLevel,
        createdBy
      }).then((cube) => {
        res.redirect('/');
      });
    },
    edit: async (req, res) => {
      const id = req.params.id;
      const cube = await cubeModel.findById(id).populate('accessories');
      const user = req.user;

      const options = [{
          title: '1 - Very Easy',
          selected: 1 === cube.difficultyLevel
        },
        {
          title: '2 - Easy',
          selected: 2 === cube.difficultyLevel
        },
        {
          title: '3 - Medium (Standard 3x3)',
          selected: 3 === cube.difficultyLevel
        },
        {
          title: '4 - Intermediate',
          selected: 4 === cube.difficultyLevel
        },
        {
          title: '5 - Expert',
          selected: 5 === cube.difficultyLevel
        },
        {
          title: '6 - Hardcore',
          selected: 6 === cube.difficultyLevel
        },
      ];

      const {
        name = null, description = null, imageUrl = null, difficultyLevel = null
      } = req.body;

      if (!/[A-z0-9 ]{5,30}/g.test(name)) {
        res.render('editCube.hbs', {
          errors: {
            message: 'Name should be at least 5 characters long and must contain only letters, digits and spaces!'
          },
          cube,
          options,
          user
        });
        return;
      }

      if (!/[A-z0-9 ]{20,}/g.test(description)) {
        res.render('editCube.hbs', {
          errors: {
            message: 'Description should be at least 20 characters long and must contain only letters, digits and spaces!'
          },
          cube,
          options,
          user
        });
        return;
      }

      if (!/^(http|https):\/\//.test(imageUrl)) {
        res.render('editCube.hbs', {
          errors: {
            message: 'Please provide a valid URL for the image.'
          },
          cube,
          options,
          user
        });
        return;
      }

      cubeModel.updateOne({
          _id: id
        }, {
          name,
          description,
          imageUrl,
          difficultyLevel
        })
        .then(cube => {
          res.redirect('/');
        });
    },
    delete: (req, res) => {
      const id = req.params.id;
      const user = req.user;

      cubeModel.deleteOne({
          _id: id,
          createdBy: user._id
        })
        .then(() => {
          res.redirect('/');
        });
    }
  }
};