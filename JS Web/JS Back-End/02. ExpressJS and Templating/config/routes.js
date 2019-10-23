// TODO: Require Controllers...
const cubeController = require('../controllers/cubeController');

module.exports = (app) => {
    app.get('/', cubeController.GET.index);

    app.get('/create', cubeController.GET.create)
        .post('/create', cubeController.POST.create);
    app.get('/details/:id', cubeController.GET.details);

    
    app.get('/about', cubeController.GET.about);
    app.get('/not-found', cubeController.GET.notFound);
    app.get('*', cubeController.GET.notFound);
};