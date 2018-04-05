const express = require('express')
const path = require('path')
const bodyParser = require('body-parser');

const app = express()
app.use(bodyParser.urlencoded({ extended: true }));

list = ["Get milk", "Pick up paycheck", "Cash paycheck"]

app.get('/', (req, res) => res.sendFile(path.join (__dirname, 'index.html')))
app.get('/ui.js', (req, res) => res.sendFile(path.join (__dirname, 'ui.js')))

app.get('/list', (req, res) => {
	res.send(list);
})

app.post('/item', (req, res) => {
	list.push (req.body.text);
	res.send();
})

app.listen(3000, () => console.log('Example app listening on port 3000!'))
