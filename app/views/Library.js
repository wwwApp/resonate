import React, { Component } from "react";
import { StyleSheet, Text, View, ScrollView, ImageBackground, TouchableOpacity, Modal } from "react-native";
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

var fakeData = {
	saved: [
		{
			tags: ["workout", "fun"],
			hearts: [],
			_id: "5c800e85ff50f6001e086bae",
			title: "Smile",
			user: {
				created_playlists: ["5c800e85ff50f6001e086bae"],
				saved_playlists: [],
				starred_tracks: [],
				_id: "5c800cd6ff50f6001e086bad",
				display_name: "Clay Tercek",
				image_url: "https://platform-lookaside.fbsbx.com/platform/profilepic/?asid=797718230257131&height=200&width=200&ext=1554455538&hash=AeTLb3vns-zjEl_I",
				spotify_id: "22vtekoyiw3c4rabcsp6qtvoa",
				__v: 0
			},
			description: "Fun, catchy lyrics, great to sing along with. If you’re feeling down and want to cheer up, check this playlist out.",
			location: { type: "Point", coordinates: [-75.18776122480631, 39.9535280846691] },
			tracks: [
				{
					artists: ["Simon & Garfunkel"],
					title: "Cecilia",
					album: "Bridge Over Troubled Water",
					image_url: "https://i.scdn.co/image/f0348a89ae18721fbc7a35429ae0acc40a7fe386",
					spotify_id: "6QhXQOpyYvbpdbyjgAqKdY",
					duration: 174826
				},
				{
					artists: ["Jack Johnson"],
					title: "Banana Pancakes",
					album: "In Between Dreams",
					image_url: "https://i.scdn.co/image/c788b8e42acc2986a7eed28b0342547b5053a88f",
					spotify_id: "451GvHwY99NKV4zdKPRWmv",
					duration: 191906
				},
				{ artists: ["Feist"], title: "1234", album: "The Reminder", image_url: "https://i.scdn.co/image/6c570e89a7f2a64b82a2d80eb488655e3fde873e", spotify_id: "2CzWeyC9zlDpIOZPUUKrBW", duration: 183666 },
				{
					artists: ["The Beach Boys"],
					title: "Good Vibrations - Remastered",
					album: "Smiley Smile (Remastered)",
					image_url: "https://i.scdn.co/image/5856c03acf9a194af6f1fba25ded0cda5a4e13e5",
					spotify_id: "5t9KYe0Fhd5cW6UYT4qP8f",
					duration: 219026
				},
				{ artists: ["MGMT"], title: "Kids", album: "Oracular Spectacular", image_url: "https://i.scdn.co/image/b3794a3323bb0b55266b3e949ad99a055556dc87", spotify_id: "1jJci4qxiYcOHhQR247rEU", duration: 302840 },
				{
					artists: ["Jason Mraz"],
					title: "I'm Yours",
					album: "We Sing. We Dance. We Steal Things.",
					image_url: "https://i.scdn.co/image/678a0b275dc2a108cf88ad43897ab9e0a2875931",
					spotify_id: "1EzrEOXmMH3G43AXT1y7pA",
					duration: 242186
				},
				{
					artists: ["Joni Mitchell"],
					title: "Big Yellow Taxi",
					album: "Ladies Of The Canyon",
					image_url: "https://i.scdn.co/image/34a461c21d1a8b382380645bb765374497792eba",
					spotify_id: "6UkMcAA19lTdjs22jtB7o2",
					duration: 134800
				},
				{
					artists: ["MIKA"],
					title: "Grace Kelly",
					album: "Life in Cartoon Motion",
					image_url: "https://i.scdn.co/image/c1e9c0f0f1478f17564860e73bf025984a2fb434",
					spotify_id: "7dzUZec5MnWMyQnk5klnKR",
					duration: 187733
				},
				{
					artists: ["James Brown & The Famous Flames"],
					title: "I Got You (I Feel Good)",
					album: "I Got You (I Feel Good)",
					image_url: "https://i.scdn.co/image/104e77246821463a8abf44e48cf5e6f6361faf6b",
					spotify_id: "0rTkE0FmT4zT2xL6GXwosU",
					duration: 165800
				},
				{
					artists: ["Bobby McFerrin"],
					title: "Don't Worry Be Happy",
					album: "Simple Pleasures",
					image_url: "https://i.scdn.co/image/2d84945dcac7f3ad80b2d0279da6a25a04c60e09",
					spotify_id: "4hObp5bmIJ3PP3cKA9K9GY",
					duration: 294400
				},
				{
					artists: ["Chubby Checker"],
					title: "The Twist",
					album: "The Best Of Chubby Checker 1959-1963",
					image_url: "https://i.scdn.co/image/9145e4b6c2f560e67547900523dbd9b964728eb6",
					spotify_id: "3ohLnESFgYACPMCkoTOzqE",
					duration: 153760
				}
			],
			mood: { type: "Point", coordinates: [31.5, -64.75] },
			color: "#f1ff3b",
			image_path: "image/photo_1551896197071_IMG_0048.JPG",
			location_name: "Philadelphia",
			__v: 0
		}
	],
	my: [
	]
};

class Lib extends Component {
	constructor(props) {
		super(props);
		this.state = {
			saved: fakeData.saved,
			my: fakeData.my
		};
	}
	render() {
		const { navigate } = this.props.navigation;
		return (
			// Container View
			// Change the color values based on mood calculated from server for bg color
			<View style={styles.bg}>
				<View style={{ alignSelf: "flex-end", marginBottom: 30 }}>
					<ButtonIcon type="create" onPress={() => navigate("Create")} />
				</View>

				<View style={styles.playlistWrapper}>
					<View>
						<Text style={styles.h2}>Saved Playlist</Text>
						<Connected_PlaylistItem playlistData={this.state.saved} hasStarred={true} navigation={this.props.navigation} />
					</View>

					<View>
						<Text style={styles.h2}>My Playlist</Text>
						<Connected_PlaylistItem playlistData={this.state.my} hasStarred={false} navigation={this.props.navigation} />
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

	componentWillMount() {
		if (this.props.hasStarred) {
			starred = (
				<TouchableOpacity
					onPress={() => this.onPress("5c800e85ff50f6001e086bae")}
				>
					<LinearGradient
						colors={["#E23955", "#553484"]}
						style={{
							width: 150,
							height: 150,
							justifyContent: "center",
							padding: 10,
							marginRight: 5,
							shadowOffset: { width: 3, height: 3 },
							shadowColor: "black",
							shadowOpacity: 0.4
						}}>
						<Icon style={{ color: Colors.defaultIcon, textAlign: "center" }} name="ios-star" size={25} />
						<Text style={[styles.title, { textAlign: "center" }]}>Starred</Text>
					</LinearGradient>
				</TouchableOpacity>
			);
		} else {
			starred = null;
		}
	}

	onPress(playlistData) {
		this.props.navigation.navigate("Playlist", {data: playlistData})
	}

	render() {
		var baseUrl = "http://resonate.openode.io/api/";
		return (
			<View>
				<ScrollView showsHorizontalScrollIndicator={false} horizontal={true} style={{ paddingVertical: 15 }}>
					{starred}
					{this.props.playlistData.map((item, index) => (
						<TouchableOpacity onPress={() => this.onPress(item)} key={index}>
							<ImageBackground source={{ uri: baseUrl + item.image_path }} style={[styles.playlistView, { maxWidth: "100%", maxHeight: "100%" }]}>
								<LinearGradient
									colors={[changeHue(item.color, 40) + "AA", item.color + "CC"]}
									style={{
										width: "100%",
										height: "100%",
										flexDirection: "column-reverse",
										padding: 10
									}}>
									<Text style={styles.title}>{item.title}</Text>
								</LinearGradient>
							</ImageBackground>
						</TouchableOpacity>
					))}
				</ScrollView>
			</View>
		);
	}
}

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
		padding: 30,
		paddingTop: 50
	},
	h2: {
		color: Colors.defaultFont,
		fontFamily: "Avenir",
		fontWeight: "900",
		fontSize: 26
	},
	playlistWrapper: {
		flex: 1,
		justifyContent: "space-around"
	},
	playlistView: {
		backgroundColor: Colors.tintBottomGradient,
		marginRight: 5,
		width: 150,
		height: 150,
		shadowOffset: { width: 3, height: 3 },
		shadowColor: "black",
		shadowOpacity: 0.4
	},
	title: {
		fontFamily: "Avenir",
		color: "#FFF",
		fontWeight: "700",
		fontSize: 16
	}
});

const MainNavigator = createStackNavigator(
	{
		Library: { screen: Lib },
		Create: { screen: Create },
		Playlist: { screen: PlaylistView }
	},
	{
		mode: "modal",
		headerMode: "none"
	}
);


export default MainNavigator;
