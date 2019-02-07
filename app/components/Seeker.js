import React, { Component } from "react";
import { View, StyleSheet, Animated } from "react-native";
import { Colors } from "./../styles/Colors";

const Seeker = props => {
  return (
    <View style={styles.seeker}>
      <Filler percentage={props.percentage} />
    </View>
  );
};

const Filler = props => {
  return <View style={[styles.filler, { width: `${props.percentage}%` }]} />;
};

const styles = StyleSheet.create({
  seeker: {
    height: 5,
    backgroundColor: Colors.seekerInactive
  },
  filler: {
      backgroundColor: Colors.seekerActive,
      height: '100%'
  }
});

export { Seeker };