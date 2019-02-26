import React, { Component } from 'react';
import {
  View, StyleSheet, Text, ScrollView, PanResponder,
  Animated, ImageBackground, TextInput
} from "react-native";
import { Colors } from "../styles/Colors";
import LinearGradient from "react-native-linear-gradient";
import {initSpotify, searchTrack, dragItem} from "../redux/reducers/spotify.reducer";
import { connect } from "react-redux";

var fakeData = {
  trackListA: [
    {
      "artists": [
        "Stevie Wonder"
      ],
      "_id": "5c6ac32fe21c4e00360b5596",
      "title": "Sir Duke",
      "album": "Songs In The Key Of Life (Reissue)",
      "image_url": "https://i.scdn.co/image/36241af268aef838a5f9aa6bd635a170adffbeee",
      "spotify_id": "2udw7RDkldLFIPG9WYdVtT"
    },
    {
      "artists": [
        "Marvin Gaye"
      ],
      "_id": "5c6ac32fe21c4e00360b5595",
      "title": "What's Going On",
      "album": "What's Going On",
      "image_url": "https://i.scdn.co/image/79cc9cb5325ea22f480989045cf62e962822803a",
      "spotify_id": "34b3a3Pz9Jlz0092LMyNAB"
    },
    {
      "artists": [
        "Janelle Monáe"
      ],
      "_id": "5c6ac32fe21c4e00360b5594",
      "title": "Make Me Feel",
      "album": "Make Me Feel",
      "image_url": "https://i.scdn.co/image/29979c0664b46f3e54b2a3f66f448c9df11f929f",
      "spotify_id": "79GsUxLyzxgnN4I1E11dtO"
    }
  ],
  trackListB: [
    {
      "artists": [
        "Marvin Gaye"
      ],
      "_id": "5c6ac32fe21c4e00360b5595",
      "title": "What's Going On",
      "album": "What's Going On",
      "image_url": "https://i.scdn.co/image/79cc9cb5325ea22f480989045cf62e962822803a",
      "spotify_id": "34b3a3Pz9Jlz0092LMyNAB"
    },
    {
      "artists": [
        "Janelle Monáe"
      ],
      "_id": "5c6ac32fe21c4e00360b5594",
      "title": "Make Me Feel",
      "album": "Make Me Feel",
      "image_url": "https://i.scdn.co/image/29979c0664b46f3e54b2a3f66f448c9df11f929f",
      "spotify_id": "79GsUxLyzxgnN4I1E11dtO"
    }
  ]
}

class TrackView extends Component {
  constructor() {
    super();
    this.state = {
      pan: new Animated.ValueXY(),
      dragging: false
    };
  }


  componentWillMount() {
    // Add a listener for the delta value change
    this._val = { x: 0, y: 0 }
    this.state.pan.addListener((value) => this._val = value);
    // Initialize PanResponder with move handling
    this.panResponder = PanResponder.create({
      onMoveShouldSetPanResponder: (evt, gestureState) => {
        return Math.abs(gestureState.dy) > Math.abs(gestureState.dx * 3);
      },
      onPanResponderMove: (e, gesture) => {
        if (!this.props.isBottom && gesture.dy > 5)
          this.props.onDrag(this.props.i, gesture.dy, this.props.isBottom);
        else if (this.props.isBottom && gesture.dy < -5)
          this.props.onDrag(this.props.i, gesture.dy, this.props.isBottom);
        Animated.event([null, { dy: this.state.pan.y }])(e, gesture)
      },
      onPanResponderRelease: (e, gesture) => {
        this.onRelease(e,gesture, false);
      },
      onPanResponderTerminate: (e, gesture) => {
        this.onRelease(e,gesture, true);
      }
      // adjusting delta value
    });

    this.state.pan.setValue({ x: 0, y: 0 });
    let fromOffset = (this.props.isBottom) ? this.props.offsets.listB : this.props.offsets.listA;
    let toOffset = (this.props.isBottom) ? this.props.offsets.listA : this.props.offsets.listB;
    if (!this.props.dragFrom && (this.props.dragData.index + fromOffset == this.props.i + toOffset ) && (this.props.transitioning)) {
      let multiplier = (this.props.isBottom) ? 1 : -1;
      let distance =( multiplier ) * this.props.dragData.dragDistance - (multiplier * (styles.trackView.height + styles.stack.marginTop + 60));
      this.animateIn(distance);
    }
  }

  onRelease = (e, gesture, cancel) => {
    this.setState({ dragging: false });
    if (!this.props.isBottom &&( gesture.dy < 40 || cancel)) {
      Animated.spring(this.state.pan, {
        toValue: { x: 0, y: 0 },
        friction: 5
      }).start();
      
      this.props.onStopDrag(null);
    } else if (this.props.isBottom && (gesture.dy > -40 || cancel)) {
      Animated.spring(this.state.pan, {
        toValue: { x: 0, y: 0 },
        friction: 5
      }).start();
      
      this.props.onStopDrag(null);
    } else {
      this.props.onStopDrag(this.props.track, this.props.i, this.props.isBottom, gesture.dy);
    }
  }

  animateIn = (y) => {
    this.state.pan.y.setValue(y);
    Animated.spring(this.state.pan, {
      toValue: { x: 0, y: 0 },
      friction: 5
    }).start();
  }

  render() {
    const panStyle = {
      transform: this.state.pan.getTranslateTransform()
    }
    var insertStyle = {}
    let fromOffset = (this.props.isBottom) ? this.props.offsets.listB : this.props.offsets.listA;
    let toOffset = (this.props.isBottom) ? this.props.offsets.listA : this.props.offsets.listB;
    let increment = (this.props.transitioning) ? 1 : 0;
    if (!this.props.dragFrom && (this.props.dragData.index + fromOffset == this.props.i + toOffset - increment)) {
      insertStyle = {
        marginLeft: this.props.dragData.marginLeft
      }
    } if (this.props.dragFrom && (this.props.dragData.index - increment == this.props.i - 1)) {
      insertStyle = {
        marginLeft: this.props.dragData.marginAdjacent
      }
    } if (!this.props.dragFrom && (this.props.dragData.index + fromOffset == this.props.i + toOffset ) && (this.props.transitioning)) {
      insertStyle = {
        marginRight: -1 * (styles.trackView.width)
      }
    }

    return (
      <Animated.View {...this.panResponder.panHandlers} style={[panStyle,styles.trackView, insertStyle]}>
        <ImageBackground source={{uri: this.props.track.image_url}} style={{width: '100%', height: '100%'}}>
          <LinearGradient colors={['#0000', '#000E']} style={{width: '100%', height: '100%', flexDirection: "column-reverse", padding: 10}}>
            <Text style={styles.artist}>{this.props.track.artists[0]}</Text>
            <Text style={styles.title}>{this.props.track.title}</Text>
          </LinearGradient>
        </ImageBackground>
      </Animated.View>
    )
  }
}

class TrackStack extends Component {
  constructor() {
    super();
    this.state = {
      listA: fakeData.trackListA,
      listB: fakeData.trackListB,
      totalDragDistance: (styles.trackView.height + styles.stack.marginTop + 110),
      dragData: {
        index: 0,
        marginLeft: new Animated.Value(0),
        marginAdjacent: new Animated.Value(0),
        dragDistance: 0
      },
      offsets: {
        listA: 0,
        listB: 0
      },
      dragFromTop: true,
      insertTransitioning: false
    };
  }

  onDrag = (index, dy, isBottom) => {
    this.setState({dragFromTop: !isBottom})
    var dragData = {...this.state.dragData}
    dragData.index = index;
    dragDistance = isBottom ? -dy : dy;
    dragData.dragDistance = dragDistance;
    dragData.marginLeft.setValue(dragDistance / this.state.totalDragDistance * (styles.trackView.width + styles.trackView.marginRight))
    this.setState({dragData})
  }

  onStopDrag = (item, index, isBottom, distance) => {
    if (item === null) {
      Animated.spring(this.state.dragData.marginLeft, {
        toValue: 0,
        friction: 12
      }).start();
    } else {
      this.state.dragData.marginAdjacent.setValue(styles.trackView.width + styles.trackView.marginRight);
      Animated.spring(this.state.dragData.marginAdjacent, {
        toValue: 0,
        friction: 12
      }).start();
      Animated.spring(this.state.dragData.marginLeft, {
        toValue: (styles.trackView.width + styles.trackView.marginRight),
        friction: 12
      }).start(() => {
        this.state.dragData.marginLeft.setValue(0);
        this.setState({insertTransitioning: false});
      })

      let offset = 0;
      if (!isBottom) {
        offset = index - this.state.offsets.listA + this.state.offsets.listB;
      } else {
        offset = index - this.state.offsets.listB + this.state.offsets.listA;
      }

      this.props.dragItem(this.props.searchResults, this.props.trackQueue, index, offset, !isBottom);

      this.setState({
        insertTransitioning: true,
        dragging: false
      })
    }
    

  }

  handleScrollTop = (event, isBottom) => {
    let distance = event.nativeEvent.contentOffset.x;
    let offset = Math.round(distance / (styles.trackView.width + styles.trackView.marginRight));
    if (isBottom) {
      this.setState({
        offsets: {
          listA: this.state.offsets.listA,
          listB: offset
        }
      });
    } else {
      this.setState({
        offsets: {
          listA: offset,
          listB: this.state.offsets.listB
        }
      });
    }
  }
  
  handleScrollBottom = (event) => {
    this.handleScrollTop(event, true);
  }

  componentDidMount() {
    this.props.initSpotify();
  }
  
  render() {
    var paddingStyle = {
      paddingLeft:16, 
      paddingRight:16
    };
    return (
      <View style={{backgroundColor: "#0004"}}>
        <View style={[this.props.styles.textInputWrapper, paddingStyle, {backgroundColor: Colors.defaultBg, paddingBottom: 16, marginBottom:0}]} >
          <TextInput 
            style={this.props.styles.textInput} 
            placeholder="search for artist, album ..."
            placeholderTextColor={Colors.defaultFont}
            onChangeText={this.props.searchTrack}
            value={this.props.term}
          />
          <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={[Colors.tintTopGradient, Colors.tintBottomGradient]} style={{width: '100%', height: 4}} />
        </View>
        <ScrollView 
          snapToAlignment='right' 
          snapToInterval={styles.trackView.width + styles.trackView.marginRight} 
          horizontal={true} 
          style={[styles.stack, paddingStyle]} 
          scrollEnabled={true} 
          onScroll={this.handleScrollTop} 
          scrollEventThrottle={64}
        >
          {this.props.searchResults.map((item, index) => (
            <TrackView 
              transitioning={this.state.insertTransitioning} 
              track={item} 
              offsets={this.state.offsets} 
              isBottom={false} 
              dragFrom={this.state.dragFromTop} 
              key={item.spotify_id} 
              i={index} 
              dragData={this.state.dragData} 
              onDrag={this.onDrag} 
              onStopDrag={(item, index, distance) => {this.onStopDrag(item, index, false, distance)}} 
            />
          ))}
        </ScrollView>
        <View style={[styles.text, paddingStyle,{backgroundColor: Colors.defaultBg}, {paddingBottom:5, paddingTop:10}]}>
          <Text style={this.props.styles.h3}>tracks in {this.props.title}</Text>
        </View>
        <ScrollView 
          snapToAlignment='right' 
          snapToInterval={styles.trackView.width + styles.trackView.marginRight} 
          horizontal={true} 
          style={[styles.stack, paddingStyle]} 
          scrollEnabled={true} 
          onScroll={this.handleScrollBottom} 
          scrollEventThrottle={64}
        >
          {this.props.trackQueue.map((item, index) => (
            <TrackView 
              transitioning={this.state.insertTransitioning} 
              track={item} 
              offsets={this.state.offsets} 
              isBottom={true} 
              dragFrom={!this.state.dragFromTop} 
              key={item.spotify_id} 
              i={index} 
              dragData={this.state.dragData} 
              onDrag={this.onDrag} 
              onStopDrag={(item, index, distance) => {this.onStopDrag(item,index, true, distance)}} 
            />
          ))}
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  trackView: {
    backgroundColor: Colors.tintBottomGradient,
    marginRight: 5,
    width: 150,
    height: 150,
    shadowOffset:{  width: 3,  height: 3,  },
    shadowColor: 'black',
    shadowOpacity: 0.4,
    zIndex: 10
  },
  stack: {
    overflow: "visible",
    marginTop: 15,
    marginBottom: 15,
    zIndex: 5,
    height: 150,
  },
  title: {
    fontFamily: "Avenir",
    color: "#FFF",
    fontWeight: "700",
    fontSize: 16
  },
  artist: {
    fontFamily: "Avenir",
    color: "#FFFC",
    fontWeight: "400",
    fontSize: 14
  },
  text: {
    zIndex: 0
  }
});

const mapStateToProps = state => ({
  term: state.spotify.term,
  searchResults: state.spotify.searchResults,
  trackQueue: state.spotify.trackQueue
});

const mapDispatchToProps = {
	initSpotify,
  searchTrack,
  dragItem
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(TrackStack);
