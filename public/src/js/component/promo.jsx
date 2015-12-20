var React = require('react');

var Promo = React.createClass({
	render: function () {
		if (this.props.works) {
			return (
				<div id='promo-view' className='ui container'>
					<div className='promo-content'>
						<h1> 欢迎来到CodeVivid </h1>
						<a href='codepen.io'>分享你的CodePen</a>
					</div>
					<div className='promo-background' dangerouslySetInnerHTML={{__html: this.props.works.iframe}}>
					</div>
					<div className='promo-credit'>
						<a href={this.props.works.author_url}>
							Background by {this.props.works.author}</a>
					</div>
				</div>
			);
		} else {
			return <div></div>;
		}
	}
});

module.exports = Promo;
