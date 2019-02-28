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
		let temp = this.props.recentRegion;
		this.state = {
			recent : temp
		};
	}

	animate(region) {
		if (region) {
			this.map.animateToRegion(region, 1000);
		}
	}

	componentDidUpdate() {
		if (this.props.recentRegion != this.state.recent ) {
			this.setState({ recent: this.props.recentRegion });
				this.animate(this.props.recentRegion);
		}
	}

	componentDidMount() {
		this.props.initializeMap();
	}
  
  onRegionChangeComplete = (region) => {
		this.props.getMapPos(region);
	}

	render() {
		return (
			<MapView
				ref={el => (this.map = el)}
				provider={PROVIDER_GOOGLE}
				onRegionChangeComplete={this.onRegionChangeComplete}
				showsUserLocation={true}
				showsMyLocationButton={true}
				mapPadding={{ bottom: this.props.paddingBottom ? this.props.paddingBottom : 0}}
				style={[{ flex: 1 }, this.props.style]}
				initialRegion={this.props.region}
				customMapStyle={MapStyle}
				onMapReady={this.onMapReady}
			>
			</MapView>
		);
	}
}

const mapStateToProps = state => ({
	locality: state.map.locality,
	region: state.map.region,
	recentRegion: state.map.recentRegion,
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
