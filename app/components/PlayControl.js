import React, { Component } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
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
  async play() {
    await this.togglePlay();
    await this.progressSeeker();
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
    console.log(this.state.isPlaying);
    if (this.state.isPlaying === true) {
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
    this.progressSeeker();

    // Code for go forward
  }

  /**
   * Handle backward event
   */
  backward() {
    this.setState({ counter: 0, percentage: 0 });
    clearInterval(this.state.timer);
    this.progressSeeker();

    // Code for go backward
  }

  /**
   * Handle formatting of track duration
   */

  formatDuration(durationInSec) {
    let minutes = Math.floor((durationInSec % 3600) / 60);
    let seconds = Math.floor(durationInSec % 60);
    if (minutes < 10) {
      minutes = "0" + minutes;
    }
    if (seconds < 10) {
      seconds = "0" + seconds;
    }

    return minutes + ":" + seconds;
  }

  render() {
    return (
      <View style={{ width: "100%", height: "auto" }}>
        <View>
          {/* <Text style={styles.timeText}>
            {this.formatDuration(this.state.counter)}
          </Text> */}
          <View style={styles.seekerContainer}>
            <Seeker percentage={this.state.percentage} />
          </View>
          {/* <Text style={styles.timeText}>
            {this.formatDuration(this.state.trackDuration)}
          </Text> */}
        </View>

        <View style={styles.controlGroup}>
          <TouchableOpacity onPress={this.backward.bind(this)}>
            <PCBackward size={40} />
          </TouchableOpacity>
          <TouchableOpacity onPress={this.play.bind(this)}>
            <PCPlay iconName={this.state.toggleIcon} size={70} />
          </TouchableOpacity>

          <TouchableOpacity onPress={this.forward.bind(this)}>
            <PCForward size={40} />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const PCForward = props => {
  return (
    <Icon style={styles.iconStyle} name="ios-skip-forward" size={props.size} />
  );
};

const PCBackward = props => {
  return (
    <Icon style={styles.iconStyle} name="ios-skip-backward" size={props.size} />
  );
};

const PCPlay = props => {
  return (
    <Icon style={styles.iconStyle} name={props.iconName} size={props.size} />
  );
};

const styles = StyleSheet.create({
  iconStyle: {
    color: Colors.defaultIcon
  },
  controlGroup: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 30
  },
  seekerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: Colors.seekerInactive,
    marginVertical: 30
  },
  timeText: {
    color: Colors.defaultFont
  }
});

export { PlayControl, PCBackward, PCForward, PCPlay };