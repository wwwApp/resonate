import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button } from "./../components/Button";
import { AlbumVis } from "./../components/AlbumVis";
import { PlayControl } from "./../components/PlayControl";
import { Colors } from "../styles/Colors";

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
      isMinimized: false
    };
  }

  render() {
    return (
      // Container View
      <View style={styles.container}>
        <View style={{alignSelf:'flex-start'}}>
          <Button type="minimize" />
        </View>

        <View style={styles.trackImage}>
          <AlbumVis albumSource={this.state.currentTrack.album} />
        </View>

        <View style={styles.trackInfo}>
          <Text style={[styles.infoText, styles.titleText]}>
            {this.state.currentTrack.title}
          </Text>
          <Text style={[styles.infoText, styles.artistText]}>
            {this.state.currentTrack.artist}
          </Text>
        </View>

        <PlayControl />
      </View>
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
    marginTop: 15
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
  }
});

export default Player;
