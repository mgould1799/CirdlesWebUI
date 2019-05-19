//import './index.css';
import App from './src/App';
import * as serviceWorker from './src/serviceWorker';
import React, { Component } from 'react';
import Radium from 'radium';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

//import MapBuilder from './src/components/MapBuilder'
//import XMapBuilder from './src/components/XMapBuilder'

ReactDOM.render(<XMapBuilder/>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
