import React, { Component } from 'react';
import { View, StyleSheet, Text } from "react-native";
import { Colors } from "./../styles/Colors";

class Tag extends Component {
  /**
   *
   * @param {required} props
   * Use the class constructor to set the initial state
   * for your component.
   */
  constructor(props) {
    super(props);
    this.state = {
      tagData: props.tagData
    };
  }

  render() {
    return (
      <View style={styles.tagContainer}>
        {this.state.tagData.map((item, index) => (
          <Text key={index} style={styles.tagName}>
            {item}
          </Text>
        ))}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  tagContainer: {
    flexDirection: "row",
    maxHeight: 25
  },
  tagName: {
    color: Colors.defaultFont,
    fontSize: 10,
    fontFamily: "Avenir",
    borderColor: "white",
    borderWidth: 1,
    borderRadius: 13,
    paddingVertical: 5,
    paddingHorizontal: 15,
    marginRight: 10
  }
});

export { Tag };