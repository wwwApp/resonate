import React, { Component } from "react";
import { StyleSheet, Text, View, ScrollView, ImageBackground, Image, TouchableOpacity, Modal, Dimensions, Animated, Switch } from 'react-native';
import { Colors } from "./../styles/Colors";

class Settings extends Component {
  


  render() {
    return(
      <View style={styles.container}>
      <View style={styles.user}>
      <Image style={styles.anim}source={require('../assets/resonateAnim.gif')}/>
      <Text style={styles.name}>John Smith</Text>
      <Text style={styles.spotifyUserName}>@spotifyUsername</Text>
      </View>

      <View style={styles.settings}>
        <View style={styles.row}><Text style={styles.settingText}>Notifications </Text>
        <View style={styles.switchContainer}> 
        <Switch></Switch>
        
            </View></View>

        <View style={styles.row}><Text style={styles.settingText}>Location</Text>
        <View style={styles.switchContainer}> 
        <Switch></Switch>
        </View>
        </View>

        <View style={styles.row}><Text style={styles.settingText}>Import Playlist</Text></View>

        <View style={styles.row}><Text style={styles.settingText}>Logout</Text></View>
        <View style={styles.row}><Text style={styles.settingText}>Disconnect Account</Text></View>
      
      </View>
      </View>
      
      
    );
    }
   
  
}
 
    
  

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: Colors.defaultBg,

    
  },
  user: {
    flex: 1,
    alignItems: "center"
  },
  settings: {
    flex: 1,
    width: "100%",
    marginTop: 70
  },
  row: {
    flex: 1,
    flexDirection: "row",
    width: "100%",
    height: 50,
    borderTopColor: "white",
    borderTopWidth: .5,
    alignItems: "center",
    justifyContent: "center"
  },
  settingText: {
    color: "white",
    fontSize: 18,
    padding: 17
    
  },
  anim: {
    width: 250,
    height: 250,
    marginLeft: "auto",
    marginRight: "auto"
    
  },
  name: {
    fontSize: 20,
    color: "white"
  },
  spotifyUserName: {
    color: "white"
  },

  
});

export default Settings;

   
