import React, { Component } from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { AlbumVis } from "./AlbumVis";
import { Seeker } from "./Seeker";
import LinearGradient from "react-native-linear-gradient";
import { Colors } from "../styles/Colors";
import { Button } from "./Button";

class PlayerBar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    if (this.props.isVisible === true) {
      return (
        <LinearGradient
          style={styles.modalContainer}
          colors={[Colors.minPlayerTopGradient, Colors.minPlayerBottomGradient]}
        >
          {/* <GestureRecognizer onSwipeUp={() => this.onSwipeUp()}> */}
          <View style={styles.firstRow}>
            <Button
              type="pc-backward"
              size={35}
              onPress={this.props.backward}
            />

            <View style={styles.playContainer}>
              <AlbumVis albumSource={this.props.currentTrack.album} size={70} />
              <View style={styles.playButton}>
                <Button
                  type="pc-play"
                  size={50}
                  toggleIcon={this.props.toggleIcon}
                  onPress={this.props.play}
                />
              </View>
            </View>

            <Button type="pc-forward" size={35} onPress={this.props.forward} />
          </View>

          <View style={styles.secondRow}>
            <Seeker percentage={this.props.percentage} />
          </View>
          {/* </GestureRecognizer> */}
        </LinearGradient>
      );
    } else {
      return null;
    }
  }
}

const styles = StyleSheet.create({
  modalContainer: {},
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

export { PlayerBar };
