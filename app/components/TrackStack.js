import React, { Component } from 'react';
import {
  View, StyleSheet, Text, ScrollView, PanResponder,
  Animated, ImageBackground
} from "react-native";
import { Colors } from "../styles/Colors";
import LinearGradient from "react-native-linear-gradient";


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
      onStartShouldSetPanResponder: (e, gesture) => true,
      onPanResponderGrant: (e, gesture) => {
        // this.setState({ dragging: true });
      },
      onPanResponderMove: (e, gesture) => {
        if (!this.props.isBottom && gesture.dy > 5)
          this.props.onDrag(this.props.i, gesture.dy, this.props.isBottom);
        else if (this.props.isBottom && gesture.dy < 5)
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
      let distance =( multiplier ) * this.props.dragData.dragDistance - (multiplier * (styles.trackView.height + styles.stack.marginTop));
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
      transform: this.state.pan.getTranslateTransform(),
      zIndex: 2
    }
    var insertStyle = {}
    let fromOffset = (this.props.isBottom) ? this.props.offsets.listB : this.props.offsets.listA;
    let toOffset = (this.props.isBottom) ? this.props.offsets.listA : this.props.offsets.listB;
    let increment = (this.props.transitioning) ? 1 : 0;
    if (!this.props.dragFrom && (this.props.dragData.index + fromOffset == this.props.i + toOffset - increment)) {
      insertStyle = {
        marginLeft: this.props.dragData.marginLeft,
        zIndex: 0
      }
    } if (this.props.dragFrom && (this.props.dragData.index - increment == this.props.i - 1)) {
      insertStyle = {
        marginLeft: this.props.dragData.marginAdjacent,
        zIndex: 0
      }
    } if (!this.props.dragFrom && (this.props.dragData.index + fromOffset == this.props.i + toOffset ) && (this.props.transitioning)) {
      insertStyle = {
        marginRight: -1 * (styles.trackView.width),
        zIndex: 2
      }
    }

    return (
      <Animated.View {...this.panResponder.panHandlers} style={[panStyle,styles.trackView, insertStyle]}>
        <ImageBackground source={{uri: this.props.track.image_url}} style={{width: '100%', height: '100%'}}>
          <LinearGradient colors={['#0000', '#000B']} style={{width: '100%', height: '100%', flexDirection: "column-reverse", padding: 10}}>
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
      dragging: false,
      totalDragDistance: (styles.trackView.height + styles.stack.marginTop),
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
    // if (!this.state.dragging) {
    //   this.setState({ dragging: true })
    // }
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
      let tempA = isBottom ? this.state.listB : this.state.listA;
      let tempB = isBottom ? this.state.listA : this.state.listB;
      let tempAOffset = isBottom ? this.state.offsets.listB : this.state.offsets.listA;
      let tempBOffset = isBottom ? this.state.offsets.listA : this.state.offsets.listB;
      let offset = index - tempAOffset + tempBOffset;
      tempA.splice(index, 1);
      tempB.splice(offset, 0, item);
      this.setState({
        insertTransitioning: true,
        listA: isBottom ? tempB : tempA,
        listB: isBottom ? tempA : tempB,
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


  render() {
    return (
      <View>
        <ScrollView snapToAlignment='right' snapToInterval={styles.trackView.width + styles.trackView.marginRight} horizontal={true} style={styles.stack} scrollEnabled={!this.state.dragging} onScroll={this.handleScrollTop} scrollEventThrottle={64}>
          {this.state.listA.map((item, index) => (
            <TrackView transitioning={this.state.insertTransitioning} track={item} offsets={this.state.offsets} isBottom={false} dragFrom={this.state.dragFromTop} key={item.spotify_id} i={index} dragData={this.state.dragData} onDrag={this.onDrag} onStopDrag={(item, index, distance) => {this.onStopDrag(item, index, false, distance)}} />
          ))}
        </ScrollView>
        <ScrollView snapToAlignment='right' snapToInterval={styles.trackView.width + styles.trackView.marginRight} horizontal={true} style={styles.stack} scrollEnabled={!this.state.dragging} onScroll={this.handleScrollBottom} scrollEventThrottle={64}>
          {this.state.listB.map((item, index) => (
            <TrackView transitioning={this.state.insertTransitioning} track={item} offsets={this.state.offsets} isBottom={true} dragFrom={!this.state.dragFromTop} key={item.spotify_id} i={index} dragData={this.state.dragData} onDrag={this.onDrag} onStopDrag={(item, index, distance) => {this.onStopDrag(item,index, true, distance)}} />
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
    height: 150
  },
  stack: {
    overflow: "visible",
    marginTop: 10
  },
  title: {
    fontFamily: "Avenir",
    color: "#FFF",
    fontWeight: "700",
    fontSize: 16
  },
  artist: {
    fontFamily: "Avenir",
    color: "#FFF",
    fontWeight: "400",
    fontSize: 14
  }
});

export { TrackStack };