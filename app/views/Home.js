import React, { Component } from "react";
import { StyleSheet, Text, View, ScrollView, TextInput, Image, TouchableOpacity, Modal, Dimensions, Animated } from "react-native";
import { MoodPicker } from "../components/MoodPicker.js";
import Map from "../components/Map";
import { PlaylistCard } from "../components/PlaylistCard";
import {Colors} from "../styles/Colors";
import { getMapAddr, requestAddr } from "../redux/reducers/map.reducer";
import { connect } from "react-redux";

class Home extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isOpen: false,
			topY: new Animated.Value(60),
			modalVisible: false,
			text: this.props.locality
		};
	}

	setModalVisible(visible) {
		this.setState({ modalVisible: visible });
	}

	onPress = () => {
		if (this.state.isOpen) {
			Animated.spring(this.state.topY, {
				toValue: 60,
				friction: 6
			}).start();
		} else {
			Animated.spring(this.state.topY, {
				toValue: 500,
				friction: 6
			}).start();
		}
		this.setState({ isOpen: !this.state.isOpen });
	};

	onChangeText = (text) => {
		this.props.requestAddr(text);
	}

	onSubmit = (text) => {
		this.props.getMapAddr(this.props.locality);
	}

	render() {
		const paddingStyle = {
			paddingTop: this.state.topY
		};

		return (
			<Animated.View style={[styles.container, paddingStyle]}>
				{/*********************************** MAP *********************************************/}
				<View style={styles.map}>
					<Map paddingBottom={45}/>
					<View style={{ flex: 1, flexDirection: "row", justifyContent: "center", marginTop: 65, position: "absolute" }}>
						<TextInput 
							style={{ flex:1, color: "white", marginLeft: 10, fontSize: 28, fontWeight: "bold", paddingRight: 120 }}
							onChangeText={this.onChangeText}
							onSubmitEditing={this.onSubmit}
							value={this.props.locality}
							returnKeyType="search"
						/>

						<TouchableOpacity
							onPress={() => {
								this.setModalVisible(true);
							}}>
							<Image source={require("../assets/moodPicker.png")} style={{}} />
						</TouchableOpacity>
					</View>
				</View>

				{/*********************************** DOWN ARROW *********************************************/}
				<View style={{ width: "100%", height: 60, backgroundColor: "#312F2F", marginTop: 60, borderTopLeftRadius: 14, borderTopRightRadius: 14, alignItems: "center" }}>
					<TouchableOpacity onPress={this.onPress}>
						<Image style={{ marginTop: 15 }} source={require("../assets/down-arrow.png")} />
					</TouchableOpacity>
				</View>

				{/*********************************** SCROLLVIEW 1 *********************************************/}
				<ScrollView style={styles.mainWrapper}>
					<View contentContainerstyle={styles.titleWrapper}>
						<Text style={{ color: "white", marginLeft: 30, fontSize: 20 }}>Top Charts</Text>
					</View>

					<ScrollView style={styles.playlistRow} horizontal={true}>
						<PlaylistCard />
						<PlaylistCard />
						<PlaylistCard />
					</ScrollView>

					{/*********************************** SCROLLVIEW 2 *********************************************/}

					<View contentContainerstyle={styles.titleWrapper}>
						<Text style={{ color: "white", marginLeft: 30, fontSize: 20 }}>Recommended</Text>
					</View>

					<ScrollView style={styles.playlistRow} horizontal={true}>
						<PlaylistCard />
						<PlaylistCard />
						<PlaylistCard />
					</ScrollView>
				</ScrollView>

				<Modal animationType="slide" transparent={true} visible={this.state.modalVisible}>
					<MoodPicker
						closeMp={() => {
							this.setModalVisible(false);
						}}
					/>
				</Modal>
			</Animated.View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		// paddingTop: 60,
		flexDirection: "column",
		position: "relative",

		// alignItems: 'center',
		justifyContent: "flex-start"
	},
	map: {
		position: "absolute",
		zIndex: -100,
		width: "100%",
		height: 600
	},
	mainWrapper: {
		flex: 1,
		// marginTop: 50,
		zIndex: 100,
		backgroundColor: Colors.defaultBg
	},
	playlistRow: {
		flex: 1,
		flexDirection: "row",
		height: 400,
		paddingTop: 20,
		paddingLeft: 30
	},
	cardWrapper: {
		flex: 1,
		flexDirection: "column"
	},
	moodPicker: {
		backgroundColor: Colors.defaultBg,
		height: 1000,
		opacity: 0.95,
		flex: 1,
		flexDirection: "column",
		alignItems: "flex-start"
	}
});

const mapStateToProps = state => ({
	locality: state.map.searchText
});

const mapDispatchToProps = {
	getMapAddr,
	requestAddr
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Home);

