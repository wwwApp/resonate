import React, { Component } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
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
      tagData: props.tagData,
      isSelected: this.setIsSelected()
    };
  }

  setIsSelected() {
    let temp = new Array();
    for (let i = 0; i < this.props.tagData.length; i++) {
      temp.push(false);
    }

    return temp;
  }

  toggleTag(index) {
    if (this.props.isSelectable) {
      let isSelected = this.state.isSelected;
      isSelected[index] = !this.state.isSelected[index];
      this.setState({ isSelected });
    }
  }

  render() {
    return (
      <View style={styles.tagContainer}>
        {this.state.tagData.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.tagStyle,
              this.state.isSelected[index] ? styles.selectedStyle : {}
            ]}
            onPress={() => this.toggleTag(index)}
          >
            <Text
              style={[
                styles.tagText,
                this.state.isSelected[index] ? styles.selectedText : {}
              ]}
            >
              {item}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  tagContainer: {
    flexDirection: "row"
  },
  tagText: {
    color: Colors.defaultFont,
    fontSize: 10,
    fontFamily: "Avenir"
  },
  tagStyle: {
    borderColor: "white",
    borderWidth: 1,
    borderRadius: 13,
    paddingVertical: 5,
    paddingHorizontal: 15,
    marginRight: 10
  },
  selectedStyle: {
    backgroundColor: "white"
  },
  selectedText: {
    color: Colors.selectedFont
  }
});

export { Tag };
