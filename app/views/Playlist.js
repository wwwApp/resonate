import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import { TrackList } from "./../components/TrackList";
import { ButtonIcon } from "../components/ButtonIcon";
import Player from "./Player";
import { Tag } from "./../components/Tag";
import LinearGradient from "react-native-linear-gradient";
import { Colors } from "./../styles/Colors";
import { setPlaylist, togglePlaylistView, toggleFirstPlay } from "../redux/reducers/playlist.reducer";
import { togglePlay, pushTracks } from "../redux/reducers/player.reducer";
import {heartPlaylist} from "../redux/reducers/user.reducer";
import { connect } from "react-redux";
import changeHue from "../styles/changeHue";

var player;
class Playlist extends Component {
	componentDidMount() {
    this.props.setPlaylist(this.props.navigation.getParam("data", {}));
    
		if (this.props.isHearted) {
			this.state.toggleHeartIcon = "ios-heart";
		} else {
			this.state.toggleHeartIcon = "ios-heart-empty";
		}
	}

	constructor(props) {
		super(props);
		this.state = {
			toggleHeartIcon: "ios-heart-empty"
		};
	}

	/**
	 * Push tracks to player and open it
	 */
	async play() {
		await this.props.pushTracks(this.props.navigation.getParam("data", {}).tracks);
		console.log(this.props.navigation.getParam("data", {}).tracks);
		await this.props.togglePlay();
	}

	heart() {
		this.props.heartPlaylist(this.props.navigation.getParam("data", {})._id);
	}

	matchId(element) {
		return element._id == this._id;
	}
	
	render() {
		var data = this.props.navigation.getParam("data", {});
		var toggleHeartIcon;
		let index = this.props.saved_playlists.findIndex(this.matchId, data);
		if (index > -1) {
			toggleHeartIcon = "ios-heart";
		} else {
			toggleHeartIcon = "ios-heart-empty";
		}
		return (
			// Container View
			// Change the color values based on mood calculated from server for bg color
			<View style={{flex: 1, backgroundColor: Colors.defaultBg}}>
				{!this.props.isLoading && (
					<LinearGradient style={styles.container} colors={[changeHue(data.color, 40) + "AA", data.color + "BB"]}>
						<View style={[styles.playButtonContainer, styles.playButtonIcon]}>
							<ButtonIcon
								style={{ color: "black" }}
								type="pl-play"
								toggleIcon={this.props.toggleIcon}
								// toggleIcon="ios-play"
								size={50}
								onPress={this.play.bind(this)}
							/>
						</View>
						<View style={styles.topIconGroup}>
							<ButtonIcon
								type="return"
								onPress={() => {
									this.props.navigation.goBack(null);
								}}
							/>
							<View style={{ flexDirection: "row" }}>
								<ButtonIcon type="heart" onPress={this.heart.bind(this)} toggleIcon={toggleHeartIcon} />

								<ButtonIcon type="more" />
							</View>
						</View>
						<View style={{ width: "100%" }}>
							<Text style={[styles.playlistItem, styles.title, styles.txtBold]}>{data.title}</Text>
							<Text style={[styles.playlistItem, styles.location, styles.txtLight]}>{data.location_name || "location"}</Text>
							<View style={[styles.playlistItem, styles.tag]}>
								<Tag tagData={data.tags} />
							</View>
							<Text style={styles.playlistItem}>{data.description}</Text>
							<Text style={[styles.playlistItem, styles.user, styles.txtLight]}>@{data.user.display_name}</Text>
						</View>
						<TrackList trackData={data.tracks} />

						{/** ADD PLAYER TO THE VIEW */}
						{player}
					</LinearGradient>
				)}
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		padding: 35,
		paddingTop: 50
	},
	topIconGroup: {
		width: "100%",
		height: "auto",
		flexDirection: "row",
		justifyContent: "space-between",
		marginBottom: 20,
		alignItems: "center"
	},
	playlistItem: {
		fontFamily: "Avenir",
		color: Colors.defaultFont
	},
	title: {
		fontSize: 30
	},
	location: {
		fontSize: 20
	},
	tag: {
		marginTop: 20,
		marginBottom: 20
	},
	user: {
		marginTop: 5,
		marginBottom: 30
	},
	txtBold: {
		fontWeight: "bold"
	},
	txtLight: {
		fontWeight: "100"
	},
	playButtonContainer: {
		position: "absolute",
		top: 130,
		right: 30,
		zIndex: 9999
	},
	playButtonIcon: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		width: 90,
		height: 90,
		backgroundColor: "#E7E7E7",
		borderRadius: 90
	}
});

const mapStateToProps = state => ({
	playlist: state.playlist.playlist,
	isLoading: state.playlist.loading,
	isFirstPlay: state.playlist.isFirstPlay, // once this data gets integrated in database
	tracks: state.player.tracks,
	toggleIcon: state.player.toggleIcon,
	saved_playlists: state.user.userData.saved_playlists
});

const mapDispatchToProps = {
	setPlaylist,
	togglePlaylistView,
	heartPlaylist,
	toggleFirstPlay,
	pushTracks,
	togglePlay
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Playlist);
