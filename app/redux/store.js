
import {createStore, compose , applyMiddleware} from 'redux';
// import someReduxMiddleware from 'some-redux-middleware';
import axios from 'axios';
import axiosMiddleware from 'redux-axios-middleware';

import rootReducer from './reducers/root.reducer';


const client = axios.create({
	baseURL: 'https://api.github.com',
	responseType: 'json'
  });



const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, /* preloadedState, */ composeEnhancers(
    applyMiddleware(axiosMiddleware(client))
));

module.exports = {
  store
};