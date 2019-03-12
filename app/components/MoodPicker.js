import React from "react";
import { StyleSheet, Text, View, Image, TouchableHighlight, Modal, Dimensions } from "react-native";
import { ColorWheel } from "./ColorWheel";
import { Tag } from "./Tag";
import { Colors } from "react-native-paper";

class MoodPicker extends React.Component {
	static defaultProps = {
		onColorChange: () => {},
		onColorChangeComplete: () => {},
		initialColor: "#ffffff"
	};

	render() {
		return (
			<View style={[styles.moodPicker, this.props.style]}>
				<View style={{ flex: 2, maxHeight: Dimensions.get("window").width }}>
					<View style={[styles.labelGroup, { transform: [{ translateY: 45 }] }]}>
						<Text style={styles.label}>Energetic</Text>
						<Text style={styles.label}>Happy</Text>
					</View>
					<ColorWheel
						initialColor={this.props.initialColor}
						onColorChange={(color, coordinates) => this.props.onColorChange(color, coordinates)}
						onColorChangeComplete={color => this.props.onColorChangeComplete(color)}
						style={{
							width: Dimensions.get("window").width,
							maxHeight: Dimensions.get("window").width
						}}
						thumbStyle={{ height: 30, width: 30, borderRadius: 30 }}
					/>
					<View style={[styles.labelGroup, { transform: [{ translateY: -45 }] }]}>
						<Text style={styles.label}>Sad</Text>
						<Text style={styles.label}>Calm</Text>
					</View>
				</View>

				<Tag style={{flex:1, width:'100%', paddingHorizontal: 16}} isSelectable={true} tagData={this.props.tags} selectedTags={this.props.selectedTags} onTagPress={(tag) => this.props.onTagPress(tag)} />
			</View>
		);
	}
}

const styles = StyleSheet.create({
	moodPicker: {
		height: 1000,
		flex: 1,
		flexDirection: "column",
		alignItems: "flex-start",
		marginTop: -40
	},
	label: {
		color: "white",
		fontFamily: "Avenir",
		fontSize: 18
	},
	labelGroup: {
		flexDirection: "row",
		paddingHorizontal: 16,
		justifyContent: "space-between"
	}
});

export { MoodPicker };
