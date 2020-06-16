import React from 'react';
import ReactDOM from 'react-dom';

import 'materialize-css/dist/css/materialize.min.css'

import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

import store from './redux/store';

import App from './App';

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.querySelector('#root')
);
