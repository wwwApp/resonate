import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  ImageBackground,
  TouchableOpacity
} from "react-native";
import { ButtonIcon } from "./../components/ButtonIcon";
import { Colors } from "./../styles/Colors";
import Icon from "react-native-vector-icons/Ionicons";
import { createStackNavigator, createAppContainer } from "react-navigation";
import LinearGradient from "react-native-linear-gradient";
import Create from "./Create";
import Playlist from "./Playlist";
import { togglePlaylistView } from "../redux/reducers/playlist.reducer";
import { connect } from "react-redux";
import changeHue from "../styles/changeHue";

class Lib extends Component {
	render() {
		const { navigate } = this.props.navigation;
		return (
			// Container View
			// Change the color values based on mood calculated from server for bg color
			<View style={styles.bg}>
				<View style={{ alignSelf: "flex-end", marginBottom: 30, marginRight: 16 }}>
					<ButtonIcon type="create" onPress={() => navigate("Create")} />
				</View>

				<View style={styles.playlistWrapper}>
					<View>
						<Text style={styles.h2}>Saved Playlists</Text>
						<Connected_PlaylistItem playlistData={this.props.saved} hasStarred={true} navigation={this.props.navigation} />
					</View>

					<View>
						<Text style={styles.h2}>My Playlists</Text>
						<Connected_PlaylistItem playlistData={this.props.created} hasStarred={false} navigation={this.props.navigation} />
					</View>
				</View>
			</View>
		);
	}
}

var starred;
class PlaylistItem extends Component {
	constructor(props) {
		super(props);

		this.onPress = this.onPress.bind(this);
	}

	onPress(playlistData) {
		this.props.navigation.navigate("Playlist", {data: playlistData})
	}

	render() {
		var starred;
		if (this.props.hasStarred) {
			starred = (
				<TouchableOpacity>
					<LinearGradient
						colors={["#E23955", "#553484"]}
						style={{
							width: 160,
							height: 160,
							justifyContent: "center",
							padding: 10,
							marginRight: 12,
							shadowOffset: { width: 3, height: 3 },
							shadowColor: "black",
							shadowOpacity: 0.4
						}}>
						<Icon style={{ color: Colors.defaultIcon, textAlign: "center" }} name="ios-star" size={25} />
						<Text style={[styles.title, {position:'absolute', bottom:10, left:10}]}>Starred Tracks</Text>
					</LinearGradient>
				</TouchableOpacity>
			);
		} else {
			starred = null;
		}

		var baseUrl = "http://resonate.openode.io/api/";
		return (
			<View>
				<ScrollView showsHorizontalScrollIndicator={false} horizontal={true} style={{ paddingVertical: 15,paddingHorizontal: 16, overflow:'visible'}}>
					{starred}
					{this.props.playlistData.map((item, index) => (
						<TouchableOpacity onPress={() => this.onPress(item)} key={index}>
							<ImageBackground source={{ uri: baseUrl + item.image_path }} style={[styles.playlistView, { maxWidth: "100%", maxHeight: "100%" }]}>
								<LinearGradient
									colors={[changeHue(item.color, 40) + "AA", item.color + "CC"]}
									style={{
										width: "100%",
										height: "100%",
										maxWidth: "100%", maxHeight: "100%" 
									}}>
									<LinearGradient
									colors={["#0000", "#0005"]}
									style={{
										width: "100%",
										height: "100%",
										maxWidth: "100%", maxHeight: "100%",
										flexDirection: "column-reverse",
										padding: 10
									}}>
									<Text style={styles.title}>{item.title}</Text>
								</LinearGradient>
								</LinearGradient>
							</ImageBackground>
						</TouchableOpacity>
					))}
				</ScrollView>
			</View>
		);
	}
}

const mapStateToPropsLib = state => ({
	saved: state.user.userData.saved_playlists,
	created: state.user.userData.created_playlists
});

const mapDispatchToPropsLib = {
};

const Connected_Lib = connect(
	mapStateToPropsLib,
	mapDispatchToPropsLib
)(Lib);

class PlaylistView extends Component {
	constructor(props) {
		super(props);
	}
	render() {
		return <Playlist navigation={this.props.navigation} />;
	}
}

const mapStateToProps = state => ({
	isVisible: state.playlist.isVisible
});

const mapDispatchToProps = {
	togglePlaylistView
};

const Connected_PlaylistItem = connect(
	mapStateToProps,
	mapDispatchToProps
)(PlaylistItem);

const styles = StyleSheet.create({
	bg: {
		backgroundColor: Colors.defaultBg,
		flex: 1,
		paddingTop: 50
	},
	h2: {
		color: Colors.defaultFont,
		fontFamily: "Avenir",
		fontWeight: "900",
		fontSize: 26,
		marginLeft: 16
	},
	playlistWrapper: {
		flex: 1,
		justifyContent: "space-evenly"
	},
	playlistView: {
		backgroundColor: Colors.tintBottomGradient,
		marginRight: 12,
		width: 160,
		height: 160,
		shadowOffset: { width: 3, height: 3 },
		shadowColor: "black",
		shadowOpacity: 0.4
	},
	title: {
		fontFamily: "Avenir",
		color: "#FFF",
		fontWeight: "700",
		fontSize: 18
	}
});

const MainNavigator = createStackNavigator(
	{
		Library: { screen: Connected_Lib },
		Create: { screen: Create },
		Playlist: { screen: PlaylistView }
	},
	{
		mode: "modal",
		headerMode: "none"
	}
);


export default MainNavigator;
