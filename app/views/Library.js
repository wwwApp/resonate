import React, { Component } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { Colors } from "./../styles/Colors";
import {createStackNavigator, createAppContainer} from 'react-navigation';
import Create from "./Create";

class Lib extends Component {
  render() {
    const {navigate} = this.props.navigation;
    return (
      // Container View
      // Change the color values based on mood calculated from server for bg color
      <View style={styles.bg}>
        <Button
        title="Create"
        onPress={() => navigate('Create')}
      />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  bg: {
    backgroundColor: Colors.defaultBg,
    flex:1,
    paddingTop:50
  }
});


const MainNavigator = createStackNavigator(
  {
    Library: {screen: Lib},
    Create: {screen: Create}
  },
  {
    mode: 'modal',
    headerMode: 'none',
  }
);

const Library = createAppContainer(MainNavigator);

export default Library;