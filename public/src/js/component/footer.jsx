var React = require('react');

var Footer = React.createClass({
	render: function () {
		return (
			<div className='ui center aligned container'> 
				<div className='ui center aligned segment'>
					<div className='description'>
						本站所有作品均转载自<a href='codepen.io'>CodePen</a>
					</div>
				</div>
			</div>
		)
	}
});

module.exports = Footer;
