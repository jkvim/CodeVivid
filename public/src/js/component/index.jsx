var NavBar = require('./navbar.jsx');
var WorksCards = require('./card.jsx');
var WorksSubmitBar = require('./works-submit.jsx');
var WorksWrapper = require('./works-wrapper.jsx');
var PagInation = require('./pagination.jsx');
var LoginBox = require('./login-box.jsx');
var SignupBox = require('./signup-box.jsx');
var Profile = require ('./profile.jsx');
var Tabs = require('./tabs.jsx');
var React = require('react');
var Promo = require('./promo.jsx');

NavBar = React.createFactory(NavBar);
WorksCards = React.createFactory(WorksCards);
WorksSubmitBar = React.createFactory(WorksSubmitBar);
Profile = React.createFactory (Profile);
Tabs = React.createFactory(Tabs);
WorksWrapper = React.createFactory(WorksWrapper);
PagInation = React.createFactory(PagInation);
LoginBox = React.createFactory(LoginBox);
SignupBox = React.createFactory(SignupBox);
WorksSubmitBar = React.createFactory(WorksSubmitBar);
Promo = React.createFactory(Promo);


module.exports = {
	NavBar: NavBar,
	WorksCards: WorksCards,
	WorksSubmitBar: WorksSubmitBar,
	Profile: Profile,
	Tabs: Tabs,
	WorksWrapper: WorksWrapper,
	PagInation: PagInation,
	LoginBox: LoginBox,
	SignupBox: SignupBox,
	WorksSubmitBar: WorksSubmitBar,
	Promo: Promo,
};
