import React, { Component } from "react";
import { StyleSheet, Text, View, ScrollView, TextInput, Image, TouchableOpacity, Modal, Animated } from "react-native";
import { MoodPicker } from "../components/MoodPicker.js";
import Map from "../components/Map";
import { PlaylistCard } from "../components/PlaylistCard";
import { Colors } from "../styles/Colors";
import { getMapAddr, requestAddr } from "../redux/reducers/map.reducer";
import { setMood } from "../redux/reducers/home.reducer";
import { connect } from "react-redux";
import { ButtonIcon } from "../components/ButtonIcon";
import LinearGradient from "react-native-linear-gradient";

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

	onChangeText = text => {
		this.props.requestAddr(text);
	};

	onSubmit = text => {
		this.props.getMapAddr(this.props.locality);
	};

	render() {
		const paddingStyle = {
			paddingTop: this.state.topY
		};

		const moodOffset = {
			transform: [{ translateX: this.props.coordinates.x / 10 }, { translateY: this.props.coordinates.y / 10 }]
		};

		return (
			<Animated.View style={[styles.container, paddingStyle]}>
				{/*********************************** MAP *********************************************/}
				<View style={styles.map}>
					<Map paddingBottom={45} />
					<View style={{ flex: 1, flexDirection: "row", justifyContent: "flex-start", marginTop: 65, position: "absolute", paddingLeft: 16, paddingRight: 16 }}>
						<TextInput
							style={{ flex: 1, color: "white", fontSize: 28, fontWeight: "bold", paddingRight: 20, lineHeight: 42 }}
							onChangeText={this.onChangeText}
							onSubmitEditing={this.onSubmit}
							value={this.props.locality}
							returnKeyType="search"
						/>

						<TouchableOpacity
							onPress={() => {
								this.setModalVisible(true);
							}}>
							<View style={styles.moodIconOuter}>
								<View style={[styles.moodIconInner, moodOffset]} />
							</View>
						</TouchableOpacity>
					</View>
				</View>

				{/*********************************** DOWN ARROW *********************************************/}
				<View style={{ marginTop: 60, borderTopLeftRadius: 14, borderTopRightRadius: 14, backgroundColor: "#312F2F", flex: 1, position: "relative", overflow: "hidden" }}>
					<LinearGradient
						style={{
							width: "100%",
							height: 70,
							borderTopLeftRadius: 14,
							borderTopRightRadius: 14,
							alignItems: "center",
							position: "absolute",
							backgroundColor: "#0006",
							zIndex: 20,
							top: 0,
							right: 0,
							blur: 10,
							paddingTop:5
						}}
						colors={[Colors.defaultBg, Colors.defaultBg + "00"]}
						start={{ x: 0, y: .2 }} end={{ x: 0, y: 1 }}
						>
						<ButtonIcon type={this.state.isOpen? "maximize" : "minimize"} onPress={() => {this.onPress()}}/>
					</LinearGradient>

					{/*********************************** SCROLLVIEW 1 *********************************************/}
					<ScrollView style={styles.mainWrapper}>
						<View>
							<Text style={[{ color: "white", fontSize: 20 }, styles.sidePadding]}>Top Charts</Text>
						</View>

						<ScrollView style={[styles.playlistRow, styles.sidePadding]} horizontal={true}>
							<PlaylistCard />
							<PlaylistCard />
							<PlaylistCard />
						</ScrollView>

						{/*********************************** SCROLLVIEW 2 *********************************************/}

						<View>
							<Text style={[{ color: "white", fontSize: 20 }, styles.sidePadding]}>Recommended</Text>
						</View>

						<ScrollView style={[styles.playlistRow, styles.sidePadding]} horizontal={true}>
							<PlaylistCard />
							<PlaylistCard />
							<PlaylistCard />
						</ScrollView>
					</ScrollView>
				</View>

				{/*********************************** Mood Modal *********************************************/}

				<Modal animationType="slide" transparent={true} visible={this.state.modalVisible}>
					<View style={{ paddingTop: 40, flex: 1, alignItems: "flex-end", backgroundColor: Colors.defaultBg + "EE" }}>
						<ButtonIcon
							type={"close"}
							onPress={() => {
								this.setModalVisible(false);
							}}
						/>
						<MoodPicker onColorChange={(color, coordinates) => this.props.setMood(color, coordinates)} initialColor={this.props.color} />
					</View>
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
		zIndex: 10,
		paddingTop: 55
	},
	playlistRow: {
		flex: 1,
		flexDirection: "row",
		height: 400,
		paddingTop: 20
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
	},
	moodIconOuter: {
		width: 40,
		height: 40,
		borderWidth: 3,
		borderColor: Colors.defaultIcon,
		borderRadius: 100,
		alignItems: "center",
		justifyContent: "center"
	},
	moodIconInner: {
		width: 12,
		height: 12,
		borderWidth: 3,
		borderColor: Colors.defaultIcon,
		borderRadius: 100
	},
	sidePadding: {
		paddingRight: 16,
		paddingLeft: 16
	}
});

const mapStateToProps = state => ({
	locality: state.map.searchText,
	coordinates: state.home.moodCoordinates,
	color: state.home.moodColor
});

const mapDispatchToProps = {
	getMapAddr,
	requestAddr,
	setMood
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Home);
