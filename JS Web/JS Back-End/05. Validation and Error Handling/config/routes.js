const { cubeController, accessoryController, userController } = require('../controllers');
const { authenticate } = require('../util');

module.exports = (app) => {
    app.get('/', authenticate(false), cubeController.GET.index);

    app.get('/login', userController.GET.login)
        .post('/login', userController.POST.login);

    app.get('/register', userController.GET.register)
        .post('/register', userController.POST.register);

    app.get('/logout', userController.POST.logout);

    app.get('/create', authenticate(), cubeController.GET.create)
        .post('/create', authenticate(), cubeController.POST.create);
    app.get('/details/:id', authenticate(false), cubeController.GET.details);

    app.get('/create/accessory', authenticate(), accessoryController.GET.create)
        .post('/create/accessory', authenticate(), accessoryController.POST.create);

    app.get('/edit/:id', authenticate(), cubeController.GET.edit)
        .post('/edit/:id', authenticate(), cubeController.POST.edit);

    app.get('/delete/:id', authenticate(), cubeController.GET.delete)
        .post('/delete/:id', authenticate(), cubeController.POST.delete);

    app.get('/attach/:id', authenticate(), accessoryController.GET.attach)
        .post('/attach/:id', authenticate(), accessoryController.POST.attach);

    
    app.get('/about', authenticate(false), cubeController.GET.about);
    app.get('/not-found', authenticate(false), cubeController.GET.notFound);
    app.get('*', authenticate(false), cubeController.GET.notFound);
};