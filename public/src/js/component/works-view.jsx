var React = require('react');

var WorksView = React.createClass({
	componentDidMount: function () {
		var $resultDiv = $('#result_div');
		$resultDiv.resizable({
			handles: {
				's': '#resizer'
			}
		});
	},

	render: function () {
		return (
			<div className="container works-view">
			<div id="result_div" className="result">
				<div className="result content" dangerouslySetInnerHTML={{__html: this.props.iframe}}>
				</div>
				<div className="works view cover"> </div>
					<div id="resizer" className="ui-resizable-handle ui-resizable-s resizer">
						<span></span>
				</div>
			</div>
	</div>
		)
	}
});

module.exports = WorksView;
