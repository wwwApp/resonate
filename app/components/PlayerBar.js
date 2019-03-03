import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import { AlbumVis } from "./AlbumVis";
import { Seeker } from "./Seeker";
import LinearGradient from "react-native-linear-gradient";
import { Colors } from "../styles/Colors";
import { ButtonIcon } from "./ButtonIcon";

class PlayerBar extends Component {
  render() {
    if (this.props.isVisible === true) {
      return (
        <LinearGradient
          style={styles.modalContainer}
          colors={[Colors.minPlayerTopGradient, Colors.minPlayerBottomGradient]}
        >
          <View style={styles.firstRow}>
            <ButtonIcon
              type="pc-backward"
              size={35}
              onPress={this.props.backward}
            />

            <View style={styles.playContainer}>
              <AlbumVis
                albumSource={this.props.albumSource}
                size={70}
                isPlaying={this.props.isPlaying}
              />
              <View style={styles.playButton}>
                <ButtonIcon
                  type="pc-play"
                  size={50}
                  toggleIcon={this.props.toggleIcon}
                  onPress={this.props.play}
                />
              </View>
            </View>

            <ButtonIcon
              type="pc-forward"
              size={35}
              onPress={this.props.forward}
            />
          </View>

          <View style={styles.secondRow}>
            <Seeker percentage={this.props.percentage} />
          </View>
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
    justifyContent: "space-between",
    paddingHorizontal: 60
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
