import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './containers/App/App';
import * as serviceWorker from './serviceWorker';
import { connectReduxDevtools } from 'mst-middlewares';
import { store } from './stores';

if (process.env.NODE_ENV === 'development') {
  // tslint:disable-next-line:no-var-requires
  connectReduxDevtools(require('remotedev'), store);
}

ReactDOM.render(<App/>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
