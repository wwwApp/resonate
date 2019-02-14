import React, { Component } from 'react';
import { View, StyleSheet, Image } from "react-native";

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
      <View>
          <Image source={{uri:this.state.imageURI}}
              style={{width: this.state.imageSize, height: this.state.imageSize, borderRadius: this.state.imageSize/2}} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
});

export { AlbumVis };