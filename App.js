import React, { Component } from "react";
import { Text, View } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { createBottomTabNavigator, createAppContainer } from "react-navigation";
import Playlist from "./app/views/Playlist";
import Library from "./app/views/Library";
import Settings from "./app/views/Settings";
import Player from "./app/views/Player";
import { Colors } from "./app/styles/Colors";
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
    Home: { screen: Home },
    Library: { screen: Library }
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === "Home") {
          // iconName = `ios-information-circle${focused ? "" : "-outline"}`;
          iconName = "ios-home";
        } else if (routeName === "Library") {
          iconName = "ios-albums";
        } else if (routeName === "Settings") {
          iconName = "ios-settings";
        }

        // You can return any component that you like here
        return <Icon name={iconName} size={23} color={tintColor} />;
      }
    }),
    tabBarOptions: {
      activeTintColor: "#F8F8F8",
      inactiveTintColor: Colors.tabIconInactive,
      style: {
        backgroundColor: Colors.tabNav,
        paddingTop: 10
      }
    }
  }
);

const app = createAppContainer(BottomNav);
export default app;
