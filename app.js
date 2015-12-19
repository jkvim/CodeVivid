const _ = require('lodash');
const app = require('koa')();
const Jade = require('koa-jade');
const bodyparser = require('koa-bodyparser');
const staticCache = require('koa-static-cache');
const logger = require('koa-logger');
const errorhandler = require('koa-errorhandler');
const session = require('koa-generic-session');
const MongoStore = require('koa-generic-session-mongo');
const flash = require('koa-flash');
const gzip = require('koa-gzip');
const scheme = require('koa-scheme');
const router = require('./router.js');
const config = require('config-lite');
const pkg = require('./package');
const component = require('./build/bundle.js');

app.keys = [pkg.name];
const jade = new Jade({
	viewPath: './views',
	helperPath: [
		{render: require('react-dom/server').renderToString},
	] 
});

// errorhandler 放最上面
app.use(errorhandler());
app.use(bodyparser());
app.use(staticCache(config.staticPath, config.staticOption));
app.use(logger());
app.use(session({store: new MongoStore(config.mongodb)}));
app.use(flash());
app.use(scheme(config.schemeConf));
app.use(gzip());
app.use(function *(next) {
	_.assign(jade.locals,
					 {'session': this.session},
					 {'flash': this.flash},
					 {'safeStringify': safeStringify},
					 component);
	yield next;
})
app.use(jade.middleware);
app.use(router.routes());

if (require.main !== module) {
	module.exports = app.callback();
} else {
	app.listen(config.port, function () {
		console.log('Server listening on http://localhost:' +config.port);
	});
}

function safeStringify(obj) {
	if (obj) {
		return JSON.stringify(obj).replace(/\//g, '\\\/');
	}
}
