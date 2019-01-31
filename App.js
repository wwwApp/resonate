/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import { createBottomTabNavigator, createAppContainer } from "react-navigation";
import Playlist from "./app/views/Playlist";
import Player from "./app/views/Player";
import { Colors } from "./app/styles/Colors";

/**
 * Some random pages for tab navigation demo
 */
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = { dataSource: "test" };

  }

  componentDidMount(){
    return fetch('http://resonate.openode.io/api/playlists')
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson)
        this.setState({
          dataSource: JSON.stringify(responseJson),
        }, function(){

        });

      })
      .catch((error) =>{
        console.error(error);
      });
  }

  render() {
    return (
      <View>
        <Text style={{ fontSize: 16, marginTop: 0}}>
          {" "}
          HOME PAGE
          {this.state.dataSource}
        </Text>
      </View>
    );
  }
}

class First extends Component {
  render() {
    return (
      <View>
        <Text style={{ fontSize: 50, marginTop: 300, textAlign: "center" }}>
          {" "}
          FIRST PAGE{" "}
        </Text>
      </View>
    );
  }
}

/**
 * Tab Navigation Config.
 */

const BottomNav = createBottomTabNavigator(
  {
    Home: { screen: Home },
    First: { screen: First },
    Playlist: { screen: Playlist },
    Player: { screen: Player }
  },
  {
    tabBarOptions: {
      activeTintColor: "#F8F8F8",
      inactiveTintColor: Colors.tabIconInactive,
      style: {
        backgroundColor: Colors.tabNav
      }
    }
  }
);

const App = createAppContainer(BottomNav);
export default App;


const styles = StyleSheet.create({});
