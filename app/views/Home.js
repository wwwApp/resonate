import React, { Component } from "react";
import { StyleSheet, Text, View, ScrollView, ImageBackground, Image, TouchableOpacity, Modal, Dimensions, Animated } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import MapStyle from "./../styles/MapStyle.json";
import { MoodPicker } from "../components/MoodPicker.js";
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      region: {
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421
      },
      isOpen: false,
      topY: new Animated.Value(60),
      modalVisible: false,
    };
  }


  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  onPress = () => {
    console.log(this.state.topY)
    if (this.state.isOpen) {
      Animated.spring(this.state.topY, {
        toValue: 60,
        friction: 6,
      }).start()
    } else {
      Animated.spring(this.state.topY, {
        toValue: 500,
        friction: 6
      }).start()

    }
    this.setState({isOpen: !this.state.isOpen})
  }
  render() {
    const paddingStyle = {
      paddingTop: this.state.topY
    }
    
    return (
      <Animated.View style={[styles.container, paddingStyle]}>
    


{/*********************************** MAP *********************************************/}
      <View style={styles.map}>

      <MapView
        provider={PROVIDER_GOOGLE}
        style={{ flex: 1 }}
        region={this.state.region}
        customMapStyle={MapStyle}
      />


        <View style={{flex: 1, flexDirection: "row", justifyContent: "center", marginTop: 65, position: "absolute" }}>
          <Text style={{color: "white",  marginLeft: 10, fontSize: 28, fontWeight: "bold", paddingRight: 120}}>Philadelphia</Text>

                <TouchableOpacity
                onPress={() => {
                  this.setModalVisible(true);
                }}>
                <Image source={require('../assets/moodPicker.png')} style={{}}/>

                </TouchableOpacity>
        </View>
      </View>


      
{/*********************************** DOWN ARROW *********************************************/}
      <View style={{width: "100%", height: 60, backgroundColor: "#312F2F", marginTop: 60, borderTopLeftRadius: 14, borderTopRightRadius: 14, alignItems: "center"}}>

      
      <TouchableOpacity onPress={this.onPress}>
          <Image style={{marginTop: 15}}
            source={require('../assets/down-arrow.png')}
            
          />
        </TouchableOpacity>

      
      </View>

      {/*********************************** SCROLLVIEW 1 *********************************************/}
      <ScrollView style={styles.mainWrapper}>
      
        
        <View contentContainerstyle={styles.titleWrapper}>
        <Text style={{color: "white", marginLeft: 30, fontSize: 20}}>Top Charts</Text>
        </View>
        

        <ScrollView style={styles.playlistRow} horizontal={true} showsHorizontalScrollIndicator={false}>
        
          <View style={styles.card} >
            <View style={styles.cardWrapper}>

              <View style={styles.cardTop}>
                <ImageBackground source={require('../assets/playlistImage.png')} style={{width: '100%', height: '100%'}}> 

                <View style={{width: "100%",  flexDirection: 'row', justifyContent: 'flex-end', padding: 5}}>

                <Image
          source={require('../assets/heart.png')}
          
        />
                </View>

                <View style={{width: "100%", flexDirection: "row", justifyContent: "center", marginTop: 49}}>

                <Image 
                source={require('../assets/playBtn.png')}/>

                </View>
               
                
                <Text style={{color: 'white', marginTop: 40, marginLeft: 10, fontSize: 20}}>
                  Playlist Title
                </Text>
                </ImageBackground>
              </View>

            <View style={styles.cardBottom}>

            <View>
              <Text style={styles.songTitle}>Song Title</Text>
              <Text style={styles.artistName}>Artist</Text>
            </View>
            <View>
              <Text style={styles.songTitle}>Song Title</Text>
              <Text style={styles.artistName}>Artist</Text>
            </View>
            <View>
              <Text style={styles.songTitle}>Song Title</Text>
              <Text style={styles.artistName}>Artist</Text>
            </View>
              
            </View>

            </View>
          </View>
          

          <View style={styles.card} >
            <View style={styles.cardWrapper}>

              <View style={styles.cardTop}>
                <ImageBackground source={require('../assets/playlistImage.png')} style={{width: '100%', height: '100%'}}> 

                <View style={{width: "100%",  flexDirection: 'row', justifyContent: 'flex-end', padding: 5}}>

                <Image
          source={require('../assets/heart.png')}
          
        />
                </View>

                <View style={{width: "100%", flexDirection: "row", justifyContent: "center", marginTop: 49}}>

                <Image 
                source={require('../assets/playBtn.png')}/>

                </View>
               
                
                <Text style={{color: 'white', marginTop: 40, marginLeft: 10, fontSize: 20}}>
                  Playlist Title
                </Text>
                </ImageBackground>
              </View>

            <View style={styles.cardBottom}>

            <View>
              <Text style={styles.songTitle}>Song Title</Text>
              <Text style={styles.artistName}>Artist</Text>
            </View>
            <View>
              <Text style={styles.songTitle}>Song Title</Text>
              <Text style={styles.artistName}>Artist</Text>
            </View>
            <View>
              <Text style={styles.songTitle}>Song Title</Text>
              <Text style={styles.artistName}>Artist</Text>
            </View>
              
            </View>

            </View>
          </View>

          <View style={styles.card} >
            <View style={styles.cardWrapper}>

              <View style={styles.cardTop}>
                <ImageBackground source={require('../assets/playlistImage.png')} style={{width: '100%', height: '100%'}}> 

                <View style={{width: "100%",  flexDirection: 'row', justifyContent: 'flex-end', padding: 5}}>

                <Image
          source={require('../assets/heart.png')}
          
        />
                </View>

                <View style={{width: "100%", flexDirection: "row", justifyContent: "center", marginTop: 49}}>

                <Image 
                source={require('../assets/playBtn.png')}/>

                </View>
               
                
                <Text style={{color: 'white', marginTop: 40, marginLeft: 10, fontSize: 20}}>
                  Playlist Title
                </Text>
                </ImageBackground>
              </View>

            <View style={styles.cardBottom}>

            <View>
              <Text style={styles.songTitle}>Song Title</Text>
              <Text style={styles.artistName}>Artist</Text>
            </View>
            <View>
              <Text style={styles.songTitle}>Song Title</Text>
              <Text style={styles.artistName}>Artist</Text>
            </View>
            <View>
              <Text style={styles.songTitle}>Song Title</Text>
              <Text style={styles.artistName}>Artist</Text>
            </View>
              
            </View>

            </View>
          </View>

        </ScrollView>

        {/*********************************** SCROLLVIEW 2 *********************************************/}

        <View contentContainerstyle={styles.titleWrapper}>
        <Text style={{color: "white", marginLeft: 30, fontSize: 20}}>Recommended</Text>
        </View>
        

        <ScrollView style={styles.playlistRow} horizontal={true} showsHorizontalScrollIndicator={false}>
        
          <View style={styles.card} >
            <View style={styles.cardWrapper}>

              <View style={styles.cardTop}>
                <ImageBackground source={require('../assets/playlistImage.png')} style={{width: '100%', height: '100%'}}> 

                <View style={{width: "100%",  flexDirection: 'row', justifyContent: 'flex-end', padding: 5}}>

                <Image
          source={require('../assets/heart.png')}
          
        />
                </View>

                <View style={{width: "100%", flexDirection: "row", justifyContent: "center", marginTop: 49}}>

                <Image 
                source={require('../assets/playBtn.png')}/>

                </View>
               
                
                <Text style={{color: 'white', marginTop: 40, marginLeft: 10, fontSize: 20}}>
                  Playlist Title
                </Text>
                </ImageBackground>
              </View>

            <View style={styles.cardBottom}>

            <View>
              <Text style={styles.songTitle}>Song Title</Text>
              <Text style={styles.artistName}>Artist</Text>
            </View>
            <View>
              <Text style={styles.songTitle}>Song Title</Text>
              <Text style={styles.artistName}>Artist</Text>
            </View>
            <View>
              <Text style={styles.songTitle}>Song Title</Text>
              <Text style={styles.artistName}>Artist</Text>
            </View>
              
            </View>

            </View>
          </View>
          

          <View style={styles.card} >
            <View style={styles.cardWrapper}>

              <View style={styles.cardTop}>
                <ImageBackground source={require('../assets/playlistImage.png')} style={{width: '100%', height: '100%'}}> 

                <View style={{width: "100%",  flexDirection: 'row', justifyContent: 'flex-end', padding: 5}}>

                <Image
          source={require('../assets/heart.png')}
          
        />
                </View>

                <View style={{width: "100%", flexDirection: "row", justifyContent: "center", marginTop: 49}}>

                <Image 
                source={require('../assets/playBtn.png')}/>

                </View>
               
                
                <Text style={{color: 'white', marginTop: 40, marginLeft: 10, fontSize: 20}}>
                  Playlist Title
                </Text>
                </ImageBackground>
              </View>

            <View style={styles.cardBottom}>

            <View>
              <Text style={styles.songTitle}>Song Title</Text>
              <Text style={styles.artistName}>Artist</Text>
            </View>
            <View>
              <Text style={styles.songTitle}>Song Title</Text>
              <Text style={styles.artistName}>Artist</Text>
            </View>
            <View>
              <Text style={styles.songTitle}>Song Title</Text>
              <Text style={styles.artistName}>Artist</Text>
            </View>
              
            </View>

            </View>
          </View>

          <View style={styles.card} >
            <View style={styles.cardWrapper}>

              <View style={styles.cardTop}>
                <ImageBackground source={require('../assets/playlistImage.png')} style={{width: '100%', height: '100%'}}> 

                <View style={{width: "100%",  flexDirection: 'row', justifyContent: 'flex-end', padding: 5}}>

                <Image
          source={require('../assets/heart.png')}
          
        />
                </View>

                <View style={{width: "100%", flexDirection: "row", justifyContent: "center", marginTop: 49}}>

                <Image 
                source={require('../assets/playBtn.png')}/>

                </View>
               
                
                <Text style={{color: 'white', marginTop: 40, marginLeft: 10, fontSize: 20}}>
                  Playlist Title
                </Text>
                </ImageBackground>
              </View>

            <View style={styles.cardBottom}>

            <View>
              <Text style={styles.songTitle}>Song Title</Text>
              <Text style={styles.artistName}>Artist</Text>
            </View>
            <View>
              <Text style={styles.songTitle}>Song Title</Text>
              <Text style={styles.artistName}>Artist</Text>
            </View>
            <View>
              <Text style={styles.songTitle}>Song Title</Text>
              <Text style={styles.artistName}>Artist</Text>
            </View>
              
            </View>

            </View>
          </View>

        </ScrollView>
        </ScrollView>

        <Modal
        animationType="slide"
        transparent={true}    
        visible={this.state.modalVisible}  >


        <MoodPicker closeMp={() => {this.setModalVisible(false)} }/>

        
        </Modal>
   
        </Animated.View> 
      
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
   // paddingTop: 60,
    flexDirection: 'column',
    position: "relative",
    
    // alignItems: 'center',
    justifyContent: 'flex-start',

    
  },
  map: {
    
    position: "absolute",
    zIndex: -100,
    width: "100%",
    height: 600
  },
  mainWrapper: {
    flex: 1,
    // marginTop: 50,
    zIndex: 100,
    backgroundColor: "#312F2F"
  },
  playlistRow: {
    flex: 1,
    flexDirection: "row",
    height: 400,
    paddingTop: 20,
    paddingLeft: 30

  },
  card: {
    width: 252, 
    height: 345, 
    backgroundColor: '#312F2F', 
    marginRight: 30,
    shadowOffset:{  width: 0,  height: 0,  },
    shadowColor: 'black',
    shadowOpacity: 1.0,
    shadowRadius: 10,

    
  },
  cardWrapper: {
    flex: 1,
    flexDirection: 'column'
  },
  cardTop: {
    height: 200,
    width: "100%"
  },
  cardBottom: {
    height: 153,
    width: "100%",
    flexDirection: 'column',
    alignItems: 'flex-start',
    padding: 10
  },
  songTitle: {
    color: 'white',
    fontSize: 15,
    paddingBottom: 2
    
  },
  artistName: {
    color: "#E3E3E3",
    fontSize: 13,
    paddingBottom: 9
  },
  moodPicker: {
    backgroundColor: "#312F2F",
    height: 1000,
    opacity: .95,
    flex: 1,
    flexDirection: "column",
    alignItems: "flex-start"
    

  }
  
});

export default Home;

   
