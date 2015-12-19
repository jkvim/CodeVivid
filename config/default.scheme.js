var validator = require('validator');
var crypto = require('crypto');

module.exports = {
	"(GET|POST) /signup": {
		"request": {
			"session": checkNotLogin
		}
	},
	"POST /signup": {
		"request": {
			"body": checkSignupBody
		}
	},
	"(GET|POST) /login": {
		"request": {
			"session": checkNotLogin
		}
	},
	"POST /login": {
		"request": {
			"body": checkSigninBody
		}
	},
	"(GET|POST) /publish": {
		"request": {
			"session": checkLogin
		}
	},
	"POST /publish": {
		"request": {
			"body": checkCreateBody
		}
	},
	"GET /user/:id": {
		"request": {
			"body": checkLogin
		}
	}
};

function md5(str) {
	return crypto.createHash('md5').update(str).digest('hex');
}

function checkNotLogin() {
	if (this.session && this.session.user) {
		this.flash = {error: '已登录'};
		this.redirect('back');
	}
	return true;
}

function checkLogin() {
	if (!this.session || !this.session.user) {
		this.flash = {error: '未登录'};
		this.redirect('/login');
	}
	return true;
}

function checkSignupBody() {
	// 由前端验证
	var body = this.request.body;

	body.username = validator.trim(body.username);
	body.email = validator.trim(body.email);
	body.password = md5(validator.trim(body.password)); // 加密密码
	return true;
}

function checkSigninBody() {
	var body = this.request.body;
	body.name = validator.trim(body.name);
	body.password = md5(validator.trim(body.password));
	return true;
}

function checkCreateBody() {
	// TODO
	return true;
}






















