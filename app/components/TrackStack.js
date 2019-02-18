import React, { Component } from 'react';
import {
  View, StyleSheet, Text, ScrollView, PanResponder,
  Animated
} from "react-native";
import { Colors } from "../styles/Colors";

var fakeData = {
  trackListA: [
    {
      title: "track 1",
      artists: [
        "artist 1"
      ],
      album: "album 1",
      id:"dhkfla"
    },
    {
      title: "track 2",
      artists: [
        "artist 2"
      ],
      album: "album 2",
      id:"uhfadshl"
    },
    {
      title: "track 3",
      artists: [
        "artist 3"
      ],
      album: "album 3",
      id:"alskjhfd"
    },
    {
      title: "track 7",
      artists: [
        "artist 7"
      ],
      album: "album 7",
      id:"uhfadasdshl"
    },
    {
      title: "track 8",
      artists: [
        "artist 8"
      ],
      album: "album 8",
      id:"pagkdf"
    },
    {
      title: "track 10",
      artists: [
        "artist 10"
      ],
      album: "album 10",
      id:"fdsfdsaf"
    },
    {
      title: "track 9",
      artists: [
        "artist 9"
      ],
      album: "album 9",
      id:"pagfdsakdf"
    },
  ],
  trackListB: [
    {
      title: "track 4",
      artists: [
        "artist 4"
      ],
      album: "album 4",
      id:"fdajh;fd"
    },
    {
      title: "track 5",
      artists: [
        "artist 5"
      ],
      album: "album 5",
      id:"aghldksaf"
    },
    {
      title: "track 6",
      artists: [
        "artist 6"
      ],
      album: "album 6",
      id:"fdhlsakfd"
    },
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
    if (!this.props.dragFrom && (this.props.dragData.index == this.props.i ) && (this.props.transitioning)) {
      let multiplier = (this.props.isBottom) ? 1 : -1;
      let distance =( multiplier ) * this.props.dragData.dragDistance - (multiplier * (styles.trackView.height + styles.stack.marginTop));
      console.log(distance);
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
        zIndex: 0,
        backgroundColor: '#FAA'
      }
    } if (this.props.dragFrom && (this.props.dragData.index == this.props.i - 1)) {
      insertStyle = {
        marginLeft: this.props.dragData.marginAdjacent,
        zIndex: 0
      }
    } if (!this.props.dragFrom && (this.props.dragData.index == this.props.i ) && (this.props.transitioning)) {
      insertStyle = {
        marginRight: -1 * (styles.trackView.width),
        backgroundColor: '#F55'
      }
    }

    return (
      <Animated.View {...this.panResponder.panHandlers} style={[panStyle,styles.trackView, insertStyle]}>
        <Text>{this.props.track.title}</Text>
        <Text>{this.props.track.artists[0]}</Text>
        <Text>{this.props.track.album}</Text>
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
      Animated.spring(this.state.dragData.marginAdjacent, {
        toValue: -(styles.trackView.width + styles.trackView.marginRight),
        friction: 12
      }).start();
      Animated.spring(this.state.dragData.marginLeft, {
        toValue: (styles.trackView.width + styles.trackView.marginRight),
        friction: 12
      }).start(() => {
        this.state.dragData.marginAdjacent.setValue(0);
        this.state.dragData.marginLeft.setValue(0);
        this.setState({insertTransitioning: false});
      })
      let tempA = isBottom ? this.state.listB : this.state.listA;
      let tempB = isBottom ? this.state.listA : this.state.listB;
      // let tempAOffset = isBottom ? this.state.offsets.listB : this.state.offsets.listA;
      // let tempBOffset = isBottom ? this.state.offsets.listA : this.state.offsets.listB;
      // let offset = index + tempAOffset - tempBOffset;
      // console.log(index + tempAOffset - tempBOffset);
      tempA.splice(index, 1);
      tempB.splice(index, 0, item);
      this.setState({
        insertTransitioning: true,
        listA: isBottom ? tempB : tempA,
        listB: isBottom ? tempA : tempB,
        dragging: false
      })
      // this.setState({ dragging: false })
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
            <TrackView transitioning={this.state.insertTransitioning} track={item} offsets={this.state.offsets} isBottom={false} dragFrom={this.state.dragFromTop} key={item.id} i={index} dragData={this.state.dragData} onDrag={this.onDrag} onStopDrag={(item, index, distance) => {this.onStopDrag(item, index, false, distance)}} />
          ))}
        </ScrollView>
        <ScrollView snapToAlignment='right' snapToInterval={styles.trackView.width + styles.trackView.marginRight} horizontal={true} style={styles.stack} scrollEnabled={!this.state.dragging} onScroll={this.handleScrollBottom} scrollEventThrottle={64}>
          {this.state.listB.map((item, index) => (
            <TrackView transitioning={this.state.insertTransitioning} track={item} offsets={this.state.offsets} isBottom={true} dragFrom={!this.state.dragFromTop} key={item.id} i={index} dragData={this.state.dragData} onDrag={this.onDrag} onStopDrag={(item, index, distance) => {this.onStopDrag(item,index, true, distance)}} />
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
    width: 100,
    height: 100
  },
  stack: {
    overflow: "visible",
    marginTop: 10
  }
});

export { TrackStack };