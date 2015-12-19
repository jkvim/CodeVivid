var React = require('react');

var key = '386b52287a2448f8a35040846fad77f3';

function getTargetUrl(srcUrl) {
	return  `http://api.embed.ly/1/oembed?key=${key}&url=${srcUrl}`;
}

function getRealHtml(author, slug) {
	return `<iframe scrolling="no" frameborder="0" src="http://s.codepen.io/${author}/debug/${slug}" allowfullscreen="true"></iframe>`;
}

function getImage(user, slug) {
	return `https://codepen.io/${user}/pen/${slug}/image/small.png` 
}

var Preivew = React.createClass({
	render: function () {
		if (this.props.content) {
			var author = this.props.url.match(/codepen.io\/([\w\/]+)\/pen/)[1];
			var slug = this.props.url.match(/\/pen\/(\w+)/)[1];
			var iframe = getRealHtml(author, slug);
			this.props.readySumit(author, slug, iframe);

			return  (
				<div className='ui segment preview content'>
				<div  dangerouslySetInnerHTML={{__html: iframe}} id='preview-box'></div>
			</div>
			);
		} else {
			return (<div className='preview content'></div>);
		}
	}
});

var countFetchHTML = 0;

var WorksSubmitBar = React.createClass({
	getInitialState: function () {
		return {url: '', previewContent: ''}
	},

	fetchFrame: function (url) {
		var targetUrl = getTargetUrl(url);
		$('.button.preview').addClass('loading');

		$.get(targetUrl, function (data) {
			this.setState({previewContent: data,
									 	 url: url});

		}.bind(this))

		.fail(function (err) {
			console.log(err);
			++countFetchHTML;
			console.log('fali:', countFetchHTML);
			$('.button.preview').removeClass('loading');
			if (countFetchHTML < 3) this.fetchFrame();
		}.bind(this));
	},

	readySumit: function (author, slug, iframe) {
		this.author = author;
		this.slug = slug;
		this.iframe = iframe;
		$('.checkout-tips').hide();
		$(this.refs.submitButton).removeClass('disabled');
	},

	submitWork: function () {
		$(this.refs.submitButton).addClass('disabled');

		$.ajax({
			method: 'POST',
			url: '/publish',
			data: {
				iframe: this.iframe,
				srcUrl: this.state.url,
				title: this.state.previewContent.title,
				slug: this.slug,
				thumbnail_url: getImage(this.author, this.slug),
				author: this.author,
				author_url: `http://codepen.io/${this.author}/`,
				description: this.state.previewContent.description,
			},
			success: function (id) {
				$('.checkout-tips a').text('提交完成马上去看看').attr('href', `/works/${id}`);
				$('.checkout-tips').show();
			}.bind(this),
			error: function (xhr, status, err) {
				console.error(this.props.url, status, err.toString());
			}.bind(this)
		});
	},

	handlePreview: function (e) {
		e.preventDefault();
		var url = this.refs.url.value;
		if (url === this.state.url)return;
		this.fetchFrame(url);
	},

	componentDidUpdate: function () {
		$('.button.preview').removeClass('loading');
	},

	componentDidMount: function () {
		var validator = {
			fields: {
				url: {
					identifier: 'url',
					rules: [
						{
							type: 'regExp[/(http:\/\/)?codepen\.io/]',
							prompt: '请输入有效url'
						},
						{
							type: 'contains[codepen.io]',
							prompt: '请使用codepen.io发布作品'
						}
					]
				}
			}
		};
		$('.form.preview').form(validator);
	},

	render: function () {
		return (
			<div className='ui one column centered aligned page grid'>
				<div className='ui centered aligned column' id='submit-grid'>
					<form className='ui form preview' onSubmit={this.handlePreview}>
						<div className='tips'>
							<i >*目前只支持用<a href='http://codepen.io'> Codepen </a>提交作品</i>
						</div>
						<div className='ui field fluid input'>
							<input type='text' 
								placeholder='http://' 
								name='url'
								ref='url'
							/>
						</div>
						<button className='ui teal button preview'>预览</button>
						<div className='ui error message'></div>
					</form>
					<div id='submit-button'>
					<button 
						className='ui invert green disabled button' 
						ref='submitButton' 
						onClick={this.submitWork}>提交
					</button>
					</div>
				<div className='ui column checkout-tips'><a></a></div>
				<Preivew content={this.state.previewContent} 
					url={this.state.url}
				  readySumit={this.readySumit}/>
				</div>
			</div>
		);
	}
});

module.exports = WorksSubmitBar;
