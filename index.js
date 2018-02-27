const fs = require('fs')
const path = require('path')
const express = require('express')
const resolve = file => path.resolve(__dirname, file)
const { createBundleRenderer } = require('vue-server-renderer')

const app = express()

function createRenderer(bundle, options) {
	return createBundleRenderer(bundle, Object.assign(options, {
		runInNewContext: false
	}))
}

const templatePath = resolve('./templates/index.tmpl.html');
const readyPromise = require('./build/server')(
	app,
	templatePath,
	(bundle, options) => {
		renderer = createRenderer(bundle, options)
	}
);

function render(req, res) {
	const s = Date.now();

	const handleError = err => {
		if (err.code === 404) {
			res.status(404).send('404 | Page Not Found');
		} else {
			res.status(500).send('500 | Internal Server Error');
			console.error(`error during render : ${req.url}`);
			console.error(err.stack);
		}
	}

	const context = {
		title: 'BDE VUE SSR',
		url: req.url
	};

	renderer.renderToString(context, (err, html) => {
		if (err) {
			return handleError(err)
		}
		res.send(html);
		console.log(`whole request: ${Date.now() - s}ms`);
	});
};

app.get('*', (req, res) => {
	readyPromise.then(() => render(req, res))
})

const port = process.env.PORT || 9090
app.listen(port, () => {
	console.log(`server started at localhost:${port}`)
})
