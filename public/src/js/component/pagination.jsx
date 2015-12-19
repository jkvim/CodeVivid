import React from 'react'

function PrevPage(props) {
	var prevPage = props.page - 1;
	var href=`/page/${prevPage}`;

	function goPrevPage(e) {
		window.location = href;
	}

	if (prevPage > 0) {

		return (<div className='ui blue animated button' 
								onClick={goPrevPage}>
						<div className='visible content'>Prev</div>
						<div className='hidden content'>
							<i className='left arrow icon'></i>
						</div>
					</div>)
	} else {
		return <div></div>
	}
}

function NextPage(props) {
	var nextPage = props.page + 1;
	var href = `/page/${nextPage}`

	function goNextPage(e) {
		window.location = href;
	}

	// 小于10说明已经是最后一页
	if (props.cardsCount === 10) {
		return (<div className='ui blue animated button' 
									onClick={goNextPage}>
						<div className='visible content'>Next</div>
						<div className='hidden content'>
							<i className='right arrow icon'></i>
						</div>
					</div>)
	} else {
		return <div></div>
	}
}

var PagInation = React.createClass({
	render: function () {
		return (
			<div className='two column grid'>
				<div className='ui buttons'>
					<PrevPage {...this.props} />
					<NextPage {...this.props} />
				</div>
			</div>
		);
	}
});

module.exports = PagInation;
