const path = require('path');

module.exports = (reqPath) => {
    switch (path.extname(reqPath)) {
        case '.js':
            return 'application/javascript';
        case '.css':
            return 'text/css';
        case '.json':
            return 'application/json';
        case '.png':
            return 'image/png';
        case '.jpg':
            return 'image/jpeg';
        case '.jpeg':
            return 'image/jpeg';
        case '.ico':
            return 'image/x-icon';
        case '.wav':
            return 'audio/wav';
        default:
            return 'text/plain';
    }

    console.log('uwu')
}