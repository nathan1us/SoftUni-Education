const {
  entityController,
  userController,
  viewController
} = require('../controllers');
const {
  middlewares
} = require('../util');

module.exports = (app) => {
  // View controller
  app.get('/', middlewares.authenticate(false), viewController.GET.index)
    .post('/', middlewares.authenticate(), viewController.POST.index);
  app.get('/about', middlewares.authenticate(false), viewController.GET.about);

  // User controller

  app.get('/profile/:id', middlewares.authenticate(), userController.GET.profile);

  app.get('/login', middlewares.authenticate(false), userController.GET.login)
    .post('/login', middlewares.validateLogin, userController.POST.login);

  app.get('/register', middlewares.authenticate(false), userController.GET.register)
    .post('/register', middlewares.validateRegister, userController.POST.register);

  app.get('/logout', userController.GET.logout);

  // Entity controller

  app.get('/create', middlewares.authenticate(), entityController.GET.create)
    .post('/create', middlewares.authenticate(), entityController.POST.create);

  app.get('/details/:id', middlewares.authenticate(false), entityController.GET.details);


  app.get('/delete/:id', middlewares.authenticate(), entityController.POST.delete);

  app.get('/404', middlewares.authenticate(false), viewController.GET.notFound)
  .get('*', middlewares.authenticate(false), viewController.GET.notFound);
    
};