import React, { Component } from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { AlbumVis } from "./AlbumVis";
import { PlayControl, PCBackward, PCForward, PCPlay } from "./PlayControl";
import { Seeker } from "./Seeker";
import LinearGradient from "react-native-linear-gradient";
import { Colors } from "../styles/Colors";
import GestureRecognizer from "react-native-swipe-gestures";

/**
 * All screens/views should be styled with flexbox in order for player modal to work
 */

class PlayerModal extends PlayControl {
  constructor(props) {
    super(props);
    this.state = {
      currentTrack: {
        title: "Track Name",
        artist: "Artist Name",
        album:
          "https://images-na.ssl-images-amazon.com/images/I/A1QsthUoerL._SY355_.jpg"
      },
      isMinimized: false,
      trackDuration: 180,
      isPlaying: false,
      toggleIcon: "ios-play",
      timer: null,
      counter: 0,
      percentage: 0,
      isModalVisible: props.isVisible
    };
  }

  /**
   * Handle swipe-up event on player modal to open player compo/view
   */
  onSwipeUp() {
    this.setState({ isModalVisible: false})
    console.log("swiped up - open the player");
    console.log(this.state.isModalVisible)

  }

  render() {
    if (this.state.isModalVisible === true) {
      return (
        <LinearGradient
          style={styles.modalContainer}
          colors={[Colors.minPlayerTopGradient, Colors.minPlayerBottomGradient]}
        >
          <GestureRecognizer onSwipeUp={() => this.onSwipeUp()}>
            <View style={styles.firstRow}>
              <TouchableOpacity onPress={this.backward.bind(this)}>
                <PCBackward size={35} />
              </TouchableOpacity>

              <View style={styles.playContainer}>
                <AlbumVis
                  albumSource={this.state.currentTrack.album}
                  size={70}
                />
                <TouchableOpacity
                  onPress={this.play.bind(this)}
                  style={styles.playButton}
                >
                  <PCPlay iconName={this.state.toggleIcon} size={50} />
                </TouchableOpacity>
              </View>

              <TouchableOpacity onPress={this.forward.bind(this)}>
                <PCForward size={35} />
              </TouchableOpacity>
            </View>

            <View style={styles.secondRow}>
              <Seeker percentage={this.state.percentage} />
            </View>
          </GestureRecognizer>
        </LinearGradient>
      );
    } else {
      return null;
    }
  }
}

const styles = StyleSheet.create({
  modalContainer: {
    height: "auto",
    width: "100%",
    position: "absolute",
    alignSelf: "flex-end",
    bottom: 0
  },
  firstRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    paddingHorizontal: 20
  },
  secondRow: {},
  playContainer: {
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 15
  },
  playButton: {
    position: "absolute"
  }
});

export { PlayerModal };