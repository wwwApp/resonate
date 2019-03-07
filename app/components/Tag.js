import React, { Component } from 'react';
import { View, StyleSheet, Text, Animated, TouchableOpacity } from "react-native";
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
      isChosen: false,
      background: new Animated.Value("white")
    };
  }

  onChoose = () => {
    console.log(this.state.background)
    if (this.state.isChosen) {
      Animated.timing(this.state.background, {
        toValue: "#312F2F"
        
      }).start()
    } else {
      Animated.timing(this.state.background, {
        toValue: "white",
      
      }).start()

    }
    this.setState({isChosen: !this.state.isChosen})
  }

  render() {
    const backgroundStyle = {
      backgroundColor: this.state.background
    }
    return (
     
      <Animated.View style={styles.tagContainer}>
        {this.state.tagData.map((item, index) => (
           <TouchableOpacity onPress={this.onChoose}>
           <View style={backgroundStyle}>
            <Text key={index} style={styles.tagName}>
              {item}
            </Text>
           </View>
          
          </TouchableOpacity>
        ))}
      </Animated.View>
      
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