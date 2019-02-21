import React, { Component } from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { Colors } from "./../styles/Colors";

class Button extends Component {
  /**
   *
   * @param {required} props
   * Use the class constructor to set the initial state
   * for your component.
   */
  constructor(props) {
    super(props);
    this.state = { type: props.type };
  }

  render() {
    switch (this.state.type) {
      // Icons from top-bar
      case "heart":
        return (
          <TouchableOpacity>
            <Icon style={styles.iconStyle} name="md-heart-empty" size={35} />
          </TouchableOpacity>
        );
      case "return":
        return (
          <TouchableOpacity>
            <Icon style={styles.iconStyle} name="ios-arrow-back" size={35} />
          </TouchableOpacity>
        );
      case "more":
        return (
          <TouchableOpacity>
            <Icon
              style={[
                styles.iconStyle,
                styles.verticalIcon,
                { marginLeft: 10, marginRight: -10 }
              ]}
              name="ios-more"
              size={35}
            />
          </TouchableOpacity>
        );
      case "minimize":
        return (
          <TouchableOpacity onPress={this.props.onPress}>
            <Icon
              style={[styles.iconStyle, styles.verticalIcon]}
              name="ios-arrow-back"
              size={35}
            />
          </TouchableOpacity>
        );
      // Icons from track item
      case "track-star":
        return (
          <TouchableOpacity>
            <Icon style={styles.iconStyle} name="ios-star-outline" size={25} />
          </TouchableOpacity>
        );
      case "track-more":
        return (
          <TouchableOpacity>
            <Icon
              style={[styles.iconStyle, styles.verticalIcon]}
              name="ios-more"
              size={25}
            />
          </TouchableOpacity>
        );
      // Icons from playbutton
      case "pb-play":
        return (
          <TouchableOpacity>
            <Icon style={[styles.iconStyle]} name="ios-play" size={50} />
          </TouchableOpacity>
        );
      case "pb-pause":
        return (
          <TouchableOpacity>
            <Icon style={[styles.iconStyle]} name="ios-more" size={50} />
          </TouchableOpacity>
        );
      // Icons from playbutton
      case "pl-star":
        return (
          <TouchableOpacity>
            <Icon style={styles.iconStyle} name="ios-star-outline" size={35} />
          </TouchableOpacity>
        );
      case "pl-shuffle":
        return (
          <TouchableOpacity>
            <Icon style={styles.iconStyle} name="ios-repeat" size={35} />
          </TouchableOpacity>
        );
      default:
        return (
          <View>
            <Text>Null</Text>
          </View>
        );
    }
  }
}

const styles = StyleSheet.create({
  iconStyle: {
    color: Colors.defaultIcon
  },
  verticalIcon: {
    transform: [{ rotate: "270deg" }]
  }
});

export { Button };