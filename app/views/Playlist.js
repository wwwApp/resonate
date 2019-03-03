import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import { TrackList } from "./../components/TrackList";
import { ButtonIcon } from "../components/ButtonIcon";
import Player from "./Player";
import { Tag } from "./../components/Tag";
import LinearGradient from "react-native-linear-gradient";
import { Colors } from "./../styles/Colors";
import {
  getPlaylist,
  togglePlaylistView,
  toggleHeart,
  toggleFirstPlay
} from "../redux/reducers/playlist.reducer";
import { togglePlay, pushTracks } from "../redux/reducers/player.reducer";
import { connect } from "react-redux";

class Playlist extends Component {
  componentDidMount() {
    this.props.getPlaylist(this.props.id);
    if (this.props.isHearted) {
      this.state.toggleHeartIcon = "ios-heart";
    } else {
      this.state.toggleHeartIcon = "ios-heart-empty";
    }
  }

  constructor(props) {
    super(props);
    this.state = {
      toggleHeartIcon: "ios-heart-empty"
    };
  }

  /**
   * Push tracks to player and open it
   */
  async play() {
    await this.props.pushTracks(this.props.playlist.tracks);
    await this.props.togglePlay();
    await this.openPlayer();
  }

  async heart() {
    await this.props.toggleHeart();
    await togglePlay();
    await this.toggleHeart();
  }

  toggleHeart() {
    let toggleHeartIcon = "";
    if (this.props.isHearted) {
      toggleHeartIcon = "ios-heart";
    } else {
      toggleHeartIcon = "ios-heart-empty";
    }
    this.setState({ toggleHeartIcon });

    //this.props.getPlaylist("fdsafdsgjhakfgkjads")
  }

  openPlayer() {
    // Only toggle from true to false on the very first click
    if (this.props.isFirstPlay) {
      this.props.toggleFirstPlay();
    }
  }

  render() {
    return (
      // Container View
      // Change the color values based on mood calculated from server for bg color
      <LinearGradient
        style={styles.container}
        colors={[Colors.tintTopGradient, Colors.tintBottomGradient]}
      >
        {!this.props.isLoading && [
          <View style={[styles.playButtonContainer, styles.playButtonIcon]}>
            <ButtonIcon
              style={{ color: "black" }}
              type="pl-play"
              toggleIcon={this.props.toggleIcon}
              // toggleIcon="ios-play"
              size={50}
              onPress={this.play.bind(this)}
            />
          </View>,
          <View style={styles.topIconGroup}>
            <ButtonIcon
              type="return"
              onPress={() => {
                this.props.navigation.goBack(null);
              }}
            />
            <View style={{ flexDirection: "row" }}>
              <ButtonIcon
                type="heart"
                onPress={this.heart.bind(this)}
                toggleIcon={this.state.toggleHeartIcon}
              />

              <ButtonIcon type="more" />
            </View>
          </View>,
          <View style={{ width: "100%" }}>
            <Text style={[styles.playlistItem, styles.title, styles.txtBold]}>
              {this.props.playlist.title}
            </Text>
            <Text
              style={[styles.playlistItem, styles.location, styles.txtLight]}
            >
              {this.props.playlist.location_name || "location"}
            </Text>
            <View style={[styles.playlistItem, styles.tag]}>
              <Tag tagData={this.props.playlist.tags} />
            </View>
            <Text style={styles.playlistItem}>
              {this.props.playlist.description}
            </Text>
            <Text style={[styles.playlistItem, styles.user, styles.txtLight]}>
              @{this.props.playlist.user.display_name}
            </Text>
          </View>,
          <TrackList trackData={this.props.playlist.tracks} />
        ]}

        {/** ADD PLAYER TO THE VIEW */}
        <View
          style={[
            this.props.isFirstPlay ? { width: 0 } : {},
            { position: "absolute", bottom: 0, right: 0, left: 0 }
          ]}
        >
          <Player />
        </View>
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 35,
    paddingTop: 50
  },
  topIconGroup: {
    width: "100%",
    height: "auto",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
    alignItems: "center"
  },
  playlistItem: {
    fontFamily: "Avenir",
    color: Colors.defaultFont
  },
  title: {
    fontSize: 30
  },
  location: {
    fontSize: 20
  },
  tag: {
    marginTop: 20,
    marginBottom: 20
  },
  user: {
    marginTop: 5,
    marginBottom: 30
  },
  txtBold: {
    fontWeight: "bold"
  },
  txtLight: {
    fontWeight: "100"
  },
  playButtonContainer: {
    position: "absolute",
    top: 130,
    right: 30,
    zIndex: 9999
  },
  playButtonIcon: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: 90,
    height: 90,
    backgroundColor: "#E7E7E7",
    borderRadius: 90
  }
});

const mapStateToProps = state => ({
  playlist: state.playlist.playlist,
  isLoading: state.playlist.loading,
  isHearted: state.playlist.isHearted, // Needs be state.playlist.playlist.isHearted,
  isFirstPlay: state.playlist.isFirstPlay, // once this data gets integrated in database
  tracks: state.player.tracks,
  toggleIcon: state.player.toggleIcon
});

const mapDispatchToProps = {
  getPlaylist,
  togglePlaylistView,
  toggleHeart,
  toggleFirstPlay,
  pushTracks,
  togglePlay
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Playlist);
