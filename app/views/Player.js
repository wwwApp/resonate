import React, { Component } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Modal } from "react-native";
import { ButtonIcon } from "../components/ButtonIcon";
import { AlbumVis } from "../components/AlbumVis";
import { Colors } from "../styles/Colors";
import { PlayerBar } from "../components/PlayerBar";
import { Seeker } from "../components/Seeker";
import GestureRecognizer from "react-native-swipe-gestures";
import { connect } from "react-redux";
import {
  togglePlayerView,
  togglePlay,
  incrementSeeker,
  resetSeeker,
  getCurrentTrack,
  replay,
  replay_back,
  forward,
  backward
} from "../redux/reducers/player.reducer";

class Player extends Component {
  componentDidMount() {
    this.props.getCurrentTrack();
  }

  /**
   * Handle sync of seeker from playlist play action
   */
  // componentDidUpdate(prevProps, prevState) {
  //   // only update chart if the data has changed
  //   if (prevProps.isPlaying !== this.props.isPlaying) {
  //     this.progressSeeker();
  //   }
  // }

  constructor(props) {
    super(props);
    this.state = {
      timer: null,
      // isPlaying: this.props.isPlaying
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
    await this.props.togglePlay();
    await this.progressSeeker();
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
          this.forward();
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

    // Code for go forward
    if (this.props.currentTrackIndex === this.props.tracks.length - 1) {
      this.props.replay();
    } else {
      this.props.forward();
    }

    this.progressSeeker();
  }

  /**
   * Handle backward event
   */
  backward() {
    this.props.reset();
    clearInterval(this.state.timer);

    // Code for go backward
    if (this.props.currentTrackIndex === 0) {
      this.props.replay_back();
    } else {
      this.props.backward();
    }

    this.progressSeeker();
  }

  render() {
    return (
      // Container View
      <View>
        <GestureRecognizer onSwipeUp={() => this.toggleView()}>
          <PlayerBar
            isVisible={!this.props.isFull}
            albumSource={this.props.currentTrack.image_url}
            play={() => this.play()}
            forward={() => this.forward()}
            backward={() => this.backward()}
            percentage={this.props.percentage}
            toggleIcon={this.props.toggleIcon}
            isPlaying={this.props.isPlaying}
          />
        </GestureRecognizer>

        <GestureRecognizer onSwipeDown={() => this.toggleView()}>
          <Modal visible={this.props.isFull} animationType={"slide"}>
            <View style={styles.container}>
              <View style={{ alignSelf: "flex-end" }}>
                <ButtonIcon
                  type="minimize"
                  onPress={this.toggleView.bind(this)}
                />
              </View>

              <View style={styles.trackImage}>
                <AlbumVis
                  albumSource={this.props.currentTrack.image_url}
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
                    toggleIcon={this.props.toggleIcon}
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
    getCurrentTrack: () => dispatch(getCurrentTrack()),
    forward: () => dispatch(forward()),
    backward: () => dispatch(backward()),
    replay: () => dispatch(replay()),
    replay_back: () => dispatch(replay_back()),
    togglePlay: () => dispatch(togglePlay())
  };
}

// This function provides access to data in the Redux state in the React component
// In this example, the value of this.props.count will now always have the same value
// As the count value in the Redux state
function mapStateToProps(state) {
  return {
    tracks: state.player.tracks,
    currentTrackIndex: state.player.currentTrackIndex,
    currentTrack: state.player.currentTrack,
    isFull: state.player.isFull,
    isPlaying: state.player.isPlaying,
    counter: state.player.counter,
    percentage: state.player.percentage,
    toggleIcon: state.player.toggleIcon
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Player);
