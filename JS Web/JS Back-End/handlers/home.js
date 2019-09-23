const url = require('url'),
    fs = require('fs'),
    path = require('path'),
    cats = require('../data/cats');

module.exports = (req, res) => {
    const reqPath = url.parse(req.url).pathname;

    if (reqPath === '/' && req.method === 'GET') {
        const filePath = path.normalize(
            path.join(__dirname, '../views/home/index.html')
        );

        fs.readFile('./data/cats.json', (err, data) => {
            if (err) {
                res.writeHead(500, {
                    'Content-Type': 'text/plain'
                });

                res.write(`An error has occured. (${err.code})`);
                res.end();

                throw err;
            }
            let catsDB = JSON.parse(data);

            let modifiedCats = catsDB.map((cat) =>
                `<li>
                <img src="./uploads/images/${cat.id}/${cat.image}" alt="${cat.name}">
                <h3>${cat.name}</h3>
                <p><span>Breed: </span>${cat.breed}</p>
                <p><span>Description: </span>${cat.description}</p>
                <ul class="buttons">
                    <li class="btn edit"><a href="/cats/edit/${cat.id}">Change Info</a></li>
                    <li class="btn delete"><a href="/cats/adopt/${cat.id}">New Home</a></li>
                </ul>
            </li>`
            );

            fs.readFile(filePath, (err, data) => {
                if (err) {
                    if (err.code == 'ENOENT') {
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
                    return;
                }

                res.writeHead(200, {
                    'Content-Type': `text/html`
                });

                let finalData = data.toString().replace('{{cats}}', modifiedCats);

                res.write(finalData);
                res.end();
                return;
            });
        });
    } else {
        return true;
    }
};