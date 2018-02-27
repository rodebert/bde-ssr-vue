const fs = require('fs');
const path = require('path');
const MFS = require('memory-fs');
const webpack = require('webpack');
const chokidar = require('chokidar');
const serverConfig = require('./webpack.server.config');

const readFile = (fs, file) => {
	try {
		return fs.readFileSync(path.join(serverConfig.output.path, file), 'utf-8')
	} catch (e) { }
}

module.exports = function setupDevServer(app, templatePath, cb) {
	let bundle;
	let ready;

	const readyPromise = new Promise(r => { ready = r });
	const update = () => {
		if (bundle) {
			ready();
			cb(bundle, { template });
		}
	};

	const template = fs.readFileSync(templatePath, 'utf-8');

	chokidar.watch(templatePath).on('change', () => {
		template = fs.readFileSync(templatePath, 'utf-8');
		console.log('index.html template updated.');
		update();
	})

	const serverCompiler = webpack(serverConfig);
	const mfs = new MFS();
	serverCompiler.outputFileSystem = mfs;
	serverCompiler.watch({}, (err, stats) => {
		if (err) throw err;
		stats = stats.toJson();
		if (stats.errors.length) return;
		bundle = JSON.parse(readFile(mfs, 'vue-ssr-server-bundle.json'));
		update();
	})

	return readyPromise;
};
