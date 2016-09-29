import React from 'react';
import {Component} from 'react';
/*eslint-disable */
export default class App extends Component {
  componentWillMount() {
    this
      .props
      .loadUserFromToken();
  }

  render() {
    return ( <div> 
      <h1>Hello world from Node express HMR</h1>
      </div>
        );
    }
}