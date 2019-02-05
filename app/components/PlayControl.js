import React, { Component } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
/* import ProgressBar from "react-native-progress/Bar"; */
import { Seeker } from "./../components/Seeker";
import { Colors } from "./../styles/Colors";

class PlayControl extends Component {
  /**
   *
   * @param {required} props
   * Use the class constructor to set the initial state
   * for your component.
   */
  constructor(props) {
    super(props);
    this.state = {
      trackDuration: 180,
      isPlaying: false,
      toggleIcon: "ios-play",
      timer: null,
      counter: 0,
      percentage: 0
    };
  }

  /**
   * Handle the play/pause button press event.
   */
  play() {
    this.togglePlay();
    this.progressSeeker();
  }

  /**
   * Handle toggle of play state and icon
   */
  togglePlay() {
    const isPlaying = !this.state.isPlaying;
    const toggleIcon = isPlaying ? "ios-pause" : "ios-play";
    this.setState({ isPlaying, toggleIcon });
  }

  /**
   * Handle the progress animation on seeker
   */
  progressSeeker() {
    if (this.state.isPlaying === false) {
      this.state.timer = setInterval(() => {
        let updatedCounter = this.state.counter + 1;
        let progress = (updatedCounter / this.state.trackDuration) * 100;
        this.setState({ counter: updatedCounter, percentage: progress });
        console.log("ticking:" + this.state.counter);

        // When it reaches the end of the current track
        if (this.state.percentage === this.state.trackDuration) {
          return;
          // Make some call for next track
        }
      }, 1000);
    } else {
      clearInterval(this.state.timer);
    }
  }

  /**
   * Handle forward event
   */
  forward() {
    this.setState({ counter: 0, percentage: 0 });
    clearInterval(this.state.timer);
    this.togglePlay();
  }

  /**
   * Handle backward event
   */
  backward() {
    this.setState({ counter: 0, percentage: 0 });
    clearInterval(this.state.timer);
    this.togglePlay();
  }

  render() {
    return (
      <View style={{ width: "100%" }}>
        <View style={styles.firstRow}>
          <TouchableOpacity>
            <Icon style={styles.iconStyle} name="ios-star-outline" size={35} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Icon style={styles.iconStyle} name="ios-repeat" size={35} />
          </TouchableOpacity>
        </View>

        <View style={styles.seekerContainer}>
          <Seeker percentage={this.state.percentage} />
        </View>

        <View style={styles.secondRow}>
          <TouchableOpacity>
            <Icon
              style={styles.iconStyle}
              name="ios-skip-backward"
              size={40}
              onPress={this.forward.bind(this)}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={this.play.bind(this)}>
            <Icon
              style={styles.iconStyle}
              name={this.state.toggleIcon}
              size={70}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <Icon
              style={styles.iconStyle}
              name="ios-skip-forward"
              size={40}
              onPress={this.backward.bind(this)}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  iconStyle: {
    color: Colors.defaultIcon
  },
  firstRow: {
    flexDirection: "row",
    marginTop: 15,
    justifyContent: "space-around",
    paddingHorizontal: 80
  },
  secondRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 30
  },
  seekerContainer: {
    height: 5,
    marginVertical: 30,
    marginHorizontal: -40,
    backgroundColor: Colors.seekerInactive
  }
});

export { PlayControl };
