import React, { useEffect } from 'react';
import { View, Text, Image, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types/navigation';

const { width, height } = Dimensions.get('window');

export const Welcome = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('AbreAmaninese');
    }, 2000);
    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.mainContainer}>
        <Image
          source={require('../../../assets/welcome/main-image.png')}
          style={styles.mainImage}
          resizeMode="cover"
        />
        <View style={styles.overlayContainer}>
          <Image
            source={require('../../../assets/welcome/overlay-image.png')}
            style={styles.overlayImage}
            resizeMode="cover"
          />
          <Image
            source={require('../../../assets/welcome/swipe.svg')}
            style={styles.swipeIcon}
          />
        </View>
        <View style={styles.textContainer}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>
              <Text style={styles.blueText}>Health</Text>
              <Text style={styles.blackText}> </Text>
              <Text style={styles.greenText}>&</Text>
              {'\n'}
              <Text style={styles.blueItalicText}>WELLBEING</Text>
              <Text style={styles.blueText}> </Text>
              <Text style={styles.blueText}>DIFFERENTLY</Text>
              {'\n'}
              <Text style={styles.blackText}> </Text>
              <Text style={styles.darkText}>and turn it into a Habit</Text>
            </Text>
          </View>
          <Image
            source={require('../../../assets/welcome/background-image.png')}
            style={styles.backgroundImage}
            resizeMode="cover"
          />
          <Text style={styles.logoText}>
            <Text style={styles.darkText}>like</Text>
            <Text style={styles.boldBlueText}>me</Text>
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A1D23',
  },
  mainContainer: {
    width: width,
    height: height,
    backgroundColor: '#0A1D23',
  },
  mainImage: {
    width: width,
    height: height,
    position: 'absolute',
  },
  overlayContainer: {
    position: 'absolute',
    width: width,
    height: height * 0.6,
    top: height * 0.4,
  },
  overlayImage: {
    width: '100%',
    height: '100%',
  },
  swipeIcon: {
    position: 'absolute',
    width: 123,
    height: 3,
    top: '90%',
    left: width * 0.35,
  },
  textContainer: {
    position: 'absolute',
    width: width - 20,
    height: height * 0.35,
    top: 0,
    left: 10,
  },
  titleContainer: {
    position: 'absolute',
    width: width - 20,
    top: height * 0.17,
  },
  title: {
    fontSize: 35,
    lineHeight: 40,
    letterSpacing: 0,
  },
  blueText: {
    color: '#128AAC',
    fontWeight: 'bold',
  },
  blackText: {
    color: '#000000',
    fontWeight: 'bold',
  },
  greenText: {
    color: '#74C894',
    fontWeight: 'bold',
  },
  blueItalicText: {
    color: '#128AAC',
    fontWeight: 'bold',
    fontStyle: 'italic',
  },
  darkText: {
    color: '#0A1D23',
  },
  backgroundImage: {
    position: 'absolute',
    width: 184,
    height: 191,
    top: 0,
    right: 0,
  },
  logoText: {
    position: 'absolute',
    top: 24,
    left: 8,
    fontSize: 20,
    letterSpacing: 0,
  },
  boldBlueText: {
    color: '#174E77',
    fontWeight: 'bold',
  },
}); 