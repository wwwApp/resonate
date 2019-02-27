import React from 'react';
import { StyleSheet, Text, View, Image, TouchableHighlight, Modal,  Dimensions } from 'react-native';
import { ColorWheel } from './ColorWheel';
import { Tag } from './Tag';

class MoodPicker extends React.Component {
  static defaultProps = {
    onColorChange: () => {},
    initialColor: "#ffffff"
  }


  render(){
    return(
      

      <View style={styles.moodPicker}> 

          <View style={{flex: 2, height: 300, }}>
            
          <ColorWheel
              initialColor={this.props.initialColor}
              onColorChange={(color, coordinates) => this.props.onColorChange(color,coordinates)}
              style={{
              width: Dimensions.get('window').width,
              maxHeight: 400
                        }}
              thumbStyle={{ height: 30, width: 30, borderRadius: 30}}
                  />

            </View>   

            <Tag tagData={["Party", "Beach", "Warm Weather"]} />
      </View>
  
    )
  }


}

const styles = StyleSheet.create({
    
    moodPicker: {
      height: 1000,
      flex: 1,
      flexDirection: "column",
      alignItems: "flex-start"
    }
    
  });

  export { MoodPicker };