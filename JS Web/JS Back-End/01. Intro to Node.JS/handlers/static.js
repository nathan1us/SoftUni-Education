const url = require('url'),
    fs = require('fs'),
    getContentType = require('../modules/getContentType');

module.exports = (req, res) => {
    const reqPath = url.parse(req.url).pathname;

    if (reqPath.startsWith('/resources') && req.method === 'GET') {
        fs.readFile(`./${reqPath}`, 'utf-8', (err, data) => {
            if (err) {
                if (err.code === 'ENOENT') {
                    res.writeHead(404, {
                        'Content-Type': 'text/plain'
                    });

                    res.write('The requested resource was not found.');
                    res.end();
                } else {
                    res.writeHead(500, {
                        'Content-Type': 'text/plain'
                    });

                    res.write(`An error has occured. (${err.code})`);
                    res.end();
                }
            }

            res.writeHead(200, {
                'Content-Type': getContentType(reqPath)
            });

            res.write(data);
            res.end();
        });
    } else if (reqPath.startsWith('/uploads') && req.method === 'GET') {
        if (reqPath.endsWith('png') || reqPath.endsWith('jpg') || reqPath.endsWith('jpeg') || reqPath.endsWith('ico')) {
            fs.readFile(`./${reqPath}`, (err, data) => {
                if (err) {
                    if (err.code === 'ENOENT') {
                        res.writeHead(404, {
                            'Content-Type': 'text/plain'
                        });

                        res.write('The requested resource was not found.');
                        res.end();
                    } else {
                        res.writeHead(500, {
                            'Content-Type': 'text/plain'
                        });

                        res.write(`An error has occured. (${err.code})`);
                        res.end();
                    }
                }

                res.writeHead(200, {
                    'Content-Type': getContentType(reqPath)
                });

                res.write(data);
                res.end();
            });
        } else {
            fs.readFile(`./${reqPath}`, 'utf-8', (err, data) => {
                if (err) {
                    if (err.code === 'ENOENT') {
                        res.writeHead(404, {
                            'Content-Type': 'text/plain'
                        });

                        res.write('The requested resource was not found.');
                        res.end();
                    } else {
                        res.writeHead(500, {
                            'Content-Type': 'text/plain'
                        });

                        res.write(`An error has occured. (${err.code})`);
                        res.end();
                    }
                }

                res.writeHead(200, {
                    'Content-Type': getContentType(reqPath)
                });

                res.write(data);
                res.end();
            });
        }
    } else {
        return true;
    };
}