import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Modal,  Dimensions, ImageBackground, Button } from 'react-native';
import { ColorWheel } from 'react-native-color-wheel';
import { Tag } from './Tag';

class TripleDotMenu extends React.Component {



  render(){
    return(
      

      <View style={styles.trippleDotMain}> 
        <View style={{width: "100%", height: 100, alignItems: "flex-end", }}>
        
              <TouchableOpacity
                onPress={() => {this.props.closeTd()}}
                style={{}}>
                
                        <Image
                          source={require('../assets/close-button.png')}
                          style={{
                            
                            marginRight: 30,
                            marginTop: 55,
                            
                          }} />
                            
                          
                  </TouchableOpacity>

        </View>

           

         <View style={styles.songImage}>
         <ImageBackground style={styles.songImageBackground} source={require('../assets/beatles.jpg')}>

      <View style={styles.songInfo}>
        <Text style={{color: "white", fontWeight:"bold", fontSize: 18}}>A Good Song</Text>
        <Text style={{color: "white"}}>The Beatles</Text>
      </View>
         
       
         </ImageBackground>
         
                          
         </View>

         <View style={styles.menuOptions}>
            <Button  color="#ffffff" style={styles.button} title="Add to Playlist"></Button>
            <Button  color="#ffffff" style={styles.button}  title="Save in Spotify">Save in Spotify</Button>
         </View>
      </View>
  
    )
  }


}

const styles = StyleSheet.create({
    
    trippleDotMain: {
      backgroundColor: "#312F2F",
      height: 1000,
      opacity: .95,
      flex: 1,
      flexDirection: "column",
      alignItems: "flex-start"
      
  
    },
    songImage: {
      width: 200,
      height: 200,
      backgroundColor: "black",
      marginLeft: "auto",
      marginRight: "auto",
      marginTop: 50
    },
    menuOptions: {
      flex: 1,
      flexDirection: "column",
      justifyContent: "center",
      width: "100%",
      alignItems: "center",
      
    },
    songImageBackground: {
      
      color: "white",
      
      width: "100%",
      height: "100%",
    },
    songInfo: {
      marginTop: 150,
      padding: 10
    }
    
  });

  export { TripleDotMenu };