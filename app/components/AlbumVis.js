import React, { Component } from "react";
import { View, StyleSheet, Image } from "react-native";

class AlbumVis extends Component {

  render() {
    return (
      <View style={styles.container}>
        <Image
          source={require("./../assets/resonateAnim.gif")}
          resizeMode="cover"
          style={[
            this.props.isPlaying
              ? { width: this.props.size * 1.3, height: this.props.size * 1.3 }
              : { width: 0 }
          ]}
        />
        <Image
          source={{ uri: this.props.albumSource }}
          style={[
            styles.top,
            {
              width: this.props.size,
              height: this.props.size,
              borderRadius: this.props.size / 2,
              left: "50%",
              marginLeft: -this.props.size / 2
            }
          ]}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    position: "relative",
    height: 80
  },
  top: {
    position: "absolute"
  }
});

export { AlbumVis };
