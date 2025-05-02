import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types/navigation';

const { width, height } = Dimensions.get('window');

export const AbreAmaninese = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  return (
    <View style={styles.container}>
      {/* Imagem de fundo */}
      <Image source={require('../../assets/images/foreground-image.png')} style={styles.foregroundImage} resizeMode="cover" />

      {/* Logo e Skip step */}
      <View style={styles.topBar}>
        <Text style={styles.logoText}>
          <Text style={styles.whiteText}>like</Text>
          <Text style={styles.greenText}>me</Text>
        </Text>
        <TouchableOpacity>
          <Text style={styles.skipText}>Skip step</Text>
        </TouchableOpacity>
      </View>

      {/* Texto principal */}
      <View style={styles.textContainer}>
        <Text style={styles.mainText}>
          <Text style={styles.greenText}>Everything </Text>
          <Text style={styles.whiteText}>about </Text>
          <Text style={styles.italicWhite}>your health </Text>
          <Text style={styles.whiteText}>and GOALS </Text>
          <Text style={styles.italicGreen}>in one place</Text>
        </Text>
      </View>

      {/* Imagem de background (DNA) */}
      <Image source={require('../../assets/images/amaninese_background-image.png')} style={styles.backgroundImage} resizeMode="cover" />

      {/* Botão */}
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Abre_documents')}>
        <Text style={styles.buttonText}>Connect gadget</Text>
      </TouchableOpacity>

      {/* Linha de swipe */}
      <Image source={require('../../assets/images/swipe.svg')} style={styles.swipe} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a1d23',
    alignItems: 'center',
    justifyContent: 'flex-start',
    position: 'relative',
  },
  foregroundImage: {
    position: 'absolute',
    width: width,
    height: height,
    top: 0,
    left: 0,
    zIndex: 0,
  },
  topBar: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 48,
    marginTop: 16,
    zIndex: 2,
  },
  logoText: {
    fontSize: 20,
    letterSpacing: 0,
  },
  whiteText: {
    color: '#FFFFFF',
    fontFamily: 'Replica-Regular',
  },
  greenText: {
    color: '#B4E48E',
    fontFamily: 'Replica-Bold',
    fontWeight: 'bold',
  },
  skipText: {
    fontFamily: 'Roboto',
    fontSize: 13,
    color: '#FFFFFF',
    textDecorationLine: 'underline',
    letterSpacing: 0.1,
  },
  textContainer: {
    position: 'absolute',
    top: 120,
    left: 32,
    width: 238,
    zIndex: 2,
  },
  mainText: {
    fontSize: 25,
    fontFamily: 'Replica-Regular',
    color: '#FFFFFF',
    lineHeight: 32,
  },
  italicWhite: {
    fontFamily: 'Replica-LightItalic',
    fontStyle: 'italic',
    color: '#FFFFFF',
  },
  italicGreen: {
    fontFamily: 'Replica-BoldItalic',
    fontStyle: 'italic',
    color: '#B4E48E',
    fontWeight: 'bold',
  },
  backgroundImage: {
    position: 'absolute',
    width: width,
    aspectRatio: 375/560,
    bottom: 0,
    left: 0,
    zIndex: 1,
  },
  button: {
    position: 'absolute',
    bottom: 60,
    left: 48,
    width: width - 96,
    height: 56,
    backgroundColor: '#232323',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
  },
  buttonText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: 'normal',
  },
  swipe: {
    position: 'absolute',
    bottom: 60,
    left: width / 2 - 61.5,
    width: 123,
    height: 3,
    zIndex: 2,
  },
}); 