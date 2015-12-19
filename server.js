'use strict';

const staticCache = require('koa-static-cache');
const escapeHtml = require('escape-html');
const Jade = require('koa-jade');
const router = require('koa-route');
const path = require('path');
const _ = require('lodash');
const koa = require('koa');
const app = koa();

const viewpath = path.join(__dirname, 'views');
const assetspath = path.join(__dirname, 'public');
const data = require('./test-data.js');

const jade = new Jade({
	viewPath: './views',
	helperPath: [
		{render: require('react-dom/server').renderToString},
	] 
});

// component
const component = require('./public/js/component/index.jsx');

app.use(staticCache(assetspath));
app.use(function *(next) {
	_.assign(jade.locals, {'session': ''}, component, {'safeStringify': safeStringify});
	yield next;
})
app.use(jade.middleware);

app.use(router.get('/', function *() {
	this.render('index', {
		cards: data.cards,
		page: 0,           // page应是url的参数
	});
}));

app.use(router.get('/login', function *() {
	this.render('login');
}));

app.use(router.get('/signup', function *() {
	this.render('signup');
}));

app.use(router.get('/publish', function *() {
	this.render('publish');
}));

app.use(router.get('/user/:id', function *() {
	this.render('user', {
		cards: data.cards,
		user: data.user
	});
}));

app.use(router.get('/works/:id', function *() {
	this.render('works', {
		works: data.works
	});
}));

app.listen(3000, function () {
	console.log('server linten on http://localhost:3000');
});

function safeStringify(obj) {
	if (obj) {
		return JSON.stringify(obj).replace(/\//g, '\\\/');
	}
}
