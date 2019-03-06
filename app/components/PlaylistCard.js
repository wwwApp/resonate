import React, { Component } from "react";
import { Text, ImageBackground, View, StyleSheet, TouchableOpacity } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { ButtonIcon } from "./ButtonIcon";
import changeHue from "../styles/changeHue";
import { Colors } from "./../styles/Colors";

class PlaylistCard extends Component {
	render() {
		var baseUrl = "http://resonate.openode.io/api/";
		return (
			<TouchableOpacity onPress={this.props.onPress} style={styles.card}>
				<View style={styles.cardWrapper}>
					<View style={styles.cardTop}>
						<ImageBackground source={{ uri: baseUrl + this.props.playlist.image_path }} style={{ width: "100%", height: "100%" }}>
							<LinearGradient colors={[changeHue(this.props.playlist.color, 40) + "AA", this.props.playlist.color + "CC"]} style={{ width: "100%", height: "100%"}}>
								<View style={{ width: "100%", flexDirection: "row", justifyContent: "flex-end", padding: 10 }}>
								<ButtonIcon type="heart" toggleIcon="ios-heart-empty"/>
								</View>

								<View style={{ width: "100%", justifyContent: "center", alignItems: "center", flex: 1 }}>
									<ButtonIcon type="play" size={65}/>
								</View>

								<Text style={{ color: "white", marginLeft: 10, fontSize: 24, fontWeight: "bold", fontFamily: "Avenir" }}>{this.props.playlist.title}</Text>
							</LinearGradient>
						</ImageBackground>
					</View>

					<View style={styles.cardBottom}>
						<View>
							<Text style={styles.songTitle}>Song Title</Text>
							<Text style={styles.artistName}>Artist</Text>
						</View>
						<View>
							<Text style={styles.songTitle}>Song Title</Text>
							<Text style={styles.artistName}>Artist</Text>
						</View>
						<View>
							<Text style={styles.songTitle}>Song Title</Text>
							<Text style={styles.artistName}>Artist</Text>
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
		shadowOffset: { width: 0, height: 0 },
		shadowColor: "black",
		shadowOpacity: 1.0,
		shadowRadius: 10
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

export { PlaylistCard };

