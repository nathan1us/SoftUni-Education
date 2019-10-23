const { cubeController, accessoryController } = require('../controllers');

module.exports = (app) => {
    app.get('/', cubeController.GET.index);

    app.get('/create', cubeController.GET.create)
        .post('/create', cubeController.POST.create);
    app.get('/details/:id', cubeController.GET.details);

    app.get('/create/accessory', accessoryController.GET.create)
        .post('/create/accessory', accessoryController.POST.create);

    app.get('/attach/:id', accessoryController.GET.attach)
        .post('/attach/:id', accessoryController.POST.attach);

    
    app.get('/about', cubeController.GET.about);
    app.get('/not-found', cubeController.GET.notFound);
    app.get('*', cubeController.GET.notFound);
};