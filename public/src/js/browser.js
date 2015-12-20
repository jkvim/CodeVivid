var NavBar = require('./component/navbar.jsx');
var Footer = require('./component/footer.jsx');
var ReactDOM = require('react-dom');
var React = require('react');
var render = ReactDOM.render;
require('../css/share.min.css');
require('../css/style.css');

// 利用webpack的按需加载功能, 减少单页loading时间
function indexRoute() {
	var worksCards = document.getElementById('works-cards');
	var pagination = document.getElementById('pagination');
	
	require.ensure([], function (require) {
		var WorksCards = require('./component/card.jsx');
		var PagInation = require('./component/pagination.jsx');
		var Promo = require('./component/promo.jsx');

		render(<WorksCards cards={__cards__}/>, worksCards);
		render(<PagInation page={__page__} cardsCount={__cards__.length}/>, pagination);

		if (!__session__.user && __page__ === 1) {
			var promo = document.getElementById('home-promo');
			render(<Promo works={__background__}/>, promo);
		}
	});
}

function signupRoute() {
	var signup = document.getElementById('signup');

	require.ensure([], function (require) {
		var SignupBox = require('./component/signup-box.jsx');
		render(<SignupBox />, signup);
	});
}

function loginRoute() {
	var login = document.getElementById('login');

	require.ensure([], function (require) {
		var LoginBox = require('./component/login-box.jsx');
		render(<LoginBox />, login);
	});
}

function publishRoute() {
	var worksSubmit = document.getElementById('works-submit');

	require.ensure([], function (require) {
		var WorksSubmitBar = require('./component/works-submit.jsx');
		render(<WorksSubmitBar />, worksSubmit);
	});
}

function userRoute() {
	var userProfile = document.getElementById('user-profile');
	var userWorksTab = document.getElementById('user-works-tab');

	require.ensure([], function (require) {
		var Profile = require('./component/profile.jsx');
		var Tabs = require('./component/tabs.jsx');
		render(<Profile user={__user__}/>, userProfile);
		render(<Tabs user={__user__}/>, userWorksTab);
	});
}

function worksRoute() {
	var worksDOM = document.getElementById('works');

	require.ensure([], function (require) {
		require('../js/share.min.js');
		var WorksWrapper = require('./component/works-wrapper.jsx');
		render(<WorksWrapper works={__works__} 
										session={__session__}
										isLiked={__isLiked__}/>, worksDOM);
	});
}

var routes = {
	index: {
		url: /\/$|\/page\/\d/,
		handle: indexRoute,
	},
	signup: {
		url: '/signup',
		handle: signupRoute,
	},
	login: {
		url: '/login',
		handle: loginRoute,
	},
	publish: {
		url: '/publish',
		handle: publishRoute,
	},
	user: {
		url: /^\/user\/(\w+)$/,
		handle: userRoute,
	},
	works: {
		url: /^\/works\/(\w+)$/,
		handle: worksRoute,
	}
};

function resolve(url) {
	var navbar = document.getElementById('navbar');
	var footer = document.getElementById('footer');
	render(<NavBar session={__session__}/>, navbar);
	render(<Footer />, footer);

	for (var key in routes) {
		var route = routes[key];
		var match = typeof route.url === 'string' ? url === route.url : 
			url.match(route.url);

		if (match) {
			route.handle();
		}
	}
}

resolve(document.location.pathname);
