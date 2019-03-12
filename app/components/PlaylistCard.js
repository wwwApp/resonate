import React, { Component } from "react";
import { Text, ImageBackground, View, StyleSheet, TouchableOpacity } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { ButtonIcon } from "./ButtonIcon";
import changeHue from "../styles/changeHue";
import { Colors } from "./../styles/Colors";
import {heartPlaylist} from "../redux/reducers/user.reducer";
import { connect } from "react-redux";

class PlaylistCard extends Component {

	matchId(element) {
		return element._id == this._id;
	}

	heart() {
		this.props.heartPlaylist(this.props.playlist._id);
	}
	
	render() {
		var toggleHeartIcon;
		let index = this.props.saved_playlists.findIndex(this.matchId, this.props.playlist);
		if (index > -1) {
			toggleHeartIcon = "ios-heart";
		} else {
			toggleHeartIcon = "ios-heart-empty";
		}

		var baseUrl = "http://resonate.openode.io/api/";
		return (
			<TouchableOpacity onPress={this.props.onPress} style={styles.card}>
				<View style={styles.cardWrapper}>
					<View style={styles.cardTop}>
						<ImageBackground source={{ uri: baseUrl + this.props.playlist.image_path }} style={{ width: "100%", height: "100%" }}>
							<LinearGradient colors={[changeHue(this.props.playlist.color, 40) + "AA", this.props.playlist.color + "CC"]} style={{ width: "100%", height: "100%"}}>
								<View style={{ width: "100%", flexDirection: "row", justifyContent: "flex-end", padding: 10 }}>
								<ButtonIcon type="heart" onPress={this.heart.bind(this)} toggleIcon={toggleHeartIcon}/>
								</View>

								<View style={{ width: "100%", justifyContent: "center", alignItems: "center", flex: 1 }}>
									<ButtonIcon type="play" size={65}/>
								</View>

								<Text numberOfLines={1} style={{ color: "white", marginLeft: 10, fontSize: 24, fontWeight: "bold", fontFamily: "Avenir" }}>{this.props.playlist.title}</Text>
							</LinearGradient>
						</ImageBackground>
					</View>

					<View style={styles.cardBottom}>
						<View>
							<Text numberOfLines={1} style={styles.songTitle}>{this.props.playlist.tracks[0].title}</Text>
							<Text numberOfLines={1} style={styles.artistName}>{this.props.playlist.tracks[0].artists[0]}</Text>
						</View>
						<View>
							<Text numberOfLines={1} style={styles.songTitle}>{this.props.playlist.tracks[1].title}</Text>
							<Text numberOfLines={1} style={styles.artistName}>{this.props.playlist.tracks[1].artists[0]}</Text>
						</View>
						<View>
							<Text numberOfLines={1} style={styles.songTitle}>{this.props.playlist.tracks[2].title}</Text>
							<Text numberOfLines={1} style={styles.artistName}>{this.props.playlist.tracks[2].artists[0]}</Text>
						</View>
					</View>
				</View>
			</TouchableOpacity>
		);
	}
}

const styles = StyleSheet.create({
	card: {
		width: 252,
		height: 360,
		backgroundColor: "#312F2F",
		marginRight: 30,
		shadowOffset: { width: 0, height: 5 },
		shadowColor: "black",
		shadowOpacity: 0.7,
		shadowRadius: 20
	},
	cardTop: {
		height: 200,
		width: "100%"
	},
	cardBottom: {
		height: 153,
		width: "100%",
		flexDirection: "column",
		alignItems: "flex-start",
		padding: 10
	},
	songTitle: {
		fontSize: 15,
		paddingBottom: 2,
		fontFamily: "Avenir",
    color: Colors.defaultFont,
	},
	artistName: {
		fontSize: 13,
		paddingBottom: 11,
		fontFamily: "Avenir",
		color: Colors.defaultFont,
		opacity: 0.8
	}
});

const mapStateToProps = state => ({
	saved_playlists: state.user.userData.saved_playlists
});

const mapDispatchToProps = {
	heartPlaylist
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(PlaylistCard);


