import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Image,
} from 'react-native';

export default class HomeScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <ImageBackground
          source={require('../assets/bg_image.png')}
          style={styles.backgroundImage}>
          <Text style={styles.titleText}>ISS-Tracker App</Text>
          <View>
            <TouchableOpacity
              style={styles.routeCard}
              onPress={() => {
                this.props.navigation.navigate('ISSLocation');
              }}>
              <Image
                source={require('../assets/iss_icon.png')}
                style={styles.buttonImg}></Image>
              <Text style={styles.textStyle}>ISS Location</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.routeCard}
              onPress={() => {
                this.props.navigation.navigate('Meteors');
              }}>
              <Image
                source={require('../assets/meteor_icon.png')}
                style={styles.buttonImg}></Image>
              <Text style={styles.textStyle}>Meteors</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.routeCard}
              onPress={() => {
                this.props.navigation.navigate('Updates');
              }}>
              <Image
                source={require('../assets/rocket_icon.png')}
                style={styles.buttonImg}></Image>
              <Text style={styles.textStyle}>Updates</Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  titleText: {
    fontSize: 27,
    fontWeight: 'bold',
    alignSelf: 'center',
    color: 'white',
  },

  routeCard: {
    flex: 0.25,
    marginLeft: 50,
    marginRight: 50,
    marginTop: 50,
    backgroundColor: '#0c164f',
    width: 250,
    height: 300,
    borderRadius: 90,
    alignItems: 'center',
  },

  textStyle: {
    flex: 0.25,
    fontSize: 19,
    fontWeight: 'bold',
    color: 'white',
  },

  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },

  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },

  buttonImg: {
    width: 100,
    height: 100,
  },
});
