const env = process.env.NODE_ENV || 'development';

const cubeModel = require('./models/cubeModel');

global.__basedir = __dirname;

const config = require('./config/config')[env];
const app = require('express')();

require('./config/express')(app);
require('./config/routes')(app);

app.listen(config.port, console.log(`Listening on port ${config.port}! Now its up to you...`));

/* Used for debugging purposes
cubeModel.insert({ name: 'test1', description: 'description1'}).then(insertedCube => {
  console.log(insertedCube);

  return cubeModel.delete(insertedCube.id);
}).then((deletedCube) => {
  console.log('deleted cube', deletedCube);
  console.log('lastIndex should be 1 and we should not have any cubes');
});
*/
