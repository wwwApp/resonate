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
        imageURI: props.albumSource
    };
  }

  render() {
    return (
      <View>
          <Image source={{uri:this.state.imageURI}}
              style={{width: 200, height: 200, borderRadius: 200/2}} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
});

export { AlbumVis };
