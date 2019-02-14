import React, { Component } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Button } from "./Button";
import { AlbumVis } from "./AlbumVis";
import { PlayControl } from "./PlayControl";
import { Colors } from "../styles/Colors";
import GestureRecognizer from "react-native-swipe-gestures";

class Player extends Component {
  /**
   *
   * @param {required} props
   * Use the class constructor to set the initial state
   * for your component.
   */
  constructor(props) {
    super(props);
    this.state = {
      currentTrack: {
        title: "Track Name",
        artist: "Artist Name",
        album:
          "https://images-na.ssl-images-amazon.com/images/I/A1QsthUoerL._SY355_.jpg"
      },
      isModalVisible: false
    };
  }

  /**
   * Handle minimization of player view
   */
  minimize() {
    this.setState({ isModalVisible: true });
    console.log("click - close the player");
    console.log(this.state.isModalVisible);
  }

  onSwipeDown() {
    this.setState({ isModalVisible: true });
    console.log("swipe down - close the player");
    console.log(this.state.isModalVisible);
  }

  render() {
    return (
      // Container View
      <GestureRecognizer
        onSwipeDown={() => {this.onSwipeDown()}}
        style={styles.container}
      >
        <TouchableOpacity
          style={{ alignSelf: "flex-start" }}
          onPress={this.minimize.bind(this)}
        >
          <Button type="minimize" />
        </TouchableOpacity>

        <View style={styles.trackImage}>
          <AlbumVis albumSource={this.state.currentTrack.album} size={200} />
        </View>

        <View style={styles.trackInfo}>
          <Text style={[styles.infoText, styles.titleText]}>
            {this.state.currentTrack.title}
          </Text>
          <Text style={[styles.infoText, styles.artistText]}>
            {this.state.currentTrack.artist}
          </Text>
        </View>

        <View style={styles.row}>
          <TouchableOpacity
            onPress={() => {
              console.log("star");
            }}
          >
            <Button type="pl-star" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              console.log("shuffle");
            }}
          >
            <Button type="pl-shuffle" />
          </TouchableOpacity>
        </View>

        <PlayControl />
      </GestureRecognizer>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 40,
    paddingTop: 50,
    backgroundColor: Colors.defaultBg
  },
  trackImage: {
    marginVertical: 75
  },
  trackInfo: {
    marginTop: 10
  },
  infoText: {
    fontFamily: "Avenir",
    color: Colors.defaultFont,
    textAlign: "center"
  },
  titleText: {
    fontSize: 25
  },
  artistText: {
    fontSize: 20,
    fontWeight: "100"
  },
  row: {
    flexDirection: "row",
    width: "100%",
    marginTop: 15,
    justifyContent: "space-around",
    paddingHorizontal: 80
  }
});

export { Player };