'use strict';

var m = require('mithril')

var root = document.body;

var todoData = {
	list: [],
	newItem: '',
	fetch: () => m.request('http://localhost:3000/list').then(list => todoData.list = list),
}

async function sendItem(item) {
	const data = await m.request({
		method: 'POST',
		url: 'http://localhost:3000/item',
		data: { text: item }
	});
	todoData.list.push(data.added);
}

function clearInput() {
	todoData.newItem = '';
}

function createInputElem() {
	return m('input', {
		type: 'text',
		oninput: m.withAttr("value", (item) => { todoData.newItem = item }),
		value: todoData.newItem
	})
}

function createButton () {
	return m('button', {
		onclick: async () => {
			if (todoData.newItem) {
				const item = todoData.newItem;
				todoData.newItem = '';
				try {
					await sendItem(item);
					clearInput();
				}
				catch (err) {
					console.error(err);
				}
			}
		}
	}, 'Hozzáad')
}

var Page = {
	oninit: todoData.fetch,
	view: () => {
		return m('main', [
			m('h1', 'Tennivalók'),
			m('form', createInputElem()),
			createButton (),
			m('ul', todoData.list.map((item) => m('li', item)))
		])
	}
}

m.mount(root, Page);
