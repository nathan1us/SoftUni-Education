require('dotenv').config();

const { PORT } = process.env;
const http = require('http'),
    handlers = require('./handlers');

http.createServer((req, res) => {
    for (let handler of handlers) {
        if (!handler(req, res)) {
            break;
        }
    }
}).listen(PORT);

process.on('uncaughtException', function (err) {
    console.log('Caught exception: ', err);
});

console.log(`App running on port ${PORT}!`);