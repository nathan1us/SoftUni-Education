const staticHandler = require('./static'),
    homeHandler = require('./home'),
    catsHandler = require('./cats');

module.exports = [staticHandler, homeHandler, catsHandler];