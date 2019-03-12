import React, { Component } from "react";
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity } from "react-native";
import { Colors } from "./../styles/Colors";
import { createStackNavigator, createAppContainer } from "react-navigation";
import { ButtonIcon } from "../components/ButtonIcon";
import TrackStack from "../components/TrackStack";
import LinearGradient from "react-native-linear-gradient";
import ImagePicker from "react-native-image-picker";
import Icon from "react-native-vector-icons/Ionicons";
import Map from "../components/Map";
import { MoodPicker } from "../components/MoodPicker";
import { getMapAddr, requestAddr } from "../redux/reducers/map.reducer";
import { setMood,  setTitle, setDesc, setImg, uploadPhoto, uploadPlaylist, toggleTag } from "../redux/reducers/create.reducer";
import { fetchUserData } from "../redux/reducers/user.reducer";
import { connect } from "react-redux";


class Create_Details extends Component {
	// componentDidMount() {
	//   this.props.navigation.setParams({dismiss: this.props.navigation.dismiss});
	// }

	static navigationOptions = ({ navigation }) => ({
		headerRight: (
			<View style={{ marginRight: 16, alignItems: "center" }}>
				<ButtonIcon size={50} type="close" onPress={() => navigation.dismiss()} />
			</View>
		)
	});

	state = {
		photo: null
	};

	handleChoosePhoto = () => {
		const options = {
			noData: true
		};
		ImagePicker.launchImageLibrary(options, response => {
			if (response.uri) {
				this.setState({ photo: response });
				this.props.setImg(response);
			}
		});
	};

	render() {
		const { navigate } = this.props.navigation;
		const { photo } = this.state;
		return (
			// Container View
			// Change the color values based on mood calculated from server for bg color
			<View style={[styles.bg, { paddingTop: 16 }]}>
				<View style={[styles.margin, styles.horizontal]}>
					<Text style={[styles.h2, { flex: 1 }]}>Create a Playlist</Text>
					<TouchableOpacity style={styles.image} onPress={this.handleChoosePhoto}>
						{(photo && <Image source={{ uri: photo.uri }} style={{ width: 160, height: 160 }} />) || (
							<View style={{ flex: 1 }}>
								<Text style={styles.imageText}>Upload Playlist Cover Image</Text>
								<View style={{ justiftyContent: "center", alignItems: "center", marginTop: 16 }}>
									<Icon style={{ color: Colors.defaultFont }} name="ios-cloud-upload" size={30} />
								</View>
							</View>
						)}
					</TouchableOpacity>
				</View>
				<View style={[styles.textInputWrapper, styles.margin, { marginTop: 16 }]}>
					<TextInput returnKeyType="done" style={styles.textInput} placeholder="enter your playlist title" placeholderTextColor={Colors.defaultFont} onChangeText={(text) => {this.props.setTitle(text)}} />
					<LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={[Colors.tintTopGradient, Colors.tintBottomGradient]} style={{ width: "100%", height: 4 }} />
				</View>
				<View style={[styles.textBoxWrapper, { marginBottom: 50 }]}>
					<Text style={styles.textInput} >
						enter a description <Text style={styles.optional}>(optional)</Text>
					</Text>
					<LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={[Colors.tintTopGradient, Colors.tintBottomGradient]} style={{ width: "100%", flex: 1 }}>
						<TextInput returnKeyType="done" blurOnSubmit={true} onChangeText={(text) => {this.props.setDesc(text)}} style={styles.textBox} multiline={true} />
					</LinearGradient>
				</View>
				<TouchableOpacity onPress={() => navigate("Tracks")} style={styles.continueWrapper}>
					<Text style={styles.continueButton}>Continue</Text>
				</TouchableOpacity>
			</View>
		);
	}
}

const mapStateToPropsDetails = state => ({

});

const mapDispatchToPropsDetails = {
	setTitle,
	setDesc,
	setImg
};
 
const Connected_Detail = connect(
	mapStateToPropsDetails,
	mapDispatchToPropsDetails
)(Create_Details);

var title;

class Create_Map extends Component {
	static navigationOptions = ({ navigation }) => ({
		headerRight: (
			<View style={{ marginRight: 16, alignItems: "center" }}>
				<ButtonIcon size={50} type="close" onPress={() => navigation.dismiss()} />
			</View>
		),
		headerLeft: (
			<View style={{ marginLeft: 16, alignItems: "center" }}>
				<ButtonIcon type="return" onPress={() => navigation.goBack(null)} />
			</View>
		)
	});

	onChangeText = text => {
		this.props.requestAddr(text);
		title = text;
	};

	onSubmit = text => {
		this.props.getMapAddr(this.props.locality);
	};

	render() {
		const { navigate } = this.props.navigation;
		return (
			// Container View
			// Change the color values based on mood calculated from server for bg color
			<View style={[styles.bg, { paddingBottom: 16 }]}>
				<View style={[styles.textInputWrapper, styles.margin, { marginTop: 16 }]}>
					<TextInput
						style={styles.textInput}
						placeholder="search for location"
						placeholderTextColor={Colors.defaultFont}
						onChangeText={this.onChangeText}
						onSubmitEditing={this.onSubmit}
						value={this.props.locality}
						returnKeyType="search"
					/>
					<LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={[Colors.tintTopGradient, Colors.tintBottomGradient]} style={{ width: "100%", height: 4 }} />
				</View>
				<Map style={{ marginTop: 5, marginBottom: 15 }} />
				<TouchableOpacity onPress={() => navigate("Mood")}>
					<Text style={styles.continueButton}>Continue</Text>
				</TouchableOpacity>
			</View>
		);
	}
}

const mapStateToPropsMap = state => ({
	locality: state.map.searchText
});

const mapDispatchToPropsMap = {
	getMapAddr,
	requestAddr
};
 
const Connected_Map = connect(
	mapStateToPropsMap,
	mapDispatchToPropsMap
)(Create_Map);

class Create_Tracks extends Component {
	static navigationOptions = ({ navigation }) => ({
		headerRight: (
			<View style={{ marginRight: 16, alignItems: "center" }}>
				<ButtonIcon size={50} type="close" onPress={() => navigation.dismiss()} />
			</View>
		),
		headerLeft: (
			<View style={{ marginLeft: 16 }}>
				<ButtonIcon type="return" onPress={() => navigation.goBack(null)} />
			</View>
		)
  });
  
  componentDidMount() {
  }

	render() {
		const { navigate } = this.props.navigation;
		return (
			// Container View
			// Change the color values based on mood calculated from server for bg color
			<View style={[styles.bg, styles.padTop]}>
				<Text style={[styles.h2, styles.margin, {marginBottom:10}]}>Add Tracks</Text>
				<TrackStack title={title} styles={styles} />
				<TouchableOpacity onPress={() => navigate("Location")} style={styles.continueWrapper}>
					<Text style={styles.continueButton}>Continue</Text>
				</TouchableOpacity>
			</View>
		);
	}
}



class Create_Mood extends Component {
	static navigationOptions = ({ navigation }) => ({
		headerRight: (
			<View style={{ marginRight: 16 }}>
				<ButtonIcon size={50} type="close" onPress={() => navigation.dismiss()} />
			</View>
		),
		headerLeft: (
			<View style={{ marginLeft: 16 }}>
				<ButtonIcon type="return" onPress={() => navigation.goBack(null)} />
			</View>
		)
	});

	onSubmit() {
		
		let createData = this.props.createData;
		let mapData = this.props.mapData;
		var playlist = {
			user: this.props.user.userData._id,
			title: createData.title,
			description: createData.description,
			location: {
				coordinates: [mapData.region.longitude, mapData.region.latitude]
			},
			tags: createData.selectedTags,
			tracks: createData.trackQueue,
			location_name: mapData.locality,
			image_path: "",
			mood: {
				coordinates: [createData.moodCoordinates.x/2, createData.moodCoordinates.y/2]
			},
			color: createData.moodColor
		};
		this.props.uploadPhoto(createData.local_image_data, "5c7765a46f802f001eccceca").then(res => {
			playlist.image_path = res.payload.data.image_url
			this.props.uploadPlaylist(playlist).then((res) => {
				console.log(res)
				this.props.fetchUserData()
				const { navigate } = this.props.navigation;
				navigate("Library");
			})
		});
	}

	render() {
		const { navigate } = this.props.navigation;
		return (
			// Container View
			// Change the color values based on mood calculated from server for bg color
			<View style={[styles.bg, { paddingBottom: 16, flex:1 }]}>
				<MoodPicker 
					onColorChange={(color, coordinates) => {this.props.setMood(color, coordinates)}}
					tags={this.props.tags}
					selectedTags={this.props.selectedTags}
					onTagPress={(tag) => this.props.toggleTag(tag)}
				/>
				<TouchableOpacity onPress={() => {this.onSubmit()}}>
					<Text style={styles.continueButton}>Done</Text>
				</TouchableOpacity>
			</View>
		);
	}
}

const mapStateToPropsMood = state => ({
	createData: state.create,
	mapData: state.map,
	user :state.user,
	tags :state.create.tags,
	selectedTags :state.create.selectedTags
});

const mapDispatchToPropsMood = {
	setMood,
	uploadPhoto,
	uploadPlaylist,
	toggleTag,
	fetchUserData
};
 
const Connnected_Mood = connect(
	mapStateToPropsMood,
	mapDispatchToPropsMood
)(Create_Mood);

const styles = StyleSheet.create({
	bg: {
		backgroundColor: Colors.defaultBg,
		flex: 1
	},
	padTop: {
		paddingTop: 16
	},
	h3: {
		color: Colors.defaultFont,
		fontFamily: "Avenir",
		fontWeight: "900",
		fontSize: 20
	},
	h2: {
		color: Colors.defaultFont,
		fontFamily: "Avenir",
		fontWeight: "900",
		fontSize: 26
	},
	textInputWrapper: {
		marginBottom: 7
	},
	textInput: {
		marginBottom: 5,
		color: Colors.defaultFont,
		fontFamily: "Avenir",
		fontSize: 16
	},
	margin: {
		marginLeft: 16,
		marginRight: 16
	},
	horizontal: {
		flexDirection: "row"
	},
	continueButton: {
		color: Colors.defaultFont,
		fontFamily: "Avenir",
		fontSize: 24,
		textAlign: "center",
		fontWeight: "600"
	},
	continueWrapper: {
		position: "absolute",
		left: 0,
		right: 0,
		bottom: 16,
		textAlign: "center"
	},
	image: {
		width: 160,
		height: 160,
		backgroundColor: "grey",
		marginLeft: 16,
		overflow: "hidden",
		justifyContent: "center",
		alignItems: "center"
	},
	imageText: {
		marginTop: 18,
		color: Colors.defaultFont,
		fontFamily: "Avenir",
		fontSize: 16,
		textAlign: "center",
		fontWeight: "600",
		width: 120
	},
	textBoxWrapper: {
		flex: 1,
		padding: 16
	},
	textBox: {
		margin: 4,
		backgroundColor: Colors.defaultBg,
		flex: 1,
		color: Colors.defaultFont,
		fontFamily: "Avenir",
		fontSize: 16,
		padding: 5
	},
	optional: {
		opacity: 0.4
	},
	mapPlaceholder: {
		width: "100%",
		flex: 1,
		backgroundColor: "#666",
		marginTop: 16,
		marginBottom: 16
	}
});

const MainNavigator = createStackNavigator(
	{
		Details: { screen: Connected_Detail },
		Tracks: { screen: Create_Tracks },
		Location: { screen: Connected_Map },
		Mood: { screen: Connnected_Mood },
	},
	{
		defaultNavigationOptions: {
			headerTintColor: Colors.defaultFont,
			headerStyle: {
				backgroundColor: Colors.defaultBg,
				borderWidth: 0,
				borderBottomColor: "transparent"
			}
		}
	}
);

const Create = createAppContainer(MainNavigator);

export default Create;


