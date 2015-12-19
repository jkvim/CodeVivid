var React = require('react');


var SignupBox = React.createClass({
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
					},
					{
						type: 'length[6]',
						prompt: '输入的密码不能少于6位'
					}
				]
			},
			email: {
				identifier: 'email',
				rules: [
					{
						type: 'email',
						prompt: '请输入有效的邮箱'
					}
				]
			}
		}
	};
	// signup form validate
	$('.ui.form.segment.signup').form(validator);

	},

	render: function () {
		return (
			<form method='post' className='ui form segment signup'>
				<div className='field required'>
					<label>用户名</label>
					<input placeholder='用户名' type='text' name='username'/>
				</div>
				<div className='field required'>
					<label>密码</label>
					<input placeholder='密码' type='password' name='password'/>
				</div>
				<div className='field required'>
					<label>邮箱</label>
					<input placeholder='邮箱' type='email' name='email'/>
				</div>
				<div className='field'>
					<label>签名</label>
					<input type='text' name='signature'/>
				</div>
				<input className='ui primary button fluid' type='submit' value='注册'/>
				<div className='ui error message'></div>
			</form>
		)

	}

});

module.exports = SignupBox;
