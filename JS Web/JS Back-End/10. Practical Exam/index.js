const config = require('./config/config');
const app = require('express')();
const db = require('./config/database');

global.__basedir = __dirname;

db().then(() => {
  require('./config/express')(app);
  require('./config/routes')(app);

  // app.use(function (err, req, res, next) {
  //   const user = req.user;
  //   console.error(err);
  //   res.render('500.hbs', {
  //     errorMessage: err.message,
  //     user
  //   });
  // });
 
  app.listen(config.port, console.log(`Listening on port ${config.port}!`));
}).catch(err => {
  console.error(err);
});