var React = require('react');
var gravatar = require('gravatar');

var RightMenu = React.createClass({
	componentDidMount: function () {
		$('.ui.dropdown').dropdown();
	},

	render: function function_name() {
		var Login;

		if (this.props.session && this.props.session.user) {
			var username = this.props.session.user.username;
			var email  = this.props.session.user.email;
			var avatarUrl = gravatar.url(email, {s: '100'});

			Login = (
				<div className="right menu ">
					<div className="ui dropdown item">
					<div className="item">
						<img className="ui mini avatar image" src={avatarUrl}/>
					</div>
						<div className="menu">
								<a className="item" href="/logout">注销</a> 
								<a className="item" href={`/user/${username}`}>个人主页</a> 
								<a className="item" href="/publish">发布作品</a> 
						</div>
					</div>
				</div>);
		} else {
			Login = (
				<div className="right menu">
					<a href="/signup" className="item">注册</a> 
					<a href="/login" className="item">登录</a> 
				</div>);
		}
		return Login;
	}
});

var NavBar = React.createClass({
	render: function () {
		return (
		<div className="ui container">
			<div className="ui fixed menu navbar page grid">
				<a href="/" className="ui red header item">CodeVivid</a>
				<RightMenu session={this.props.session}/>
			</div>
		</div>
		);
	}
});

module.exports = NavBar;

