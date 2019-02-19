import React, { Component } from "react";
import { StyleSheet, Text, View, Button, SafeAreaView } from "react-native";
import { Colors } from "./../styles/Colors";
import {createStackNavigator, createAppContainer} from 'react-navigation';
import {Button as ButtonIcon} from "../components/Button" ;

class Create_Details extends Component {
  // componentDidMount() {
  //   this.props.navigation.setParams({dismiss: this.props.navigation.dismiss});
  // }

  static navigationOptions = ({ navigation }) => ({
    headerRight: (
      <View style={{marginRight:16, alignItems: "center"}}>
        <ButtonIcon type="close" onPress={() => navigation.dismiss()} />
      </View>
    )
  });

  render() {
    const {navigate} = this.props.navigation;
    return (
      // Container View
      // Change the color values based on mood calculated from server for bg color
      <View style={styles.bg}>
        <Button
        title="Continue"
        onPress={() => navigate('Location')}
      />
      </View>
    );
  }
}
class Create_Map extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerRight: (
      <View style={{marginRight:16, alignItems: "center"}}>
      <ButtonIcon type="close" onPress={() => navigation.dismiss()} />
      </View>
    ),
    headerLeft: (
      <View style={{marginLeft:16, alignItems: "center"}}>
      <ButtonIcon type="return" onPress={() => navigation.goBack(null)} />
      </View>
    )
  });
  
  render() {
    const {navigate} = this.props.navigation;
    return (
      // Container View
      // Change the color values based on mood calculated from server for bg color
      <View style={styles.bg}>
        <Button
        title="Continue"
        onPress={() => navigate('Tracks')}
      />
      </View>
    );
  }
}
class Create_Tracks extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerRight: (
      <View style={{marginRight:16,alignItems: "center"}}>
      <ButtonIcon type="close" onPress={() => navigation.dismiss()} />
      </View>
    ),
    headerLeft: (
      <View style={{marginLeft:16}}>
      <ButtonIcon type="return" onPress={() => navigation.goBack(null)} />
      </View>
    )
  });

  render() {
    const {navigate} = this.props.navigation;
    return (
      // Container View
      // Change the color values based on mood calculated from server for bg color
      <View style={styles.bg}>
        <Button
        title="Continue"
        onPress={() => navigate('Mood')}
      />
      </View>
    );
  }
}
class Create_Mood extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerRight: (
      <View style={{marginRight:16}}>
      <ButtonIcon type="close" onPress={() => navigation.dismiss()} />
      </View>
    ),
    headerLeft: (
      <View style={{marginLeft:16}}>
      <ButtonIcon type="return" onPress={() => navigation.goBack(null)} />
      </View>
    )
  });

  render() {
    return (
      // Container View
      // Change the color values based on mood calculated from server for bg color
      <View >
      </View>
    );
  }
}

const styles = StyleSheet.create({
  bg: {
    backgroundColor: Colors.defaultBg,
    flex:1
  }
});


const MainNavigator = createStackNavigator(
  {
    Details: {screen: Create_Details},
    Location: {screen: Create_Map},
    Tracks: {screen: Create_Tracks},
    Mood: {screen: Create_Mood}
  }, {
    defaultNavigationOptions: {
      headerTintColor: Colors.defaultFont,
      headerStyle: {
        backgroundColor: Colors.defaultBg,
        borderWidth: 0, 
        borderBottomColor: 'transparent' 
      }
    }
  }
);

const Create = createAppContainer(MainNavigator);

export default Create;