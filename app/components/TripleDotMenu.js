import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ImageBackground
} from "react-native";
import { ButtonIcon } from "./ButtonIcon";
import { Colors } from "./../styles/Colors";

class TripleDotMenu extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View style={styles.main}>
        <View style={{ width: "100%", height: 100, alignItems: "flex-end" }}>
          <ButtonIcon type="close" onPress={this.props.onClose} />
        </View>

        <View style={styles.songImage}>
          <ImageBackground
            style={styles.songImageBackground}
            source={{ url: this.props.track.image_url }}
          >
            <View style={styles.songInfo}>
              <Text
                style={{ color: "white", fontWeight: "bold", fontSize: 18 }}
              >
                {this.props.track.title}
              </Text>

              <Text style={{ color: "white" }}>
                {this.props.track.artists.join(", ")}
              </Text>
            </View>
          </ImageBackground>
        </View>

        <View style={styles.menuOptions}>
          <TouchableOpacity>
            <Text style={styles.optionText}>Add to Playlist</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.optionText}>Save to Spotify</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  main: {
    backgroundColor: Colors.defaultBg,
    height: 1000,
    opacity: 0.95,
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-around",
    padding: 35,
    paddingTop: 50
  },
  songImage: {
    width: 200,
    height: 200,
    backgroundColor: "black",
    marginTop: 50
  },
  menuOptions: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    width: "100%",
    alignItems: "center"
  },
  songImageBackground: {
    color: "white",
    width: "100%",
    height: "100%"
  },
  songInfo: {
    marginTop: 150,
    padding: 10
  },
  optionText: {
    color: Colors.defaultFont,
    fontFamily: "Avenir",
    fontSize: 23,
    marginBottom: 15
  }
});

export { TripleDotMenu };
