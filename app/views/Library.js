import React, { Component } from "react";
import { StyleSheet, Text, View, Button, ScrollView, ImageBackground, TouchableOpacity, Image, Modal } from "react-native";
import { Colors } from "./../styles/Colors";
import {createStackNavigator, createAppContainer} from 'react-navigation';
import Create from "./Create";
import { TrippleDotMenu } from "../components/TrippleDotMenu";
class Lib extends Component {

  constructor(props) {
    super(props);
    this.state = {
  
  
      modalVisible: false,
    };
  }


  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  render() {
    const {navigate} = this.props.navigation;
    return (
      // Container View
      // Change the color values based on mood calculated from server for bg color
      <View style={styles.bg}>

      <View style={{flex: .1, flexDirection: "row", height: 30}}>

      <TouchableOpacity style={{height: 30, marginLeft: 30}} onPress={() => navigate('Create')}>
        <Image source={require('../assets/add.png')} />
      </TouchableOpacity>

      <TouchableOpacity style={{height: 30, marginLeft: 270}} onPress={() => {
                  this.setModalVisible(true);
                }}>
        <Image source={require('../assets/settings.png')} />
      </TouchableOpacity>
      

      </View>
     
      
       <View style={styles.libraryWrapper}>
       <View style={styles.libTitleWrapper}>
      <Text style={{color: "white", marginLeft: 30, fontSize: 20}}>Saved Playlists</Text>
      </View>
{/*       
              //////////////////////////////////  ROW 1 */}
      <ScrollView style={styles.libraryRow} horizontal={true} showsHorizontalScrollIndicator={false}>
      
      <View style={styles.starredCard} >
        <ImageBackground source={require('../assets/playlistImage.png')} style={{width: '100%', height: '100%'}}>

            <View style={styles.libCardWrapper}>

            <Image style={{marginLeft: 'auto', marginRight: 'auto', marginTop: 50}}source={require('../assets/star.png')}></Image>   
            <Text style={styles.starredTitle}>Starred Songs</Text>
            

            </View>

          </ImageBackground>
          
        </View>
        <View style={styles.libCard} >
        <ImageBackground source={require('../assets/playlistImage.png')} style={{width: '100%', height: '100%'}}>

            <View style={styles.libCardWrapper}>

                
            <Text style={styles.playlistTitle}>Playlist Title</Text>


            </View>

          </ImageBackground>
          
        </View>
        <View style={styles.libCard} >
        <ImageBackground source={require('../assets/playlistImage.png')} style={{width: '100%', height: '100%'}}>

            <View style={styles.libCardWrapper}>

                
            <Text style={styles.playlistTitle}>Playlist Title</Text>



            </View>

          </ImageBackground>
          
        </View>
        <View style={styles.libCard} >
        <ImageBackground source={require('../assets/playlistImage.png')}style={{width: '100%', height: '100%'}}>

            <View style={styles.libCardWrapper}>

                
            <Text style={styles.playlistTitle}>Playlist Title</Text>



            </View>

          </ImageBackground>
          
        </View>
        <View style={styles.libCard} >
        <ImageBackground source={require('../assets/playlistImage.png')} style={{width: '100%', height: '100%'}}>

            <View style={styles.libCardWrapper}>

                
            <Text style={styles.playlistTitle}>Playlist Title</Text>



            </View>

          </ImageBackground>
          
        </View>
        <View style={styles.libCard} >
        <ImageBackground source={require('../assets/playlistImage.png')} style={{width: '100%', height: '100%'}}>

            <View style={styles.libCardWrapper}>

                
            <Text style={styles.playlistTitle}>Playlist Title</Text>


            </View>

          </ImageBackground>
          
        </View>
        


      </ScrollView>

      {/*       
              //////////////////////////////////  ROW 2 */}

<View style={styles.libTitleWrapper}>
      <Text style={{color: "white", marginLeft: 30, fontSize: 20}}>Your Playlists</Text>
      </View>
      <ScrollView style={styles.libraryRow} horizontal={true} showsHorizontalScrollIndicator={false}>
      
      
        <View style={styles.libCard} >
        <ImageBackground source={require('../assets/playlistImage.png')} style={{width: '100%', height: '100%'}}>

            <View style={styles.libCardWrapper}>

                
            <Text style={styles.playlistTitle}>Playlist Title</Text>


            </View>

          </ImageBackground>
          
        </View>
        <View style={styles.libCard} >
        <ImageBackground source={require('../assets/playlistImage.png')} style={{width: '100%', height: '100%'}}>

            <View style={styles.libCardWrapper}>

                
            <Text style={styles.playlistTitle}>Playlist Title</Text>



            </View>

          </ImageBackground>
          
        </View>
        <View style={styles.libCard} >
        <ImageBackground source={require('../assets/playlistImage.png')}style={{width: '100%', height: '100%'}}>

            <View style={styles.libCardWrapper}>

                
            <Text style={styles.playlistTitle}>Playlist Title</Text>



            </View>

          </ImageBackground>
          
        </View>
        <View style={styles.libCard} >
        <ImageBackground source={require('../assets/playlistImage.png')} style={{width: '100%', height: '100%'}}>

            <View style={styles.libCardWrapper}>

                
            <Text style={styles.playlistTitle}>Playlist Title</Text>



            </View>

          </ImageBackground>
          
        </View>
        <View style={styles.libCard} >
        <ImageBackground source={require('../assets/playlistImage.png')} style={{width: '100%', height: '100%'}}>

            <View style={styles.libCardWrapper}>

                
            <Text style={styles.playlistTitle}>Playlist Title</Text>


            </View>

          </ImageBackground>
          
        </View>
        


      </ScrollView>
       
       </View>
      
       <Modal
        animationType="slide"
        transparent={true}    
        visible={this.state.modalVisible}  >


        <TrippleDotMenu closeTd={() => {this.setModalVisible(false)} }/>

        
        </Modal>

      </View>
      
    );
  }
}

const styles = StyleSheet.create({
  bg: {
    backgroundColor: Colors.defaultBg,
    flex:1,
    paddingTop:50
  },
 
  libraryRow: {
    flex: .5,
    flexDirection: "row",
    height: 170,
    paddingTop: 30,
    paddingLeft: 30,
  
   
  },
  libCard: {
    width: 162, 
    height: 162, 
    backgroundColor: '#312F2F', 
    marginRight: 30,
    shadowOffset:{  width: 0,  height: 0,  },
    shadowColor: 'black',
    shadowOpacity: 1.0,
    shadowRadius: 10,
   
  },
  playlistTitle: {
    marginTop: 130,
    marginLeft: 10,
    
    color: "white"
  },
  starredCard: {
    width: 162, 
    height: 162, 
    backgroundColor: '#312F2F', 
    marginRight: 30,
    shadowOffset:{  width: 0,  height: 0,  },
    shadowColor: 'black',
    shadowOpacity: 1.0,
    shadowRadius: 10,
   
  },
  starredTitle: {
    marginLeft: 'auto', 
    marginRight: 'auto',
    marginTop: 10,
    color: "white"

  },
  libraryWrapper: {
    flex: 1,
    
    marginTop: 20
  }
});


const MainNavigator = createStackNavigator(
  {
    Library: {screen: Lib},
    Create: {screen: Create}
  },
  {
    mode: 'modal',
    headerMode: 'none',
  }
);

const Library = createAppContainer(MainNavigator);

export default Library;