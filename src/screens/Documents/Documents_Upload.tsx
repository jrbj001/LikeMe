import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types/navigation';
import { SvgXml } from 'react-native-svg';

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

const pencilIcon = `
<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M10.6667 2L14 5.33333L5.33333 14H2V10.6667L10.6667 2Z" stroke="#071E22" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`;

const folderIcon = `
<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M14.6667 13.3333C14.6667 13.687 14.5262 14.0261 14.2762 14.2761C14.0261 14.5262 13.687 14.6667 13.3333 14.6667H2.66667C2.31304 14.6667 1.97391 14.5262 1.72386 14.2761C1.47381 14.0261 1.33333 13.687 1.33333 13.3333V2.66667C1.33333 2.31304 1.47381 1.97391 1.72386 1.72386C1.97391 1.47381 2.31304 1.33333 2.66667 1.33333H6L7.33333 3.33333H13.3333C13.687 3.33333 14.0261 3.47381 14.2762 3.72386C14.5262 3.97391 14.6667 4.31304 14.6667 4.66667V13.3333Z" stroke="#071E22" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`;

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export const Documents_Upload = () => {
  const navigation = useNavigation<NavigationProp>();

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
      
      {/* Modal de Seleção de Arquivos */}
      <View style={styles.modalContainer}>
        <View style={styles.modal}>
          <Text style={styles.modalTitle}>Add New File</Text>
          
          <TouchableOpacity 
            style={styles.optionButton}
            onPress={() => navigation.navigate('Documents_Uploading')}
          >
            <SvgXml xml={pencilIcon} width={16} height={16} />
            <Text style={styles.optionText}>Upload New File</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.optionButton}>
            <SvgXml xml={folderIcon} width={16} height={16} />
            <Text style={styles.optionText}>Create New Folder</Text>
          </TouchableOpacity>
        </View>
      </View>
      
      {/* Botão circular com + */}
      <TouchableOpacity style={styles.floatingButton}>
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
  modalContainer: {
    position: 'absolute',
    bottom: 140,
    right: 24,
    alignItems: 'flex-end',
  },
  modal: {
    width: 330,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 16,
  },
  modalTitle: {
    fontSize: 16,
    color: '#071E22',
    fontWeight: '500',
    marginBottom: 12,
  },
  optionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#F5F5F5',
    borderRadius: 4,
    marginBottom: 8,
  },
  optionText: {
    fontSize: 14,
    color: '#071E22',
    marginLeft: 12,
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
}); 