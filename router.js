var router = require('koa-router')();
var Models = require('./lib/core.js');
var _ = require('lodash');
var $User = Models.$User;
var $Works = Models.$Works;
var $Comment = Models.$Comment;

router.get('/', function *() {
	var works = yield $Works.getWorksByPage(1);
	var background = works[Math.floor(Math.random() * works.length)];
	this.render('index', {
		cards: works,
		page: 1,           // 首页默认page为1
		background: background,
	});
});

router.get('/page/:pageNum', function *() {
	var pageNum = this.params.pageNum
	var works = yield $Works.getWorksByPage(pageNum);
	var background = works[Math.floor(Math.random() * works.length)];

	this.render('index', {
		cards: works,
		page: pageNum,           
		background: background,
	});
});

router.get('/login', function *() {
	this.render('login');
});

router.post('/login', function *() {
	var data = this.request.body;
	var userInfo = yield $User.getUserByName(data.username);
	if (!userInfo || (userInfo.password !== data.password)) {
		this.flash = {error: '用户名或密码错误!'};
		return this.redirect('back');
	}

	this.session.user = {
		username: userInfo.username,
		email: userInfo.email
	}

	// 新用户或session过期从数据库获取
	if (!this.session.likedWorks) 
		this.session.likedWorks = userInfo.liked_works;

	this.flash = {success: '登录成功!'};
	this.redirect('/');
});

router.post('/signup', function *() {
	var data = this.request.body;
	var userExist = yield $User.getUserByName(data.username);
	if (userExist) {
		this.flash = {error: '用户名已存在!'};
		return this.redirect('back');
	}
	var user = yield $User.addUser(data);

	this.session.user = {
		username: data.username,
		email: data.email
	};

	// 新用户或session过期从数据库获取
	if (!this.session.likedWorks) 
		this.session.likedWorks = user.liked_works;

	this.flash = {success: '注册成功!'};
	this.redirect('/');
});

router.get('/signup', function *() {
	this.render('signup');
});

router.get('/publish', function *() {
	this.render('publish');
});

router.post('/publish', function *() {
	var data = this.request.body;
	var user = yield $User.getUserWorks(this.session.user.username);
	var hasWorks = _.find(user.works, {srcUrl: data.srcUrl});

	if (!hasWorks) {
		data._creator = user._id;
		data.user = {
			username: user.username,
			email: user.email
		}

		var newWorks = yield $Works.addWorks(data);
		var works = user.works.concat(newWorks._id);
		yield $User.saveWorks(user.username, works);
	}
	// 提交成功返回id
	this.body = newWorks._id;
	this.status = 200;
});

router.get('/user/:name', function *() {
	var user = yield $User.getUserWorks(this.params.name);
	this.render('user', {
		user: user
	});
});

router.del('/user/:name', function *() {
	var req = this.request.body;
	yield $Works.delWorks(req.id);
	this.status = 200;
});

router.get('/works/:id', function *() {
	var works = yield $Works.getWorksById(this.params.id);
	var isLiked = _.find(this.session.likedWorks, works._id);
	this.render('works', {
		works: works,
		isLiked: !!isLiked
	});
});

router.post('/works/:id/comments', function *() {
	var data = this.request.body;
	data.works_id = this.params.id;
	var comment = yield $Comment.addComment(data);
	this.body = comment;
	this.status = 200;
});

router.get('/works/:id/comments', function *() {
	var comments = yield $Comment.getCommentBytWorkId(this.params.id);
	this.body = comments;
	this.status = 200;
});

router.del('/works/:id/comments', function *() {
	var req = this.request.body;
	yield $Comment.delCommentByWorksId(req.id);
	this.status = 200;
});

router.post('/works/:id/:action', function *() {
	var action = this.params.action;
	var id = this.params.id;

	switch (action) {
		case 'up': 
		 	var works = yield $Works.incLikedById(id);
			this.session.likedWorks.push(works._id);
			break;
		case 'down': 
			var works = yield $Works.decLikedById(id);
			_.remove(this.session.likedWorks, works._id);
			break;
		default:;
	}

	$User.saveLikedWorks(this.session.user.username, this.session.likedWorks);
	this.status = 200;
});

router.get('/logout', function *() {
	this.session.user = null;
	this.redirect('back');
})

module.exports = router;

