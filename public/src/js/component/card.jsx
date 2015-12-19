var React = require('react');
var gravatar = require('gravatar');
var MAX_CARD = 9;

function CardImage(props) {
	function handleClick(e) {
		e.preventDefault();
		props.onDelete(props.id);
	}

	var removeButton;
	if (props.onDelete) {
		removeButton = (
			<button className='ui right floated button remove-card-button' 
				onClick={handleClick}>
				<i className='remove icon'></i>
			</button>
		);
	}

	return (
		<div className='blurring dimmable image'>
			<div className='ui dimmer'>
				<div className='content'>
					<div className='center'>
						<a className='ui center aligned header' 
							href={`/works/${props.id}`}>
							{props.title}
						</a>
					</div>
					{removeButton}
				</div>
			</div>
			<img  src={props.imgUrl}/>
		</div>
	);
}

var Card = React.createClass({
	componentDidMount: function () {
		$('.blurring.dimmable.image').dimmer({
			on: 'hover'
		})
	},

	render: function () {
		var card = this.props.card;
		var username = card.user.username;
		var email = card.user.email;
		return (
			<div className="column">
				<div className="ui fluid card">
					<CardImage title={card.title} 
						imgUrl={card.thumbnail_url}
						id={card._id}
					  onDelete={this.props.onDelete}/>
					<div className="content">
						<a className='ui left floated image' 
							href={`/user/${username}`}>
							<img className='ui avatar image' 
								src={gravatar.url(email)}/>
							<span>{username}</span>
						</a>
						<span className='right floated like'>
							<i className='right floated red like icon'></i>
							{card.liked}
						</span>
					</div>
				</div>
			</div>
		); 
	}
});

var WorksCards = React.createClass({
	render: function () {

		return (
			<div className='ui container works-card'>
				<div className="ui three column grid">
					{this.props.cards.filter(function (card, i) {
						return i !== MAX_CARD;
					}).map(function (card, i) {
					return <Card key={i} card={card} onDelete={this.props.handleDeleteCard}/> 
					}, this)}
				</div>
			</div>
		)
	}
});

module.exports = WorksCards;

