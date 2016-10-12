/**
 * Entry point
 */

import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, IndexRoute, Route, Redirect } from 'react-router';
import { createHistory } from 'history';
import { syncReduxAndRouter } from 'redux-simple-router';
import store from './store/store';
import App from './containers/App/App';
import NotFound from './containers/NotFound/NotFound'

const history = createHistory();

syncReduxAndRouter(history, store);

render(
	<Provider store={store}>
		<Router history={history}>
	    	<Route path="/" component={App}>
		    </Route>
		    <Route path="*" component={NotFound} />
		</Router>
  	</Provider>,
  	document.getElementById('app')
);