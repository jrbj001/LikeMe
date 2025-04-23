import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types/navigation';
import { SvgXml } from 'react-native-svg';
import AsyncStorage from '@react-native-async-storage/async-storage';

// SVG icons
const plusCircleIcon = `
<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M12 22C14.6522 22 17.1957 20.9464 19.0711 19.0711C20.9464 17.1957 22 14.6522 22 12C22 9.34784 20.9464 6.8043 19.0711 4.92893C17.1957 3.05357 14.6522 2 12 2C9.34784 2 6.8043 3.05357 4.92893 4.92893C3.05357 6.8043 2 9.34784 2 12C2 14.6522 3.05357 17.1957 4.92893 19.0711C6.8043 20.9464 9.34784 22 12 22ZM11.0625 15.4375V12.9375H8.5625C8.04297 12.9375 7.625 12.5195 7.625 12C7.625 11.4805 8.04297 11.0625 8.5625 11.0625H11.0625V8.5625C11.0625 8.04297 11.4805 7.625 12 7.625C12.5195 7.625 12.9375 8.04297 12.9375 8.5625V11.0625H15.4375C15.957 11.0625 16.375 11.4805 16.375 12C16.375 12.5195 15.957 12.9375 15.4375 12.9375H12.9375V15.4375C12.9375 15.957 12.5195 16.375 12 16.375C11.4805 16.375 11.0625 15.957 11.0625 15.4375Z" fill="#071E22"/>
</svg>
`;

const chevronDownIcon = `
<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M9.05624 13.8633C9.463 14.2702 10.1236 14.2702 10.5304 13.8633L16.7783 7.61328C17.185 7.20638 17.185 6.54557 16.7783 6.13867C16.3715 5.73177 15.7109 5.73177 15.3041 6.13867L9.79167 11.653L4.27919 6.14193C3.87242 5.73503 3.21184 5.73503 2.80507 6.14193C2.39831 6.54883 2.39831 7.20964 2.80507 7.61654L9.05298 13.8665L9.05624 13.8633Z" fill="white"/>
</svg>
`;

const swipeIcon = `
<svg width="123" height="3" viewBox="0 0 123 3" fill="none" xmlns="http://www.w3.org/2000/svg">
  <line x1="0" y1="1.5" x2="123" y2="1.5" stroke="white" stroke-width="3"/>
</svg>
`;

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

// Chave para armazenamento de documentos
const DOCUMENTS_STORAGE_KEY = '@likeme_documents';

export const Documents_Home = () => {
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

  return (
    <View style={styles.container}>
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
      
      {/* Cabeçalho com Título e Seta para Voltar */}
      <View style={styles.headerContainer}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Image 
            source={require('../../../assets/img/arrow-left.png')} 
            style={styles.backIcon}
          />
        </TouchableOpacity>
        
        <Text style={styles.headerTitle}>My Documents</Text>
      </View>
      
      {/* Dropdown "for data" */}
      <View style={styles.dropdownContainer}>
        <Text style={styles.dropdownText}>for data</Text>
        <SvgXml xml={chevronDownIcon} width={20} height={20} />
      </View>
      
      {/* Conteúdo "Upload" */}
      <View style={styles.uploadContainer}>
        <Text style={styles.uploadTitle}>Upload</Text>
        <Text style={styles.uploadDescription}>Upload your medical documents</Text>
        
        {hasDocuments && (
          <TouchableOpacity 
            style={styles.viewFilesButton}
            onPress={() => navigation.navigate('Documents_ListWithFiles')}
          >
            <Text style={styles.viewFilesText}>View existing files</Text>
          </TouchableOpacity>
        )}
      </View>
      
      {/* Botão circular com + */}
      <TouchableOpacity 
        style={styles.floatingButton}
        onPress={() => navigation.navigate('Documents_Upload')}
      >
        <SvgXml xml={plusCircleIcon} width={24} height={24} />
      </TouchableOpacity>
      
      {/* Linha de swipe na parte inferior */}
      <View style={styles.swipeContainer}>
        <SvgXml xml={swipeIcon} width={123} height={3} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A1D23',
    position: 'relative',
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 24,
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
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    paddingHorizontal: 24,
  },
  backButton: {
    width: 48,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backIcon: {
    width: 16,
    height: 14,
  },
  headerTitle: {
    color: '#B4E48E',
    fontSize: 18,
    fontFamily: 'Replica-Bold',
    fontWeight: 'bold',
    textAlign: 'center',
    flex: 1,
    marginLeft: -48, // Para centralizar o título compensando o botão de voltar
  },
  dropdownContainer: {
    position: 'absolute',
    top: 149,
    right: 24,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'transparent',
    borderRadius: 50,
  },
  dropdownText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontFamily: 'Inter',
    fontWeight: '300',
    marginRight: 4,
  },
  uploadContainer: {
    position: 'absolute',
    top: 386,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  uploadTitle: {
    color: '#FFFFFF',
    fontSize: 20,
    fontFamily: 'Inter',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
  },
  uploadDescription: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'Inter',
    textAlign: 'center',
  },
  floatingButton: {
    position: 'absolute',
    bottom: 83,
    right: 24,
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#D9ED93',
    justifyContent: 'center',
    alignItems: 'center',
  },
  swipeContainer: {
    position: 'absolute',
    bottom: 9,
    left: 126,
    height: 3,
  },
  viewFilesButton: {
    backgroundColor: '#128AAC',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 24,
    marginTop: 32,
  },
  viewFilesText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'Replica-Regular',
    textAlign: 'center',
  },
}); 