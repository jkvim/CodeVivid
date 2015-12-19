var React = require('react');
var WorksView = require('./works-view.jsx');
var WorksDetails = require('./works-details.jsx');
var _ = require('lodash');


var WorksWrapper = React.createClass({

	render: function () {
		var iframe = this.props.works.iframe;
		var others = _.omit(this.props.works, 'iframe');
		return (
			<div className="container" id="works-wrapper">
				<WorksView iframe={iframe}/>
				<WorksDetails works={others} 
					session={this.props.session}
					isLiked={this.props.isLiked}/>
			</div>
		)

	}
});

module.exports = WorksWrapper;
