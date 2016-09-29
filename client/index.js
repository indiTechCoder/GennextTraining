import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, hashHistory } from 'react-router';
import configureStore from './store/configureStore.js';
import App from './pages/App';
/*eslint-enable no-unused-vars*/
const store = configureStore();


ReactDOM.render( <Provider store = { store }>
	<App/></Provider> , document.getElementById('root'));