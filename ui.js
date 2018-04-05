
var root = document.body;

var data = {
	list: [],
	fetch: () => m.request('http://localhost:3000/list').then(list => data.list = list)
}

function sendItem () {
	m.request({
		method: 'POST',
		url: 'http://localhost:3000/item',
		data: {text: "XXX"}
	});
}

var Page = {
	oninit: data.fetch,
	view: () => {
		return m('main', [
			m('h1', 'Tennivalók'),
			m('div', [
				m('form', m('input', { type: 'text' })),
				m('button', {onclick: sendItem}, 'Hozzáad'),
				m('ul', data.list.map((item) => m('li', item)))
			])
		])
	}
}

m.mount(root, Page);