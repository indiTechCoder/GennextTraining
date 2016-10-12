import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { logoutAndRedirect } from '../../actions/auth';

class App extends Component {

	constructor(props) {
		super(props);
		console.log('[App] props', props);
	}

	onLogOut() {

		const { dispatch } = this.props;

		/* Redirect and reset timetable state */
		dispatch(logoutAndRedirect());
	}

	componentDidMount() {

		const { dispatch, auth } = this.props;
	}

	render() {

		/* Injected by connect() call */
    	const { dispatch, auth } = this.props;

		return (
			<div className='container'>
				{/* Title */}
				<div>
					Meeting App
				</div>

				{/* Routes */}
				<ul>
					{
						auth.user 
						? (<li><a href='#' onClick={() => this.onLogOut()}>Log out</a></li>)
						: null
					}
					<li> 
					{
						auth.user 
						? <Link to="/home">Home</Link>
						: <Link to="/login">Log in</Link>
					}
					</li>
					<li>
						<Link to="/meeting">Set up a meeting</Link>
					</li>
		        </ul>

		    	{ /* Work with React Router */ }
		        {this.props.children}
			</div>
		);
	}
}

/**
 * Which props do we want to inject, given the global state we defined in root reducer 
 * (or state combined in store) ?
 * It will be invoked when dispatch() is called.
 * Note: use https://github.com/faassen/reselect for better performance.
 */
const mapStateToProps = (state) => {
	return state;
}

/* Wrap the component to inject dispatch and state into it */
export default connect(mapStateToProps)(App)
