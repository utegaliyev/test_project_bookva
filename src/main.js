import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import reducer from './reducer';

const loggerMiddleware = createLogger();
const baseState = {};

document.addEventListener('DOMContentLoaded', function() {
  const store = createStore(reducer, baseState,  applyMiddleware(loggerMiddleware, thunkMiddleware));
  ReactDOM.render(
      <Provider store={store}>
        <App/>
      </Provider>,
    document.getElementById('mount')
  );
});
