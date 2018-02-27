require('dotenv').config();

const fs = require('fs');

const Vue = require('vue')
const server = require('express')();
const { createRenderer } = require('vue-server-renderer');
const renderer = createRenderer({
	template: fs.readFileSync('./templates/index.tmpl.html', 'utf-8')
});

const PORT = process.env.PORT || 9000;

server.get('*', (req, res) => {
	const app = new Vue({
		data: {
			url: req.url
		},
		template: `<div>The visited URL is: {{ url }}</div>`,
	});

	const context = {
		title: 'hello',
		meta: `
			<meta charset="utf-8">
			<meta http-equiv="x-ua-compatible" content="ie=edge">
        	<meta name="description" content="">
			<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
		`,
	};

	renderer.renderToString(app, context, (err, html) => {
		if (err) {
			res.status(500).end('Internal Server Error');
			return;
		}
		res.end(html);
	})
})

server.listen(PORT, () => {
	console.log(`Listening on port ${PORT}`);
});
