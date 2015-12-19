// 注册验证
$(function () {
	var validator = {
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
		rePassWord: {
			identifier: 're_password',
			rules: [
				{
					type: 'match[password]',
					prompt: '输入的密码不一致'
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
	};

	// signup form validate
	$('.form.signup').form(validator);
});

// 登陆验证
$(function () {
	var validator = {
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
	};

	$('.form.signin').form(validator);
});

$(function () {
	var validator = {
		content: {
			identifier: 'content',
			rules: [
				{
					type: 'emtpy',
					prompt: '内容不能为空'
				}
			]
		}
	}
	$('.form.works').form(validator)
	$('.item.create-works').click(function () {
		window.location.href = '/create'
	});
})


