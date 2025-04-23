import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types/navigation';
import { SvgXml } from 'react-native-svg';

// SVG icons
const pauseIcon = `
<svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M4.5 2.25H3V9.75H4.5V2.25Z" fill="#071E22"/>
  <path d="M9 2.25H7.5V9.75H9V2.25Z" fill="#071E22"/>
</svg>
`;

const closeIcon = `
<svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M9.75 2.25L2.25 9.75" stroke="#071E22" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M2.25 2.25L9.75 9.75" stroke="#071E22" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`;

const checkIcon = `
<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M13.3334 4L6.00008 11.3333L2.66675 8" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`;

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export const Documents_Uploading = () => {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute();
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const documentName = (route.params as { documentName?: string })?.documentName || 'Document.pdf';

  useEffect(() => {
    const interval = setInterval(() => {
      setUploadProgress((oldProgress) => {
        if (oldProgress >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsComplete(true);
            setTimeout(() => {
              navigation.navigate('Documents_ListWithFiles');
            }, 1000);
          }, 500);
          return 100;
        }
        return oldProgress + 5;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [navigation]);

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

      {/* Modal de Upload */}
      <View style={styles.modalContainer}>
        <View style={styles.modal}>
          <Text style={styles.modalTitle}>Uploading File</Text>
          
          <View style={styles.fileItemContainer}>
            <Text style={styles.fileName}>{documentName}</Text>
            <Text style={styles.fileSize}>455 KB PDF</Text>
            
            {!isComplete ? (
              <>
                <View style={styles.progressBarContainer}>
                  <View style={[styles.progressBar, { width: `${uploadProgress}%` }]} />
                </View>
                
                <View style={styles.actionButtons}>
                  <TouchableOpacity style={styles.iconButton}>
                    <SvgXml xml={pauseIcon} width={12} height={12} />
                  </TouchableOpacity>
                  
                  <TouchableOpacity 
                    style={styles.iconButton}
                    onPress={() => navigation.goBack()}
                  >
                    <SvgXml xml={closeIcon} width={12} height={12} />
                  </TouchableOpacity>
                </View>
              </>
            ) : (
              <View style={styles.checkContainer}>
                <View style={styles.checkCircle}>
                  <SvgXml xml={checkIcon} width={16} height={16} />
                </View>
                <Text style={styles.uploadedText}>Uploaded</Text>
              </View>
            )}
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A1D23',
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
    marginLeft: -48,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  modal: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 16,
  },
  modalTitle: {
    fontSize: 16,
    color: '#071E22',
    fontWeight: '500',
    marginBottom: 16,
  },
  fileItemContainer: {
    backgroundColor: '#F5F5F5',
    borderRadius: 4,
    padding: 12,
  },
  fileName: {
    fontSize: 14,
    color: '#071E22',
    marginBottom: 4,
  },
  fileSize: {
    fontSize: 12,
    color: '#6C7072',
    marginBottom: 12,
  },
  progressBarContainer: {
    height: 4,
    backgroundColor: '#E5E5E5',
    borderRadius: 2,
    marginBottom: 12,
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#B4E48E',
    borderRadius: 2,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  iconButton: {
    width: 24,
    height: 24,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  checkContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#B4E48E',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  uploadedText: {
    fontSize: 14,
    color: '#071E22',
  },
});
