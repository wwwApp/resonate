import React, { Component } from "react";
import { StyleSheet, Text, View, ScrollView, TextInput, TouchableOpacity, Modal, Animated, RefreshControl } from "react-native";
import { MoodPicker } from "../components/MoodPicker.js";
import Map from "../components/Map";
import PlaylistCard from "../components/PlaylistCard";
import Playlist from "./Playlist";
import { Colors } from "../styles/Colors";
import { getMapAddr, requestAddr } from "../redux/reducers/map.reducer";
import { setMood, search, toggleTag } from "../redux/reducers/home.reducer";
import { initialize } from "../redux/reducers/user.reducer";
import { connect } from "react-redux";
import { ButtonIcon } from "../components/ButtonIcon";
import LinearGradient from "react-native-linear-gradient";
import { createStackNavigator, createAppContainer } from "react-navigation";
import Icon from "react-native-vector-icons/Ionicons";

class Home extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isOpen: false,
			topY: new Animated.Value(50),
			modalVisible: false,
			text: this.props.locality
		};
	}

	componentDidMount() {
		this.props.initialize();
	}

	setModalVisible(visible) {
		this.setState({ modalVisible: visible });
	}

	onPress = () => {
		if (this.state.isOpen) {
			Animated.spring(this.state.topY, {
				toValue: 50,
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
					<View style={{ flex: 1, flexDirection: "row", justifyContent: "flex-start", marginTop: 60, position: "absolute", paddingLeft: 16, paddingRight: 16 }}>
						<Icon style={{color: Colors.defaultIcon, marginRight:10}} name="ios-search" size={35} />
						<TextInput
							style={{ flex: 1, color: "white", fontSize: 28, fontWeight: "bold", paddingRight: 20}}
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
							paddingTop: 5
						}}
						colors={[Colors.defaultBg, Colors.defaultBg + "00"]}
						start={{ x: 0, y: 0.2 }}
						end={{ x: 0, y: 1 }}>
						<ButtonIcon
							type={this.state.isOpen ? "maximize" : "minimize"}
							onPress={() => {
								this.onPress();
							}}
						/>
					</LinearGradient>

					{/*********************************** SCROLLVIEW 1 *********************************************/}
					<ScrollView refreshControl={
						<RefreshControl
							tintColor={'white'}
							refreshing={this.props.loading}
							onRefresh={() => {
								this.props.search()
							}}
							style={{
								transform: [
									{translateY:30}
								]
							}}
						/>}
						style={styles.mainWrapper}
					>
						<View>
							<Text style={[{ color: "white", fontSize: 24, fontFamily:'Avenir', fontWeight:"700" }, styles.sidePadding]}>Top Charts</Text>
						</View>

						<ScrollView style={[styles.playlistRow, styles.sidePadding]} horizontal={true}>
							{this.props.playlists &&
								this.props.playlists.map((item, index) => (
									<PlaylistCard
										onPress={() => {
											this.props.navigation.navigate("Playlist", { data: item });
										}}
										playlist={item}
										key={index}
									/>
								))}
						</ScrollView>

						{/*********************************** SCROLLVIEW 2 *********************************************/}

						<View>
							<Text style={[{ color: "white", fontSize: 24, fontFamily:'Avenir', fontWeight:"700" }, styles.sidePadding]}>Recommended</Text>
						</View>

						<ScrollView style={[styles.playlistRow, styles.sidePadding]} horizontal={true}>
							{this.props.playlists &&
								this.props.playlists.map((item, index) => (
									<PlaylistCard
										onPress={() => {
											this.props.navigation.navigate("Playlist", { data: item });
										}}
										playlist={item}
										key={index}
									/>
								))}
						</ScrollView>
					</ScrollView>
				</View>

				{/*********************************** Mood Modal *********************************************/}

				<Modal animationType="slide" transparent={true} visible={this.state.modalVisible}>
					<View style={{ paddingTop: 40, flex: 1, alignItems: "flex-end", backgroundColor: Colors.defaultBg + "EE" }}>
						<View style={{ paddingRight: 16, height: 60, zIndex: 10 }}>
							<ButtonIcon
								type={"close"}
								size={60}
								onPress={() => {
									this.setModalVisible(false);
								}}
							/>
						</View>
						<MoodPicker
							onColorChange={(color, coordinates) => {
								this.props.setMood(color, coordinates);
							}}
							onColorChangeComplete={color => {
								this.props.search();
							}}
							initialColor={this.props.color}
							tags={this.props.tags}
							selectedTags={this.props.selectedTags}
							onTagPress={(tag) => {
								this.props.toggleTag(tag);
								this.props.search();
							}}
						/>
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
		marginTop: 50,
		zIndex: 10,
		overflow:"visible"
	},
	playlistRow: {
		flex: 1,
		flexDirection: "row",
		height: 400,
		paddingTop: 20,
		overflow: 'visible'
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
		justifyContent: "center",
		transform: [
			{translateY: -5}
		]
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
	color: state.home.moodColor,
	playlists: state.home.playlists,
	tags: state.home.tags,
	selectedTags: state.home.selectedTags,
	loading: state.home.loading

});

const mapDispatchToProps = {
	getMapAddr,
	requestAddr,
	setMood,
	search,
	initialize,
	toggleTag
};

const Home_connected = connect(
	mapStateToProps,
	mapDispatchToProps
)(Home);

class PlaylistView extends Component {
	constructor(props) {
		super(props);
	}
	render() {
		return <Playlist navigation={this.props.navigation} />;
	}
}

const MainNavigator = createStackNavigator(
	{
		Home: { screen: Home_connected },
		Playlist: { screen: PlaylistView }
	},
	{
		mode: "modal",
		headerMode: "none"
	}
);

export default MainNavigator;
