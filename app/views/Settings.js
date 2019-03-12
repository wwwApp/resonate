import React, { Component } from "react";
import { StyleSheet, Text, View, Switch, Image } from "react-native";
import { Colors } from "./../styles/Colors";
import { ButtonIcon } from "./../components/ButtonIcon";
import { connect } from "react-redux";

class Settings extends Component {
  constructor() {
    super();
    this.state = {
      notiSwitchValue: false,
      locSwitchValue: false
    };
  }

  toggleNotiSwitch = value => {
    this.setState({ notiSwitchValue: value });
  };

  toggleLocSwitch = value => {
    this.setState({ locSwitchValue: value });
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.user}>
          <Image
            style={styles.circle}
            source={{ url: this.props.user.image_url }}
          />

          <Text style={[styles.name, styles.text]}>
            {this.props.user.display_name}
          </Text>
          <Text style={styles.text}>@{this.props.user.spotify_id}</Text>
        </View>

        <View style={styles.settings}>
          <View style={styles.row}>
            <Text style={[styles.settingText, styles.text]}>
              Notifications{" "}
            </Text>
            <View style={styles.switchContainer}>
              <Switch
                onValueChange={this.toggleNotiSwitch}
                value={this.state.notiSwitchValue}
              />
            </View>
          </View>

          <View style={styles.row}>
            <Text style={[styles.settingText, styles.text]}>Location</Text>
            <View style={styles.switchContainer}>
              <Switch
                onValueChange={this.toggleLocSwitch}
                value={this.state.locSwitchValue}
              />
            </View>
          </View>

          <View style={styles.row}>
            <Text style={[styles.settingText, styles.text]}>
              Import Playlist
            </Text>
            <View style={styles.moveIcon}>
              <ButtonIcon type="move" />
            </View>
          </View>

          <View style={styles.row}>
            <Text style={[styles.settingText, styles.text]}>Logout</Text>
            <View style={styles.moveIcon}>
              <ButtonIcon type="move" />
            </View>
          </View>

          <View style={styles.row}>
            <Text style={[styles.settingText, styles.text]}>
              Disconnect Account
            </Text>
            <View style={styles.moveIcon}>
              <ButtonIcon type="move" />
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: Colors.defaultBg,
    alignItems: "center"
  },
  text: {
    fontFamily: "Avenir",
    color: Colors.defaultFont
  },
  user: {
    flex: 1,
    alignItems: "center"
  },
  settings: {
    flex: 1,
    width: "100%",
    marginTop: 70
  },
  row: {
    flex: 1,
    flexDirection: "row",
    width: "100%",
    height: 50,
    borderTopColor: "white",
    borderTopWidth: 0.5,
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 37
  },
  settingText: {
    fontSize: 18,
    paddingVertical: 17
  },
  name: {
    fontSize: 25
  },
  circle: {
    width: 200,
    height: 200,
    borderRadius: 200 / 2,
    backgroundColor: Colors.defaultIcon,
    marginBottom: 30,
    marginTop: 80
  },
  moveIcon: {
    marginRight: 5
  }
});

function mapStateToProps(state) {
  return {
    user: state.user.userData
  };
}

export default connect(mapStateToProps)(Settings);
