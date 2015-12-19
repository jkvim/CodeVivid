var React = require('react');
var gravatar = require('gravatar');
var moment = require('moment');

moment.locale('zh-cn');

function Comment(comment) {
	function handleClick(e) {
		e.preventDefault();
		comment.onDelete(comment._id);
	}

	var userPage = `/user/${comment.user.username}`;
	return (
		<div className='ui comment '>
			<div className='ui right floated button remove-comment-button'
				onClick={handleClick}>
				<i className='remove icon' ></i>
		</div>
			<div className='comment-user'>
				<div className='comment-avatar-wrap'>
					<a href={userPage} className='avatar'>
						<img src={gravatar.url(comment.user.email) }/>
					</a>
				</div>
				<div className='comment-user-text'>
					<a href={userPage} className='author'>{comment.user.username}</a>
					<div className='metadata'>
						<span className='data'>
							 {moment(comment.updated_at).fromNow()}
						</span>
					</div>
				</div>
			</div>
			<div className='comment-text'>
				{comment.content}
			</div>
			{comment.children}
		</div>
	);
}

var CommentForm = React.createClass({
	handleSubmit: function (e) {
		e.preventDefault();
		var text = this.refs.text.value.trim();
		this.props.onCommentSubmit({
			content: text,
			user: this.props.session.user,
		});
		this.refs.text.value = '';
		return;
	},

	render: function () {
		if (this.props.session.user) {
			return (
				<form className='ui reply form' method='post' 
					onSubmit={this.handleSubmit}>
					<div className='field'>
						<textarea ref='text'></textarea>
					</div>
					<input type='submit' className='ui blue button' value='发表评论'>
					</input>
				</form>
			)
		} else {
			return (<div> </div>)		}
	}
});

var CommentList = React.createClass({
	render: function () {
		var commentNodes = this.props.comments.map(function (comment, i) {
			return  (
				<Comment {...comment} key={comment._id} 
					onDelete={this.props.onCommentDelete}>
				{(i !== (this.props.comments.length - 1)) ?
				  <div className='ui section divider'></div> :
					<div></div>
				} </Comment>
			)
		}, this);

		return (
			<div className='comment-list'>
				{commentNodes}
			</div>
		)
	}
});

var CommentBox = React.createClass({
	getInitialState: function () {
		return {comments: []}
	},

	loadCommentFromServer: function () {
		$.ajax({
			url: this.props.url,
			dataType: 'json',
			cache: false,
			success: function (data) {
				this.setState({comments: data});
			}.bind(this),
			error: function (xhr, status, err) {
				console.error(this.props.url, status, err.toString());
			}.bind(this)
		});
	},

	componentDidMount: function () {
		// setInterval(this.loadCommentFromServer, this.props.pollInterval)
		this.loadCommentFromServer();
	},

	handleCommentSubmit: function (comment) {
		$.ajax({
			url: this.props.url,
			data: comment,
			method: 'POST',
			success: function (data) {
				var newComment = this.state.comments.concat([data]);
				this.setState({comments: newComment});
			}.bind(this),
			error: function (xhr, status, err) {
				console.error(this.props.url, status, err.toString());
			}.bind(this)
		});
	},

	handleCommentDelete: function (id) {
		var newComment = this.state.comments.filter(function (data) {
			return id !== data._id;
		});
		this.setState({comments: newComment});
		$.ajax({
			url: this.props.url,
			data: {'id':id},
			method: 'DELETE',
			error: function (xhr, status, err) {
				console.error(this.props.url, status, err.toString());
			}.bind(this)
		});
	},

	handleClick: function (e) {
		if ($(e.target).hasClass('login')) 
			window.location = '/login';
		if ($(e.target).hasClass('signup'))
			window.location = '/signup';
	},

	render: function () {
		var session = this.props.session;
		var loginAndSignup;
		if (!session.user) {
			loginAndSignup = (
				<div className='ui buttons'>
					<button className='ui primary button login' 
						onClick={this.handleClick}>登陆</button>
					<div className='or'></div>
					<button className='ui red button signup' onClick={this.handleClick}> 注册</button>
				</div>
			);
		}
		return (
			<div className='ui segment' id='comment-box'>
				<div className='ui comments'>
					<div className='ui dividing header'>评论</div>
					<CommentList comments={this.state.comments}
						onCommentDelete={this.handleCommentDelete}/>
					<CommentForm session={session} 
						onCommentSubmit={this.handleCommentSubmit}/>
				</div>
				{loginAndSignup}
			</div>
		)
	}
});

module.exports = CommentBox;
