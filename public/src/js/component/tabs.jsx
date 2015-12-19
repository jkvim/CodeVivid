var React = require('react');
var CardList = require('./card.jsx');

var Tabs = React.createClass({
	getInitialState: function () {
		return {
			cards: this.props.user.works,
			route: {
				'mine': this.props.user.works,
				'liked': this.props.user.liked_works,
			}
		};
	},

	handleClick: function (e) {
		e.preventDefault();
		var url = e.target.href;
		var hash = url.substr(url.indexOf('#') + 1);
		this.setState({cards: this.state.route[hash]});
	},

	handleCardDel: function (id) {
		console.log('handle delete card:', id);
		var newWorks = this.state.route['mine'].filter(function (work) {
			console.log('my works', work);
			return work._id !== id;
		});
		console.log(newWorks);
		this.setState({
									cards: newWorks,
									route: {
										mine:newWorks,
										liked: this.state.route.liked
									}});

		$.ajax({
			url: `/user/${this.props.user.username}`,
			data: {id: id},
			method: 'DELETE',
			error: function (xhr, status, err) {
				console.error(this.props.url, status, err.toString());
			}.bind(this)
		});
	},

	componentDidMount: function () {
		$(this.refs.tabs).children('a').click(function () {
			$('.item.active').removeClass('active');
			$(this).addClass('active'); 
		});
	},

	render: function () {
		return (
			<div className="ui one column centered grid">
				<div className="ui top secondary pointing attached  menu" ref="tabs"> 
					<a href='#mine' 
						className="item active" 
						onClick={this.handleClick}>我的作品
					</a>
					<a href='#liked'
						className="item " 
						onClick={this.handleClick}>我的收藏
					</a>
				</div>
				<CardList cards={this.state.cards} 
					handleDeleteCard={this.handleCardDel}/>
			</div>
		)
	}
});

module.exports = Tabs;
