import React, { Component } from 'react';
import { View, StyleSheet, Image } from "react-native";
import { ScrollView } from 'react-native-gesture-handler';

var fakeData = {
	trackListA: [
		{
			title:"track 1",
			artists: [
				"artist 1"
			],
			album: "album 1"
		},
		{
			title:"track 2",
			artists: [
				"artist 2"
			],
			album: "album 2"
		},
		{
			title:"track 3",
			artists: [
				"artist 3"
			],
			album: "album 3"
		},
	],
	trackListB: [
		{
			title:"track 4",
			artists: [
				"artist 4"
			],
			album: "album 4"
		},
		{
			title:"track 5",
			artists: [
				"artist 5"
			],
			album: "album 5"
		},
		{
			title:"track 6",
			artists: [
				"artist 6"
			],
			album: "album 6"
		},
	]
}

class TrackView extends Component {
	render() {
		return (
			<View style={styles.red}>
				<Text>{this.props.track.title}</Text>
				<Text>{this.props.track.artists[0]}</Text>
				<Text>{this.props.track.album}</Text>
			</View>
		)
	}
}

class TrackStack extends Component {
	render() {
		return (
			<View>
				<ScrollView horizontal={true}>
					{fakeData.trackListA.map((item, index) => (
						<TrackView track={item} />
					))}
				</ScrollView>
				<ScrollView horizontal={true}>
					{fakeData.trackListB.map((item, index) => (
						<TrackView track={item} />
					))}
				</ScrollView>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	trackView: {
	  backgroundColor: Colors.tintBottomGradient,
	  margin: 5,
	  width: 50,
	  height: 50
	}
  });

  export {TrackStack};