var React = require('react');
var CommentBox = require('./comment.jsx');
var gravatar = require('gravatar');
var moment = require('moment');

var BreifInfo = React.createClass({
	render: function () {
		var works = this.props.works;
		var email = works.user.email
		var username = works.user.username;
		var avatar = gravatar.url(email);
		var userPage = `/user/${username}`;
		return(
			<div className='ui left aligned segment user-info'>
					<div className='ui fluid card user-card'>
						<div className='content'>
							<div className='userCard'>
								<img src={avatar} className='ui tiny floated image'/>
								<div className='title'><h1>{works.title}</h1></div>
								By <a href={works.author_url}>{works.author}</a>
							</div>
							<div className='meta'>
								<a href={userPage}>{username}</a>
								发布于 {moment(works.created_at).format('YYYY-MM-DD')}
							</div>
							<div  className='description'>
								<p>{works.description}</p>
								<p>
									作品原链接 
									<a href={works.srcUrl}> {works.srcUrl}</a>
								</p>
							</div>
						</div>
					</div>
			</div>
		);
	}
});


function WorksState (props) {
		return (
			<div className='ui segment works-state'>
				<h2 className='ui header views-count'>
					<i className='blue marker icon'></i>
					<div className='content'><span className='views-num'>{props.pv}</span> VIEWS	</div>
				</h2>
				<h2 className='ui header liked-count'>
					<button className='ui icon button liked-button' onClick={props.handleClick}>
						<i className='heart icon'></i>
					</button>
					<div className='content'><span className='heart-num'>{props.liked}</span> HEARTS </div>
				</h2>
				<div className='share-bar'></div>
			</div>
		)
};

var WorksDetails = React.createClass({
	getInitialState: function () {
		this.id = this.props.works._id;
		return {liked: this.props.works.liked }
	},

	likedAction: function (action) {
		$.post(`/works/${this.id}/${action}`, function (data) {

		})
		.fail(function (err) {
			console.log(`${action} liked fail `+ err);
		})
		.done(function (msg) {
			console.log(msg);
		});
	},

	handleClick:function (event) {
		if (this.props.session.user) {
			if ($(event.target).hasClass('active')){
				$(event.target).removeClass('active');
				this.setState({liked: this.state.liked - 1});
				this.likedAction('down');
			} else {
				$(event.target).addClass('active');
				this.setState({liked: this.state.liked + 1});
				this.likedAction('up');
			}
		}
	},

	componentDidMount: function () {
		if (this.props.isLiked && this.props.session.user) {
			$('.heart.icon').addClass('active');
		}

		$('.share-bar').share({}, {
			description: '我在CodeVivid 发布了一个作品, 快来点赞吧',
			image: this.props.works.thumbnail_url,
		});

	},

	render: function () {
		var url = `/works/${this.id}/comments`;
		var works = this.props.works;
		return (
			<div className='container' id='works-details'>
				<div className='ui two column centered grid'>
					<div className='left floated left ten wide column'>
						<BreifInfo works={works}/>
						<CommentBox session={this.props.session} 
							url={url}
						  pollInterval={2000}/>
					</div>
					<div className='left floated left aligned five wide column'>
						<WorksState pv={works.pv} 
							liked={this.state.liked} 
							handleClick={this.handleClick} />
					</div>
				</div>
			</div>
		);
	}
});

module.exports = WorksDetails;
