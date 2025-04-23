import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types/navigation';
import { SvgXml } from 'react-native-svg';
import AsyncStorage from '@react-native-async-storage/async-storage';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const { width, height } = Dimensions.get('window');

// Chave para armazenamento de documentos
const DOCUMENTS_STORAGE_KEY = '@likeme_documents';

export const Abre_documents = () => {
  const navigation = useNavigation<NavigationProp>();
  const [hasDocuments, setHasDocuments] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Verificar se já existem documentos armazenados
  useEffect(() => {
    checkExistingDocuments();
  }, []);

  const checkExistingDocuments = async () => {
    try {
      setIsLoading(true);
      const savedDocumentsJson = await AsyncStorage.getItem(DOCUMENTS_STORAGE_KEY);
      if (savedDocumentsJson) {
        const savedDocuments = JSON.parse(savedDocumentsJson);
        setHasDocuments(savedDocuments.length > 0);
      } else {
        setHasDocuments(false);
      }
    } catch (error) {
      console.error('Erro ao verificar documentos existentes:', error);
      setHasDocuments(false);
    } finally {
      setIsLoading(false);
    }
  };

  // Função para navegar para a tela apropriada
  const navigateToDocuments = () => {
    navigation.navigate('Documents_Unified');
  };

  return (
    <View style={styles.container}>
      <View style={styles.mainContainer}>
        <Image
          source={require('../../../assets/abre_documents/foreground-image.png')}
          style={styles.backgroundImage}
          resizeMode="cover"
        />
        
        <View style={styles.contentContainer}>
          <Image
            source={require('../../../assets/abre_documents/image.png')}
            style={styles.overlayImage}
            resizeMode="cover"
          />

          <View style={styles.headerContainer}>
            <View style={styles.logoContainer}>
              <Text style={styles.logoText}>
                <Text style={styles.whiteText}>like</Text>
                <Text style={styles.greenText}>me</Text>
              </Text>
            </View>

            <TouchableOpacity>
              <Text style={styles.skipText}>Skip step</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.mainText}>
            <Text style={styles.greenText}>Everything </Text>
            <Text style={styles.whiteText}>about </Text>
            <Text style={[styles.whiteText, styles.italicText]}>your health </Text>
            <Text style={styles.whiteText}>and GOALS </Text>
            <Text style={[styles.greenText, styles.boldItalicText]}>in one place</Text>
          </Text>

          <TouchableOpacity 
            style={styles.button}
            onPress={navigateToDocuments}
          >
            <Text style={styles.buttonText}>Upload documents</Text>
          </TouchableOpacity>
        </View>

        <Image
          source={require('../../../assets/abre_documents/swipe.svg')}
          style={styles.swipeIcon}
        />
      </View>
    </View>
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
    position: 'relative',
  },
  backgroundImage: {
    width: width,
    height: height,
    position: 'absolute',
  },
  contentContainer: {
    width: width,
    height: height - 24,
    marginTop: 24,
    position: 'relative',
  },
  overlayImage: {
    width: width,
    height: height - 70,
    position: 'absolute',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  logoContainer: {
    marginTop: 0,
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
  mainText: {
    width: 238,
    marginLeft: 48,
    marginTop: 75,
    fontSize: 25,
    letterSpacing: 0,
  },
  italicText: {
    fontFamily: 'Replica-LightItalic',
    fontStyle: 'italic',
    fontWeight: '300',
  },
  boldItalicText: {
    fontFamily: 'Replica-BoldItalic',
    fontStyle: 'italic',
    fontWeight: 'bold',
  },
  button: {
    width: 280,
    height: 48,
    backgroundColor: '#128AAC',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 27,
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: '#128AAC',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'Replica-Regular',
  },
  swipeIcon: {
    width: 123,
    height: 3,
    position: 'absolute',
    bottom: 9,
    left: width * 0.336,
  },
}); 