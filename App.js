import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import { createBottomTabNavigator, createAppContainer } from "react-navigation";
import Playlist from "./app/views/Playlist";
import Library from "./app/views/Library";
import Player from "./app/views/Player";
import { PlayerBar } from "./app/components/PlayerBar";
import { Colors } from "./app/styles/Colors";
import RepoList from "./app/components/RepoList";
import Home from "./app/views/Home";

/**
 * Some random pages for tab navigation demo
 */
class Test1 extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      /**
       * All View should be styled with flexbox in order for player modal to work
       */
      <View style={{ height: "100%" }}>
        <View>
          <Text style={{ fontSize: 50, marginTop: 300, textAlign: "center" }}>
            PLAYER TEST
          </Text>
        </View>

        <View style={{ position: "absolute", bottom: 0, width: "100%" }}>
          <Player />
        </View>
      </View>
    );
  }
}

/**
 * Tab Navigation Config.
 */

const BottomNav = createBottomTabNavigator(
  {
    /* Home: { screen: Home }, */
    Player: { screen: Test1 },
    Library: { screen: Library },
    Playlist: { screen: Playlist }
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

const app = createAppContainer(BottomNav);
export default app;

const styles = StyleSheet.create({});
