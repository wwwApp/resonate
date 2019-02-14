import React, { Component } from "react";
import { StyleSheet, Text, View, Modal } from "react-native";
import { createBottomTabNavigator, createAppContainer } from "react-navigation";
import Playlist from "./app/views/Playlist";
import { Player } from "./app/components/Player";
import { PlayerModal } from "./app/components/PlayerModal";
import { Colors } from "./app/styles/Colors";
import RepoList from "./app/components/RepoList";
import Swiper from "react-native-swiper";

/**
 * Some random pages for tab navigation demo
 */
class Test1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalVisible: true // Eventually will be in global store to control player modal
    };
  }

  render() {
    return (
      /**
       * All View should be styled with flexbox in order for player modal to work
       */
      <View style={{ flex: 1 }}>
        <Text style={{ fontSize: 50, marginTop: 300, textAlign: "center" }}>
          {" "}
          HOME PAGE{" "}
        </Text>
        {/* <RepoList /> */}
        {/* <PlayerModal isVisible={this.state.isModalVisible} /> */}
        <Swiper
          horizontal={false}
          loop={false}
          showsPagination={false}
          index={0}
        >
          <PlayerModal isVisible={this.state.isModalVisible} />
          <Swiper
            horizontal={false}
            loop={false}
            showsPagination={false}
            index={1}
          >
            <Player />
          </Swiper>
        </Swiper>
      </View>
    );
  }
}

class Test2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalVisible: true // Eventually will be in global store to control player modal
    };
  }
  render() {
    return (
      <View style={{ flex: 1 }}>
        <Text style={{ fontSize: 50, marginTop: 300, textAlign: "center" }}>
          {" "}
          FIRST PAGE{" "}
        </Text>

        <PlayerModal isVisible={this.state.isModalVisible} />
        <Modal visible={true}>
          <Player />
        </Modal>
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
    Test1: { screen: Test1 },
    Test2: { screen: Test2 },
    Player: { screen: Player },
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

const App = createAppContainer(BottomNav);
export default App;

const styles = StyleSheet.create({});