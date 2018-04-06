'use strict';
var Promise	= require('bluebird');
var express = require('express');
var bodyParser = require('body-parser');
var sqlite3 = require('sqlite3').verbose();

var app = express();
app.use(bodyParser.json());
app.use(express.static('public'));

var db = Promise.promisifyAll(new sqlite3.Database(':memory:'));

db.serialize(() => {
	var list = ["Get milk", "Pick up paycheck", "Cash paycheck"];

	db.run('CREATE TABLE todo (item TEXT NOT NULL)');

	var stmt = db.prepare("INSERT INTO todo VALUES (?)");
	for (let item of list) {
		stmt.run(item);
	}
	stmt.finalize();
});

async function storeItem(item) {
	await db.runAsync('INSERT INTO todo VALUES ($item)', { $item: item });
}

app.get('/list', async (req, res, next) => {
	try {
		const list = await db.allAsync('SELECT item FROM todo');
		res.send(list.map(item => item.item));
	}
	catch (err) {
		return next(err);
	}
});

app.post('/item', async (req, res, next) => {
	try {
		await storeItem(req.body.text);
		res.send({ added: req.body.text });
	}
	catch (err) {
		return next(err);
	}
});

app.listen(3000, () => console.log('Example app listening on port 3000!'));
