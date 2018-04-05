const express = require('express')
const path = require('path')
const bodyParser = require('body-parser');
'use strict'

const app = express()
app.use(bodyParser.json());
app.use(express.static('public'))

var list = ["Get milk", "Pick up paycheck", "Cash paycheck"]

app.get('/list', (req, res) => {
	res.send(list);
})

app.post('/item', (req, res) => {
	list.push (req.body.text);
	res.send({added: req.body.text});
})

app.listen(3000, () => console.log('Example app listening on port 3000!'))
