const express = require('express');
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');
const path = require('path');

module.exports = (app) => {
    // Body parser
    app.use(bodyParser.urlencoded({
        extended: false
    }));

    // View engine
    app.engine('.hbs', handlebars({
        extname: 'hbs',
        defaultLayout: false
    }));
    app.set('views', path.resolve(__basedir, 'views'));

    //Static files
    app.use(express.static(path.resolve(__basedir, 'static')));

};