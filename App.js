
import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import { createBottomTabNavigator, createAppContainer } from "react-navigation";
import Playlist from "./app/views/Playlist";
import Player from "./app/views/Player";
import { Colors } from "./app/styles/Colors";
import {TrackStack} from "./app/components/TrackStack";

/**
 * Some random pages for tab navigation demo
 */
class Home extends Component {

  render() {
    return (
        <View style={{paddingTop:200}}>
          <TrackStack />
        </View>
    );
  }
}

class First extends Component {
  render() {
    return (
      <View>
        <Text style={{ fontSize: 50, marginTop: 300, textAlign: "center" }}>
          HELLO WORLD
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
