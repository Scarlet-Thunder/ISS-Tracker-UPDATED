import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  SafeAreaView,
  Platform,
  StatusBar,
  ImageBackground,
  Dimensions,
  Image,
} from 'react-native';
import axios from 'axios';

export default class MeteorScreen extends Component {
  constructor(props) {
    super(props);
    this.state = { meteors: {} };
  }

  componentDidMount() {
    this.getMeteors();
  }

  getMeteors = () => {
    axios
      .get(
        'https://api.nasa.gov/neo/rest/v1/feed?api_key=mhLOFCfW7lsJhlQkCWO1IexfkAThnL4qHnsNjCML'
      )
      .then((response) => {
        this.setState({
          meteors: response.data.near_earth_objects,
        });
      })
      .catch((error) => {
        alert(error.message);
      });
  };
  renderItem = ({ item }) => {
    let meteor = item;
    let bg_image, speed, size;
    if (meteor.threat_score <= 30) {
      bg_image = require('../assets/meteorbg1.png');
      speed = require('../assets/meteor_speed1.gif');
      size = 100;
    } else if (meteor.threat_score <= 75) {
      bg_image = require('../assets/meteorbg2.png');
      speed = require('../assets/meteor_speed2.gif');
      size = 150;
    } else {
      bg_image = require('../assets/meteorbg3.png');
      speed = require('../assets/meteor_speedTooMuch.gif');
      size = 200;
    }
    return (
      <View>
        <ImageBackground source={bg_image} style={styles.backgroundImage}>
          <View style={styles.gifContainer}>
            <Image
              source={speed}
              style={{
                width: size,
                height: size,
                alignSelf: 'center',
              }}></Image>
            <View>
              <Text
                style={[styles.cardTitle, { marginTop: 400, marginLeft: 50 }]}>
                {item.name}
              </Text>
              <Text
                style={[styles.cardText, { marginTop: 20, marginLeft: 50 }]}>
                {item.close_approach_data[0].close_approach_data_full}
              </Text>
            </View>
          </View>
        </ImageBackground>
      </View>
    );
  };
  keyExtractor = (item, index) => index.toString();
  render() {
    if (Object.keys(this.state.meteors).lenght === 0) {
      return (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text>Loading</Text>
        </View>
      );
    } else {
      let meteors_array = Object.keys(this.state.meteors).map((meteor_date) => {
        return this.state.meteors[meteor_date];
      });
      let meteors = [].concat.apply([], meteors_array);
      meteors.forEach(function (element) {
        let diameter =
          (element.estimated_diameter.kilometers.estimated_diameter_min +
            element.estimated_diameter.kilometers.estimated_diameter_max) /
          2;
        let threatScore =
          (diameter / element.close_approach_data[0].miss_distance.kilometers) *
          1000000000;
        element.threat_score = threatScore;
        meteors.sort(function (a, b) {
          return b.threat_score - a.threat_score;
        });
        meteors = meteors.slice(0, 5);
        return (
          <View style={styles.container}>
            <SafeAreaView style={styles.droidSafeArea} />
            <FlatList
              keyExtractor={this.keyExtractor}
              data={meteors}
              renderItem={this.renderItem}
              horizontal={true}
            />
          </View>
        );
      });
      return (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text>MeteorScreen</Text>
        </View>
      );
    }
  }
}
const styles = StyleSheet.create({
  droidSafeArea: {
    marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  gifContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
});
