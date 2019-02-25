import React, { Component } from "react";
import { Text, ImageBackground, View, StyleSheet, Image } from "react-native";
import { ButtonIcon } from "./ButtonIcon";
import { Colors } from "./../styles/Colors";

class PlaylistCard extends Component {
	render() {
		return (
			<View style={styles.card}>
				<View style={styles.cardWrapper}>
					<View style={styles.cardTop}>
						<ImageBackground source={require("../assets/playlistImage.png")} style={{ width: "100%", height: "100%" }}>
							<View style={{ width: "100%", flexDirection: "row", justifyContent: "flex-end", padding: 5 }}>
								<Image source={require("../assets/heart.png")} />
							</View>

							<View style={{ width: "100%", flexDirection: "row", justifyContent: "center", marginTop: 49 }}>
								<Image source={require("../assets/playBtn.png")} />
							</View>

							<Text style={{ color: "white", marginTop: 40, marginLeft: 10, fontSize: 20 }}>Playlist Title</Text>
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
			</View>
		);
	}
}

const styles = StyleSheet.create({
	card: {
		width: 252,
		height: 345,
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
		color: "white",
		fontSize: 15,
		paddingBottom: 2
	},
	artistName: {
		color: "#E3E3E3",
		fontSize: 13,
		paddingBottom: 9
	}
});

export { PlaylistCard };
