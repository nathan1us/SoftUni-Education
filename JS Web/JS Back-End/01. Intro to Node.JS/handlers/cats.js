const url = require('url'),
    fs = require('fs'),
    path = require('path'),
    qs = require('querystring'),
    formidable = require('formidable'),
    moveFile = require('move-file');

module.exports = (req, res) => {
    const reqPath = url.parse(req.url).pathname;

    if (reqPath === '/cats/newCat' && req.method === 'GET') {
        const filePath = path.normalize(
            path.join(__dirname, '../views/cats/addCat.html')
        );

        fs.readFile(filePath, (err, data) => {
            if (err) {
                console.log(`Error: ${err}`);

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

            // Using a promise because breed-fetching is asynchronous
            // Information would be received after the page has been shown which results in the <select> being empty
            fetchBreeds().then((breeds) => {
                let breedsPlaceholder = breeds.map((breed) => `<option value="${breed}">${breed}</option>`);
                let finalData = data.toString().replace('{{catBreeds}}', breedsPlaceholder);

                res.write(finalData);
                res.end();
            })
        });
    } else if (reqPath === '/cats/newCat' && req.method === 'POST') {
        let form = new formidable.IncomingForm();

        form.parse(req, (err, fields, files) => {
            if (err) {
                res.writeHead(500, {
                    'Content-Type': 'text/plain'
                });

                res.write(`An error has occured. (${err.code})`);
                res.end();

                throw err;
            }

            let catsAmount = 0;

            fetchCats().then((cats) => {
                catsAmount = cats.length;

                let oldFilePath = files.upload.path;
                let newFilePath = path.normalize(
                    path.join(__dirname, `../uploads/images/${catsAmount + 1}/${files.upload.name}`)
                );

                (async () => {
                    await moveFile(oldFilePath, newFilePath);

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
                        catsDB.push({ id: cats.length + 1, ...fields, image: files.upload.name });
                        let parsedCatsDB = JSON.stringify(catsDB);

                        fs.writeFile('./data/cats.json', parsedCatsDB, () => {
                            res.writeHead(302, {
                                'Location': '/'
                            });
                            res.end();
                        });
                    });
                })();
            });
        });
    } else if (reqPath.includes('/cats/edit') && req.method === 'GET') {
        const filePath = path.normalize(
            path.join(__dirname, '../views/cats/editCat.html')
        );

        fs.readFile(filePath, (err, data) => {
            if (err) {
                console.log(`Error: ${err}`);

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

            fs.readFile('./data/cats.json', (err, catsData) => {
                if (reqPath[reqPath.length - 1] !== '/') {
                    let splitUrl = reqPath.split('/');
                    let catId = Number(splitUrl[splitUrl.length - 1]);


                    fetchBreeds().then((breeds) => {
                        let catsDB = JSON.parse(catsData);
                        let catObject = catsDB.find(catElem => {
                            return catElem.id === catId;
                        });

                        data = data.toString().replace('{{id}}', catId);
                        data = data.replace('{{catName}}', catObject.name);
                        data = data.replace('{{catDescription}}', catObject.description);
                        data = data.replace('{{catBreed}}', catObject.breed);

                        let breedsPlaceholder = breeds.map((breed) => breed === catObject.breed ?
                            `<option selected value="${breed}">${breed}</option>` :
                            `<option value="${breed}">${breed}</option>`);
                        let finalData = data.replace('{{catBreeds}}', breedsPlaceholder);

                        res.write(finalData);
                        res.end();
                    });
                }
            });
        });
    } else if (reqPath.includes('/cats/edit') && req.method === 'POST') {
        let form = new formidable.IncomingForm();

        form.parse(req, (err, fields, files) => {
            if (err) {
                res.writeHead(500, {
                    'Content-Type': 'text/plain'
                });

                res.write(`An error has occured. (${err.code})`);
                res.end();

                throw err;
            }

            fs.readFile('./data/cats.json', (err, data) => {
                if (err) {
                    res.writeHead(500, {
                        'Content-Type': 'text/plain'
                    });

                    res.write(`An error has occured. (${err.code})`);
                    res.end();

                    throw err;
                }

                if (reqPath[reqPath.length - 1] !== '/') {
                    let splitUrl = reqPath.split('/');
                    let catId = Number(splitUrl[splitUrl.length - 1]);

                    let catsDB = JSON.parse(data);

                    let oldCat = catsDB.find(obj => obj.id === catId);
                    let oldCatIndex = catsDB.indexOf(oldCat)
                    let newCat = { id: catId, ...fields, image: `${files.upload.size === 0 ? oldCat.image : files.upload.name}` };

                    catsDB[oldCatIndex] = newCat;
                    let parsedCatsDB = JSON.stringify(catsDB);

                    (async () => {
                        if (files.upload.size !== 0) {
                            let oldFilePath = files.upload.path;
                            let newFilePath = path.normalize(
                                path.join(__dirname, `../uploads/images/${newCat.id}/${files.upload.name}`)
                            );

                            await moveFile(oldFilePath, newFilePath);
                        }

                        fs.writeFile('./data/cats.json', parsedCatsDB, () => {
                            res.writeHead(302, {
                                'Location': '/'
                            });
                            res.end();
                        });
                    })();
                }
            });

        });
    } else if (reqPath.includes('/cats/adopt') && req.method === 'GET') {
        const filePath = path.normalize(
            path.join(__dirname, '../views/cats/adoptCat.html')
        );

        fs.readFile(filePath, (err, data) => {
            if (err) {
                console.log(`Error: ${err}`);

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

            fs.readFile('./data/cats.json', (err, catsData) => {
                if (reqPath[reqPath.length - 1] !== '/') {
                    let splitUrl = reqPath.split('/');
                    let catId = splitUrl[splitUrl.length - 1];

                    let catsDB = JSON.parse(catsData);
                    let catObject = catsDB.find(catElem => {
                        return catElem.id == catId;
                    });

                    if (catObject) {
                        // Using custom prototypes for the sake of less c+p and not creating useless handles
                        data = data.toString().replaceAll('{{id}}', catId);
                        data = data.replaceAll('{{catImage}}', catObject.image);
                        data = data.replaceAll('{{catName}}', catObject.name);
                        data = data.replaceAll('{{catDescription}}', catObject.description);
                        data = data.replaceAll('{{catBreed}}', catObject.breed);
                    }
                }

                res.write(data);
                res.end();
            });
        });
    } else if (reqPath.includes('/cats/adopt') && req.method === 'POST') {
        let form = new formidable.IncomingForm();

        form.parse(req, (err, fields, files) => {
            if (err) {
                res.writeHead(500, {
                    'Content-Type': 'text/plain'
                });

                res.write(`An error has occured. (${err.code})`);
                res.end();

                throw err;
            }

            fs.readFile('./data/cats.json', (err, data) => {
                if (err) {
                    res.writeHead(500, {
                        'Content-Type': 'text/plain'
                    });

                    res.write(`An error has occured. (${err.code})`);
                    res.end();

                    throw err;
                }

                if (reqPath[reqPath.length - 1] !== '/') {
                    let splitUrl = reqPath.split('/');
                    let catId = Number(splitUrl[splitUrl.length - 1]);

                    let catsDB = JSON.parse(data);

                    catsDB = catsDB.filter(obj => obj.id !== catId);

                    let parsedCatsDB = JSON.stringify(catsDB);

                    fs.writeFile('./data/cats.json', parsedCatsDB, () => {
                        rmrfDirectory(`./uploads/images/${catId}`, true);

                        res.writeHead(302, {
                            'Location': '/'
                        });
                        res.end();
                    });
                }
            });
        });
    } else if (reqPath === '/cats/newBreed' && req.method === 'GET') {
        const filePath = path.normalize(
            path.join(__dirname, '../views/cats/addBreed.html')
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

            res.write(data);
            res.end();
        });
    } else if (reqPath === '/cats/newBreed' && req.method === 'POST') {
        let queryData = '';

        req.on('data', function (data) {
            queryData += data;

            if (queryData.length > 1e6) {
                queryData = '';

                res.writeHead(413, {
                    'Content-Type': 'text/plain'
                });

                res.write('The request data entity was too large.');
                res.end();
                req.connection.destroy();
            }
        });

        req.on('end', () => {
            req.post = qs.parse(queryData);
            const newBreed = req.post.breed;

            fs.readFile('./data/breeds.json', (err, data) => {
                if (err) {
                    res.writeHead(500, {
                        'Content-Type': 'text/plain'
                    });

                    res.write(`An error has occured. (${err.code})`);
                    res.end();

                    throw err;
                }

                let breedsDB = JSON.parse(data);
                breedsDB.push(newBreed);
                let parsedBreeds = JSON.stringify(breedsDB);

                fs.writeFile('./data/breeds.json', parsedBreeds, () => {
                    res.writeHead(302, {
                        'Location': '/'
                    });
                    res.end();
                });
            });
        });
    } else if (reqPath === '/search' && req.method === 'POST') {
        const filePath = path.normalize(
            path.join(__dirname, '../views/home/index.html')
        );

        let form = new formidable.IncomingForm();

        form.parse(req, (err, fields, files) => {
            if (err) {
                res.writeHead(500, {
                    'Content-Type': 'text/plain'
                });

                res.write(`An error has occured. (${err.code})`);
                res.end();

                throw err;
            }

            let query = fields.query;

            fetchCats().then((cats) => {
                let queryCats = '';
                // Return all cats if there is no query (search field is empty)
                query !== '' ? queryCats = cats.filter(cat => cat.name.toLowerCase().includes(query.toLowerCase())) : queryCats = cats;

                queryCats = queryCats.map((cat) =>
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

                    let finalData = data.toString().replace('{{cats}}', queryCats);

                    res.write(finalData);
                    res.end();
                    return;
                });
            });
        });
    }
    else {
        return true;
    }
}

function fetchBreeds() {
    return new Promise((resolve, reject) => {
        fs.readFile('./data/breeds.json', (err, data) => {
            if (err) {
                reject(err);
            } else {
                let breedsDB = JSON.parse(data);
                resolve(breedsDB);
            }
        });
    });
}

function fetchCats() {
    return new Promise((resolve, reject) => {
        fs.readFile('./data/cats.json', (err, data) => {
            if (err) {
                reject(err);
            } else {
                let catsDB = JSON.parse(data);
                resolve(catsDB);
            }
        });
    });
}

function rmrfDirectory(dir) {
    let files;
    dir = dir + '/';

    try {
        files = fs.readdirSync(dir);
    } catch (e) {
        throw e;
    }

    // Recursively remove all files
    if (files.length > 0) {
        files.forEach(function (entry) {
            let entryPath = path.join(dir, entry)
            if (fs.statSync(entryPath).isDirectory()) {
                rmrfDirectory(entryPath);
            } else {
                fs.unlinkSync(entryPath);
            }
        });
    }

    // Remove directory
    fs.rmdirSync(dir);
}

String.prototype.replaceAll = function (search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};