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
        this.setState({ dragging: true });
      },
      onPanResponderMove: (e, gesture) => {
        if (!this.props.isBottom && gesture.dy > 5)
          this.props.onDrag(this.props.i, gesture.dy, this.props.isBottom);
        else if (this.props.isBottom && gesture.dy < 5)
          this.props.onDrag(this.props.i, gesture.dy, this.props.isBottom);
        Animated.event([null, { dy: this.state.pan.y }])(e, gesture)
      },
      onPanResponderRelease: (e, gesture) => {
        this.setState({ dragging: false });
        if (!this.props.isBottom && gesture.dy < 20) {
          Animated.spring(this.state.pan, {
            toValue: { x: 0, y: 0 },
            friction: 5
          }).start();
          
          this.props.onStopDrag(null);
        } else if (this.props.isBottom && gesture.dy > 20) {
          Animated.spring(this.state.pan, {
            toValue: { x: 0, y: 0 },
            friction: 5
          }).start();
          
          this.props.onStopDrag(null);
        } else {
          Animated.spring(this.state.pan, {
            toValue: { x: 0, y: this.props.isBottom ? -110 : 110 },
            friction: 5
          }).start();
          this.props.onStopDrag(this.props.track,this.props.i, this.props.isBottom);
        }
      }
      // adjusting delta value
    });

    this.state.pan.setValue({ x: 0, y: 0 })
  }

  render() {
    const panStyle = {
      transform: this.state.pan.getTranslateTransform(),
      zIndex: 2
    }
    var insertStyle = {}
    if (!this.props.dragFrom && (this.props.dragData.index == this.props.i)) {
      insertStyle = {
        marginLeft: this.props.dragData.marginLeft,
        zIndex: 0
      }
    } if (this.props.dragFrom && (this.props.dragData.index == this.props.i - 1)) {
      insertStyle = {
        marginLeft: this.props.dragData.marginAdjacent,
        zIndex: 0
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
      },
      dragFromTop: true
    };
  }

  onDrag = (index, dy, isBottom) => {
    this.setState({dragFromTop: !isBottom})
    if (!this.state.dragging) {
      this.setState({ dragging: true })
    }
    var dragData = {...this.state.dragData}
    dragData.index = index;
    dragDistance = isBottom ? -dy : dy;
    dragData.marginLeft.setValue(dragDistance / this.state.totalDragDistance * (styles.trackView.width + styles.trackView.marginRight))
    this.setState({dragData})
  }

  onStopDrag = (item,index, isBottom) => {
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
        let tempA = isBottom ? this.state.listB : this.state.listA;
        let tempB = isBottom ? this.state.listA : this.state.listB;
        tempA.splice(index, 1);
        tempB.splice(index, 0, item);
        this.setState({
          dragData: {
            index: 0,
            marginLeft: new Animated.Value(0),
            marginAdjacent: new Animated.Value(0)
          },
          dragging: false,
          listA: tempA,
          listB: tempB
        })
        this.state.dragData.marginAdjacent.setValue(0)
      });
      this.setState({ dragging: false })
    }
    

  }

  handleScroll = (event) => {
    console.log(event.nativeEvent.contentOffset.y);
  }


  render() {
    return (
      <View>
        <ScrollView snapToInterval={styles.trackView.width + styles.trackView.marginRight} horizontal={true} style={styles.stack} scrollEnabled={!this.state.dragging} onScroll={this.handleScroll}>
          {this.state.listA.map((item, index) => (
            <TrackView track={item} isBottom={false} dragFrom={this.state.dragFromTop}key={item.id} i={index} dragData={this.state.dragData} onDrag={this.onDrag} onStopDrag={(item, index) => {this.onStopDrag(item, index)}} />
          ))}
        </ScrollView>
        <ScrollView snapToInterval={styles.trackView.width + styles.trackView.marginRight} horizontal={true} style={styles.stack} scrollEnabled={!this.state.dragging} onScroll={this.handleScroll}>
          {this.state.listB.map((item, index) => (
            <TrackView track={item} isBottom={true} dragFrom={!this.state.dragFromTop} key={item.id} i={index} dragData={this.state.dragData} onDrag={this.onDrag} onStopDrag={(item) => {this.onStopDrag(item)}} />
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