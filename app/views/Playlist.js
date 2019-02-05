import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import { TrackList } from "./../components/TrackList";
import { Button } from "./../components/Button";
import { Tag } from "./../components/Tag";
import { PlaylistPlayButton } from "./../components/PlaylistPlayButton";
import LinearGradient from "react-native-linear-gradient";
import { Colors } from "./../styles/Colors";

class Playlist extends Component {
  /**
   *
   * @param {required} props
   * Use the class constructor to set the initial state
   * for your component.
   */
  constructor(props) {
    super(props);
    this.state = {
      title: "Playlist Title",
      user: "@User",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      albumImg:
        "https://images-na.ssl-images-amazon.com/images/I/A1QsthUoerL._SY355_.jpg",
      tag: ["Tag1", "Tag2", "Tag3"],
      location: "Location",
      mood: "Mood",
      tracks: [
        { trackInfo: "Track 1", artistInfo: "Artist1", duration: "03:00" },
        { trackInfo: "Track 2", artistInfo: "Artist2", duration: "03:00" },
        { trackInfo: "Track 3", artistInfo: "Artist3", duration: "03:00" },
        { trackInfo: "Track 4", artistInfo: "Artist4", duration: "03:00" },
        { trackInfo: "Track 5", artistInfo: "Artist5", duration: "03:00" },
        { trackInfo: "Track 6", artistInfo: "Artist6", duration: "03:00" },
        { trackInfo: "Track 6", artistInfo: "Artist6", duration: "03:00" },
        { trackInfo: "Track 6", artistInfo: "Artist6", duration: "03:00" },
        { trackInfo: "Track 6", artistInfo: "Artist6", duration: "03:00" },
        { trackInfo: "Track 6", artistInfo: "Artist6", duration: "03:00" },
        { trackInfo: "Track 6", artistInfo: "Artist6", duration: "03:00" },
        { trackInfo: "Track 6", artistInfo: "Artist6", duration: "03:00" }
      ]
    };
  }

  render() {
    return (
      // Container View
      // Change the color values based on mood calculated from server for bg color
      <LinearGradient
        style={styles.container}
        colors={[Colors.tintTopGradient, Colors.tintBottomGradient]}
      >
        <View style={styles.playButton}>
          <PlaylistPlayButton />
        </View>
        <View style={styles.topIconGroup}>
          <Button type="return" />
          <View style={styles.rightIcon}>
            <Button type="heart" />
            <Button type="more" />
          </View>
        </View>

        <View>
          <Text style={[styles.playlistItem, styles.title, styles.txtBold]}>
            {this.state.title}
          </Text>
          <Text style={[styles.playlistItem, styles.location, styles.txtLight]}>
            {this.state.location}
          </Text>
          <View style={[styles.playlistItem, styles.tag]}>
            <Tag tagData={this.state.tag} />
          </View>
          <Text style={styles.playlistItem}>{this.state.description}</Text>
          <Text style={[styles.playlistItem, styles.user, styles.txtLight]}>
            {this.state.user}
          </Text>
        </View>
        <TrackList trackData={this.state.tracks} />
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 40,
    paddingTop: 50
  },
  topIconGroup: {
    width: "100%",
    height: "auto",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20
  },
  rightIcon: {
    flexDirection: "row"
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
  playButton: {
    position: "absolute",
    top: 130,
    right: 35,
    zIndex: 9999
  }
});

export default Playlist;
