import React, { Component } from 'react';
import { Text, StyleSheet, View, ScrollView } from "react-native";
import { Button } from "./Button";
import { Colors } from "../styles/Colors";

class TrackList extends Component {
  /**
   *
   * @param {required} props
   * Use the class constructor to set the initial state
   * for your component.
   */
  constructor(props) {
    super(props);
  }

  render() {
    return (
      // Scrollview of available track item
      <ScrollView style={styles.trackListStyle}>
        {this.props.trackData.map((item, index) => (
          <View key={index} style={styles.trackContainer}>
            <View style={styles.trackInfoStyle}>
              <Text style={styles.trackItem}>{item.title}</Text>
              <Text style={[styles.trackItem, styles.arist, styles.txtLight]}>
                {item.artists.join(", ")}
              </Text>
            </View>
            <View style={styles.trackIconStyle}>
              <Button style={styles.trackItem} type="track-star" />
              <Button style={styles.trackItem} type="track-more" />
            </View>
          </View>
        ))}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  trackListStyle: {
    maxWidth: "100%"
  },
  trackContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    width: "100%",
    paddingVertical: 10
  },
  trackItem: {
    fontFamily: "Avenir",
    color: Colors.defaultFont,
    fontSize: 16
  },
  arist: {
    fontSize: 13
  },
  trackIconStyle: {
    flexDirection: "row"
  },
  txtLight: {
    fontWeight: "100"
  }
});

export { TrackList };
