import React, { Component } from "react";
import { Text, StyleSheet, View, ScrollView } from "react-native";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import MapStyle from "../styles/MapStyle.json";
import Geocoder from "react-native-geocoder";
import { getMapPos, getMapAddr, initializeMap } from "../redux/reducers/map.reducer";
import { connect } from "react-redux";

class Map extends Component {
	constructor(props) {
		super(props);
		this.state = {
			prevPos: null,
			curPos: { latitude: 37.420814, longitude: -122.081949 },
			curAng: 45,
			latitudeDelta: 0.0922,
			longitudeDelta: 0.0421
		};
	}

	animate(region) {
		// this.changePosition(0.0001, 0)
		this.map.animateToRegion(region, 1000);
	}

	componentDidUpdate() {
    console.log("update: ", this.props.region != this.state.region)
		if (this.props.region != this.state.region) {
			this.setState({ region: this.props.region });
			this.animate(this.props.region);
		}
	}

	componentDidMount() {
		this.props.initializeMap();
  }
  
  onRegionChangeComplete = (region) => {
    pos = {
      lat: region.latitude,
      lng: region.longitude,
    }
    this.props.getMapPos(pos);
  }

	render() {
		return (
			<MapView
				ref={el => (this.map = el)}
				provider={PROVIDER_GOOGLE}
				onRegionChangeComplete={this.onRegionChangeComplete}
				showsUserLocation={true}
				showsMyLocationButton={true}
				mapPadding={{ bottom: 45 }}
				style={{ flex: 1 }}
				initialRegion={this.props.region}
        customMapStyle={MapStyle}
        onPress={() => {this.props.getMapAddr("New York")}}
			></MapView>
		);
	}
}

const mapStateToProps = state => ({
	locality: state.map.locality,
	region: state.map.region
});

const mapDispatchToProps = {
	getMapAddr,
	getMapPos,
	initializeMap
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Map);
