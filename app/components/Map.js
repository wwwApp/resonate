import React, { Component } from 'react';
import { Text, StyleSheet, View, ScrollView } from "react-native";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import MapStyle from "../styles/MapStyle.json";

class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      region: {
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421
      }
    };
  }

  // onRegionChange = (region) => {
  //   this.setState({ region });
  // }

  render() {
    return (<MapView
      provider={PROVIDER_GOOGLE}
      onRegionChange={this.onRegionChange}
      style={{ flex: 1 }}
      region={this.state.region}
      customMapStyle={MapStyle}
    />
    );
  }
}


export { Map };