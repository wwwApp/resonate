import React, {Component} from 'react';
import {Provider} from 'react-redux';
import {store} from './app/redux/store';
import {AppRegistry, StatusBar} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import Player from "./app/views/Player";


class Resonate extends Component {

  render () {
    return (
      <Provider store={store}>
        <StatusBar barStyle='light-content' />
        <App/>
        <Player style={{position: "absolute", width:'100%', bottom:82}}/>
      </Provider>
    );
  }
}


AppRegistry.registerComponent(appName, () => Resonate);
