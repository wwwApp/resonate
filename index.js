import React, {Component} from 'react';
import {Provider} from 'react-redux';
import {store} from './app/redux/store';
import {AppRegistry, StatusBar} from 'react-native';
import App from './App';
import {name as appName} from './app.json';


class Resonate extends Component {

  render () {
    return (
      <Provider store={store}>
        <StatusBar barStyle='light-content' />
        <App/>
      </Provider>
    );
  }
}


AppRegistry.registerComponent(appName, () => Resonate);
