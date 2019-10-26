const express = require('express');
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');
const path = require('path');
const cookieParser = require('cookie-parser');

const COOKIE_SECRET = 'VeryMegaUltraSecret';

module.exports = (app) => {
    // Cookie parser
    app.use(cookieParser(COOKIE_SECRET));

    // Body parser
    app.use(bodyParser.urlencoded({
        extended: false
    }));

    // View engine
    app.engine('.hbs', handlebars({
        extname: 'hbs',
        defaultLayout: false,
        helpers: {
            inc: (value) => { return parseInt(value) + 1 }
        }
    }));
    app.set('views', path.resolve(__basedir, 'views'));

    //Static files
    app.use(express.static(path.resolve(__basedir, 'static')));
};