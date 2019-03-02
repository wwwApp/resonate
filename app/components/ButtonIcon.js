import React, { Component } from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { Colors } from "../styles/Colors";

const ButtonIcon = props => {
  switch (props.type) {
    // Icons for general purpose (nav, etc)
    case "return":
      return (
        <TouchableOpacity onPress={props.onPress}>
          <Icon style={styles.iconStyle} name="ios-arrow-back" size={35} />
        </TouchableOpacity>
      );
    case "close":
      return (
        <TouchableOpacity onPress={props.onPress}>
          <Icon style={[styles.iconStyle]} name="ios-close" size={50} />
        </TouchableOpacity>
      );
    case "more":
      return (
        <TouchableOpacity onPress={props.onPress}>
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
    case "heart":
      return (
        <TouchableOpacity onPress={props.onPress}>
          <Icon style={styles.iconStyle} name="md-heart-empty" size={35} />
        </TouchableOpacity>
      );
    case "minimize":
      return (
        <TouchableOpacity onPress={props.onPress}>
          <Icon
            style={[styles.iconStyle, styles.verticalIcon]}
            name="ios-arrow-back"
            size={35}
          />
        </TouchableOpacity>
      );
    case "maximize":
      return (
        <TouchableOpacity onPress={props.onPress}>
          <Icon
            style={[styles.iconStyle, styles.verticalIcon_reverse]}
            name="ios-arrow-back"
            size={35}
          />
        </TouchableOpacity>
          );
    case "create":
      return (
        <TouchableOpacity onPress={props.onPress}>
          <Icon style={styles.iconStyle} name="ios-add" size={40} />
        </TouchableOpacity>
      );
    // Icons for track item
    case "track-star":
      return (
        <TouchableOpacity onPress={props.onPress}>
          <Icon style={styles.iconStyle} name="ios-star-outline" size={25} />
        </TouchableOpacity>
      );
    case "track-more":
      return (
        <TouchableOpacity onPress={props.onPress}>
          <Icon
            style={[styles.iconStyle, styles.verticalIcon]}
            name="ios-more"
            size={25}
          />
        </TouchableOpacity>
      );
    // Icons from playlist
    case "pl-star":
      return (
        <TouchableOpacity onPress={props.onPress}>
          <Icon style={styles.iconStyle} name="ios-star-outline" size={35} />
        </TouchableOpacity>
      );
    case "pl-shuffle":
      return (
        <TouchableOpacity onPress={props.onPress}>
          <Icon style={styles.iconStyle} name="ios-repeat" size={35} />
        </TouchableOpacity>
      );
    // Icons from play controls
    case "pc-play":
      return (
        <TouchableOpacity onPress={props.onPress}>
          <Icon
            style={styles.iconStyle}
            name={props.toggleIcon}
            size={props.size}
          />
        </TouchableOpacity>
      );
    case "pc-backward":
      return (
        <TouchableOpacity onPress={props.onPress}>
          <Icon
            style={[styles.iconStyle, props.style]}
            name="ios-skip-backward"
            size={props.size}
          />
        </TouchableOpacity>
      );
    case "pc-forward":
      return (
        <TouchableOpacity onPress={props.onPress}>
          <Icon
            style={styles.iconStyle}
            name="ios-skip-forward"
            size={props.size}
          />
        </TouchableOpacity>
      );
    // Icon for playlist playbutton
    case "pl-play":
      return (
        <TouchableOpacity onPress={props.onPress}>
          <Icon
            style={[
              props.toggleIcon
                ? { marginTop: 5 }
                : { marginLeft: 5, marginTop: 5 },
              props.style
            ]}
            name={props.toggleIcon}
            size={props.size}
          />
        </TouchableOpacity>
      );
    default:
      return (
        <View>
          <Text>Null</Text>
        </View>
      );
  }
};

const styles = StyleSheet.create({
  iconStyle: {
    color: Colors.defaultIcon
  },
  verticalIcon: {
    transform: [{ rotate: "270deg" }]
  },
  verticalIcon_reverse: {
    transform: [{ rotate: "90deg" }]
  }
});

export { ButtonIcon };
