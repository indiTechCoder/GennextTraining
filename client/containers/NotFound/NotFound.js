import React, { Component, PropTypes } from 'react';

export default class NotFound extends Component {

	constructor(props) {
		super(props);
		console.log('[NotFound] props', props);
	}

	render() {
		return (
			<div className='container'>
				<div >404 Not Found</div>
			</div>
		)
	}
}
