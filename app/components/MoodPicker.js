import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Modal,  Dimensions, ScrollView } from 'react-native';
import { ColorWheel } from 'react-native-color-wheel';
import { Tag } from './Tag';

class MoodPicker extends React.Component {



  render(){
    return(
      

      <View style={styles.moodPicker}> 
        <View style={{width: "100%", height: 100, alignItems: "flex-end", }}>
        
              <TouchableOpacity
                onPress={() => {this.props.closeMp()}}
                style={{}}>
                
                        <Image
                          source={require('../assets/close-button.png')}
                          style={{
                            
                            marginRight: 30,
                            marginTop: 55,
                            padding: 20
                          }} />
                            
                          
                  </TouchableOpacity>

        </View>

          <View style={{flex: 2, height: 300, }}>
            
          <ColorWheel
              initialColor="#ffffff"
              onColorChange={color => console.log({color})}
              onColorChangeComplete={color => onChange(color)}
              style={{marginTop: 20,
              width: Dimensions.get('window').width,
              maxHeight: 400
                        }}
              thumbStyle={{ height: 30, width: 30, borderRadius: 30}}
                  />




            </View>   

            <ScrollView style={styles.tags} horizontal={true} showsHorizontalScrollIndicator={false}> 
              <Tag tagData={["Holiday", "Vacation", "Late Night", "Early Morning", "Celebration", "Classical", "Driving", "Home", "2000's", "1960's", "1980's", "International", "Religious"]} />
            </ScrollView>
            
      </View>
  
    )
  }


}

const styles = StyleSheet.create({
    
    moodPicker: {
      backgroundColor: "#312F2F",
      height: 1000,
      opacity: .95,
      flex: 1,
      flexDirection: "column",
      alignItems: "flex-start"
      
  
    },
    tags: {
    marginLeft: 30,
    marginTop: 30
    
    }
    
  });

  export { MoodPicker };