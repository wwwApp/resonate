import React, { Component } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Modal } from "react-native";
import { ButtonIcon } from "../components/ButtonIcon";
import { AlbumVis } from "../components/AlbumVis";
/* import PlayControl from "./PlayControl"; */
import Icon from "react-native-vector-icons/Ionicons";
import { Colors } from "../styles/Colors";
import { PlayerBar } from "../components/PlayerBar";
import { Seeker } from "../components/Seeker";
import GestureRecognizer from "react-native-swipe-gestures";
import { connect } from "react-redux";
import {
  togglePlayerView,
  incrementSeeker,
  resetSeeker,
  togglePlay,
  getCurrentTrack,
  getNextTrack,
  getPrevTrack
} from "../redux/reducers/player.reducer";
/* import Modal from "react-native-modal"; */

class Player extends Component {
  componentDidMount(){
    this.props.getCurrentTrack();
  }

  constructor(props) {
    super(props);
    this.state = {
      toggleIcon: "ios-play",
      timer: null
    };
  }

  /**
   * Handle minimization of player view
   */
  toggleView() {
    this.props.toggleView();
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
  async togglePlay() {
    this.props.togglePlay();
    let toggleIcon = "";
    if (this.state.toggleIcon == "ios-play") {
      toggleIcon = "ios-pause";
    } else {
      toggleIcon = "ios-play";
    }
    this.setState({ toggleIcon });
  }

  /**
   * Handle the progress animation on seeker
   */
  progressSeeker() {
    if (this.props.isPlaying === true) {
      this.state.timer = setInterval(() => {
        this.props.increment();

        // When it reaches the end of the current track
        if (this.props.counter === this.props.duration) {
          // Make some call for next track
          this.props.forward();
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
    this.props.reset();
    clearInterval(this.state.timer);
    this.progressSeeker();

    // Code for go forward
    this.props.forward();
  }

  /**
   * Handle backward event
   */
  backward() {
    this.props.reset();
    clearInterval(this.state.timer);
    this.progressSeeker();

    // Code for go backward
    this.props.backward();
  }

  render() {
    return (
      // Container View
      <View>
        <GestureRecognizer onSwipeUp={() => this.toggleView()}>
          <PlayerBar
            isVisible={!this.props.isFull}
            albumSource={this.props.currentTrack.album}
            play={() => this.play()}
            forward={() => this.forward()}
            backward={() => this.backward()}
            percentage={this.props.percentage}
            currentTrack={this.props.currentTrack}
            toggleIcon={this.state.toggleIcon}
            isPlaying={this.props.isPlaying}
          />
        </GestureRecognizer>

        <GestureRecognizer onSwipeDown={() => this.toggleView()}>
          <Modal visible={this.props.isFull} animationType={"slide"}>
            <View style={styles.container}>
              <View style={{ alignSelf: "flex-end" }}>
                <ButtonIcon type="minimize" onPress={this.toggleView.bind(this)} />
              </View>

              <View style={styles.trackImage}>
                <AlbumVis
                  albumSource={this.props.currentTrack.album}
                  size={200}
                  isPlaying={this.props.isPlaying}
                />
              </View>

              <View style={styles.trackInfo}>
                <Text style={[styles.infoText, styles.titleText]}>
                  {this.props.currentTrack.title}
                </Text>
                <Text style={[styles.infoText, styles.artistText]}>
                  {this.props.currentTrack.artist}
                </Text>
              </View>

              <View style={styles.row}>
                <TouchableOpacity>
                  <ButtonIcon type="pl-star" />
                </TouchableOpacity>
                <TouchableOpacity>
                  <ButtonIcon type="pl-shuffle" />
                </TouchableOpacity>
              </View>

              <View style={{ width: "100%", height: "auto" }}>
                <View>
                  {/* <Text style={styles.timeText}>
            {this.formatDuration(this.state.counter)}
          </Text> */}
                  <View style={styles.seekerContainer}>
                    <Seeker percentage={this.props.percentage} />
                  </View>
                  {/* <Text style={styles.timeText}>
            {this.formatDuration(this.state.trackDuration)}
          </Text> */}
                </View>

                <View style={styles.controlGroup}>
                  <ButtonIcon
                    type="pc-backward"
                    size={40}
                    onPress={this.backward.bind(this)}
                  />

                  <ButtonIcon
                    type="pc-play"
                    size={70}
                    toggleIcon={this.state.toggleIcon}
                    onPress={this.play.bind(this)}
                  />

                  <ButtonIcon
                    type="pc-forward"
                    size={40}
                    onPress={this.forward.bind(this)}
                  />
                </View>
              </View>
            </View>
          </Modal>
        </GestureRecognizer>
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
    marginVertical: 150
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
  },
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
    backgroundColor: Colors.seekerInactive,
    marginVertical: 30
  },
  timeText: {
    color: Colors.defaultFont
  }
});

// This function provides a means of sending actions so that data in the Redux store
// can be modified. In this example, calling this.props.addToCounter() will now dispatch
// (send) an action so that the reducer can update the Redux state.
function mapDispatchToProps(dispatch) {
  return {
    toggleView: () => dispatch(togglePlayerView()),
    increment: () => dispatch(incrementSeeker()),
    reset: () => dispatch(resetSeeker()),
    togglePlay: () => dispatch(togglePlay()),
    getCurrentTrack: () => dispatch(getCurrentTrack()),
    forward: () => dispatch(getNextTrack()),
    backward: () => dispatch(getPrevTrack())
  };
}

// This function provides access to data in the Redux state in the React component
// In this example, the value of this.props.count will now always have the same value
// As the count value in the Redux state
function mapStateToProps(state) {
  return {
    isFull: state.player.isFull,
    currentTrack: state.player.currentTrack,
    isPlaying: state.player.isPlaying,
    currentTrack: state.player.currentTrack,
    counter: state.player.counter,
    percentage: state.player.percentage,
    currentPlaylist: state.player.currentPlaylist
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Player);
