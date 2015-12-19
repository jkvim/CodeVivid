var React = require('react');

var LoginBox = React.createClass({
	componentDidMount: function () {
	var validator = {
		fields: {
			username: {
				identifier: 'username',
				rules: [
					{
						type: 'empty',
						prompt: '请输入用户名'
					}
				]
			},
			password: {
				identifier: 'password',
				rules: [
					{
						type: 'empty',
						prompt: '请输入密码'
					}
				]
			}
		}
	};

	$('.ui.form.segment.login').form(validator);
	},

	render: function () {
		return (
			<form method='post' className='ui form segment login'>
				<div className='ui left icon fluid input'>
					<i className='mail icon'></i>
					<input type='text' placeholder='用户名' name='username'/>
				</div>
				<br/>
				<div className='ui left icon fluid input'>
					<i className='lock icon'></i>
					<input type='password' placeholder='密码' name='password'/>
				</div>
				<br/>
				<input type='submit' className='ui button primary fluid' value='登录'/>
				<div className='ui error message'></div>
			</form>
		)
	}
});

module.exports = LoginBox;
