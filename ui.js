
var root = document.body;

var todoData = {
	list: [],
	newItem: '',
	fetch: () => m.request('http://localhost:3000/list').then(list => todoData.list = list),
}

function sendItem() {
	m.request({
		method: 'POST',
		url: 'http://localhost:3000/item',
		data: { text: todoData.newItem }
	}).then((data) => {
		todoData.list.push(data.added)
	});
}

function clearInput() {
	todoData.newItem = ''
}

function getInputElem() {
	return m('input', {
		type: 'text',
		oninput: m.withAttr("value", (item) => { todoData.newItem = item }),
		value: todoData.newItem
	})
}

var Page = {
	oninit: todoData.fetch,
	view: () => {
		return m('main', [
			m('h1', 'Tennivalók'),
			m('div', [
				m('form', getInputElem()),
				m('button', { onclick: () => { sendItem(); clearInput() } }, 'Hozzáad'),
				m('ul', todoData.list.map((item) => m('li', item)))
			])
		])
	}
}

m.mount(root, Page);
