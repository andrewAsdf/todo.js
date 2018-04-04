const express = require('express')
const path = require('path')

const app = express()

list = ["Get milk", "Pick up paycheck", "Cash paycheck"]

app.get('/', (req, res) => res.sendFile(path.join (__dirname, 'index.html')))

app.get('/list', (req, res) => {})

app.put('/item', (req, res) => {})

app.listen(3000, () => console.log('Example app listening on port 3000!'))
