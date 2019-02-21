import React, { Component } from "react";
import { View, StyleSheet, Image, ImageBackground } from "react-native";

class AlbumVis extends Component {
  /**
   *
   * @param {required} props
   * Use the class constructor to set the initial state
   * for your component.
   */
  constructor(props) {
    super(props);
    this.state = {
      imageURI: props.albumSource,
      imageSize: props.size
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <Image
          source={require("./../assets/resonateAnim.gif")}
          resizeMode="cover"
          style={{
            width: this.state.imageSize * 1.3,
            height: this.state.imageSize * 1.3
          }}
        />
        <Image
          source={{ uri: this.state.imageURI }}
          style={[
            styles.top,
            {
              width: this.state.imageSize,
              height: this.state.imageSize,
              borderRadius: this.state.imageSize / 2,
              left: '50%',
              marginLeft: -this.state.imageSize/2
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
    position: "relative"
  },
  top: {
    position: "absolute"
  }
});

export { AlbumVis };
