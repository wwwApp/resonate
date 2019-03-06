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
// import { fetchSavedPlaylists } from "../redux/reducers/library.reducer";
import { initialize } from "../redux/reducers/user.reducer";
import { connect } from "react-redux";

var fakeData = {
  saved: [
    {
      title: "Playlist Title 1",
      image_url:
        "https://i.scdn.co/image/36241af268aef838a5f9aa6bd635a170adffbeee",
      creator: "Creator 1",
      mood: ["rgba(84,73,120,0.8)", "rgba(28,20,56,0.8)"],
      id: "5c800e85ff50f6001e086bae"
    },
    {
      title: "Playlist Title 2",
      image_url:
        "https://i.scdn.co/image/36241af268aef838a5f9aa6bd635a170adffbeee",
      creator: "Creator 2",
      mood: ["rgba(84,73,120,0.8)", "rgba(28,20,56,0.8)"],
      id: "5c800e85ff50f6001e086bae"
    },
    {
      title: "Playlist Title 3",
      image_url:
        "https://i.scdn.co/image/36241af268aef838a5f9aa6bd635a170adffbeee",
      creator: "Creator 3",
      mood: ["rgba(84,73,120,0.8)", "rgba(28,20,56,0.8)"],
      id: "5c800e85ff50f6001e086bae"
    }
  ],
  my: [
    {
      title: "Playlist Title 1",
      image_url:
        "https://i.scdn.co/image/36241af268aef838a5f9aa6bd635a170adffbeee",
      creator: "Creator 1",
      mood: ["rgba(84,73,120,0.8)", "rgba(28,20,56,0.8)"],
      id: "5c800e85ff50f6001e086bae"
    },
    {
      title: "Playlist Title 2",
      image_url:
        "https://i.scdn.co/image/36241af268aef838a5f9aa6bd635a170adffbeee",
      creator: "Creator 2",
      mood: ["rgba(84,73,120,0.8)", "rgba(28,20,56,0.8)"],
      id: "5c800e85ff50f6001e086bae"
    },
    {
      title: "Playlist Title 3",
      image_url:
        "https://i.scdn.co/image/36241af268aef838a5f9aa6bd635a170adffbeee",
      creator: "Creator 3",
      mood: ["rgba(84,73,120,0.8)", "rgba(28,20,56,0.8)"],
      id: "5c800e85ff50f6001e086bae"
    }
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
            <Connected_PlaylistItem
              playlistData={this.state.saved}
              hasStarred={true}
              navigate={this.props.navigation}
            />
          </View>

          <View>
            <Text style={styles.h2}>My Playlist</Text>
            <Connected_PlaylistItem
              playlistData={this.state.my}
              hasStarred={false}
              navigate={this.props.navigation}
            />
          </View>
        </View>
      </View>
    );
  }
}


var starred;
var currentPlaylist;
class PlaylistItem extends Component {
  constructor(props) {
    super(props);

    this.onPress = this.onPress.bind(this);
  }

  componentDidMount() {
    this.props.initialize()
    // this.props.fetchSavedPlaylists()
  }

  componentWillMount() {
    if (this.props.hasStarred) {
      starred = (
        <TouchableOpacity
          onPress={() => this.onPress("5c800e85ff50f6001e086bae")}
          // onPress={()=>{this.props.onPress; currentPlaylist="5c77715834dcda001ee60096"}}
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
            }}
          >
            <Icon
              style={{ color: Colors.defaultIcon, textAlign: "center" }}
              name="ios-star"
              size={25}
            />
            <Text style={[styles.title, { textAlign: "center" }]}>Starred</Text>
          </LinearGradient>
        </TouchableOpacity>
      );
    } else {
      starred = null;
    }
  }

  onPress(playlistID) {
    currentPlaylist = playlistID;
    const { navigate } = this.props.navigate;
    navigate("Playlist");
  }

  render() {
    return (
      <View>
        <ScrollView
          showsHorizontalScrollIndicator={false}
          horizontal={true}
          style={{ paddingVertical: 15 }}
        >
          {starred}
          {this.props.playlistData.map((item, index) => (
            <TouchableOpacity onPress={() => this.onPress(item.id)} key={index}>
              <ImageBackground
                source={{ uri: item.image_url }}
                style={[
                  styles.playlistView,
                  { maxWidth: "100%", maxHeight: "100%" }
                ]}
              >
                <LinearGradient
                  colors={[item.mood[0], item.mood[1]]}
                  style={{
                    width: "100%",
                    height: "100%",
                    flexDirection: "column-reverse",
                    padding: 10
                  }}
                >
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
  render(){
    return(<Playlist id={currentPlaylist} navigation={this.props.navigation}/>);
  }
};

const mapStateToProps = state => ({
  isVisible: state.playlist.isVisible,
  // savedPlaylists: state.library.savedPlaylists
});

const mapDispatchToProps = {
  togglePlaylistView,
  // fetchSavedPlaylists,
  initialize
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
    Playlist: { screen: PlaylistView },
  },
  {
    mode: "modal",
    headerMode: "none"
  }
);

const Library = createAppContainer(MainNavigator);

export default Library;
