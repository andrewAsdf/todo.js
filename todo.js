'use strict'
var express = require('express')
var path = require('path')
var bodyParser = require('body-parser');
var sqlite3 = require('sqlite3').verbose();

var app = express();
app.use(bodyParser.json());
app.use(express.static('public'))

var db = new sqlite3.Database(':memory:');

db.serialize(() => {
	var list = ["Get milk", "Pick up paycheck", "Cash paycheck"]

	db.run('CREATE TABLE todo (item TEXT NOT NULL)');

	var stmt = db.prepare("INSERT INTO todo VALUES (?)");
	for (let item of list) {
		stmt.run(item);
	}
	stmt.finalize();
})

function storeItem(item) {
	db.run('INSERT INTO todo VALUES ($item)', { $item: item });
}

app.get('/list', (req, res) => {
	db.all("SELECT item FROM todo", (err, list) => {
		res.send(list.map (item => item.item));
	});
})

app.post('/item', (req, res) => {
	storeItem(req.body.text)
	res.send({ added: req.body.text });
})

app.listen(3000, () => console.log('Example app listening on port 3000!'))
