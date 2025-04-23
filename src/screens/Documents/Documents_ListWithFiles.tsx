import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, FlatList, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types/navigation';
import { SvgXml } from 'react-native-svg';
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';
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

const fileIcon = `
<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M5.55005 20V4C5.55005 2.20508 7.00513 0.75 8.80005 0.75H17.3894L23.25 6.61066V20C23.25 21.7949 21.795 23.25 20.0001 23.25H8.80005C7.00512 23.25 5.55005 21.7949 5.55005 20Z" fill="white" stroke="#D0D5DD" stroke-width="1.5"/>
  <path clip-rule="evenodd" d="M16.8 4.8C16.8 6.12548 17.8746 7.2 19.2 7.2H24V6.3H19.2C18.3716 6.3 17.7 5.62843 17.7 4.8V0H16.8V4.8Z" fill="#D0D5DD" fill-rule="evenodd"/>
  <rect fill="#079455" height="9.6" rx="2" width="19.2" y="9.6001"/>
</svg>
`;

const arrowRightIcon = `
<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M8 0L6.59 1.41L12.17 7H0V9H12.17L6.59 14.59L8 16L16 8L8 0Z" fill="#FFF7E9"/>
</svg>
`;

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

// Interface para os documentos
interface Document {
  id: string;
  name: string;
  size: string;
  createdAt: string;
  uri: string;
  type: string;
}

// Chave para armazenamento de documentos
const DOCUMENTS_STORAGE_KEY = '@likeme_documents';

export const Documents_ListWithFiles = () => {
  const navigation = useNavigation<NavigationProp>();
  const [documents, setDocuments] = useState<Document[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Carregar documentos salvos ao iniciar
  useEffect(() => {
    loadSavedDocuments();
  }, []);

  // Função para carregar documentos salvos
  const loadSavedDocuments = async () => {
    try {
      setIsLoading(true);
      const savedDocumentsJson = await AsyncStorage.getItem(DOCUMENTS_STORAGE_KEY);
      if (savedDocumentsJson) {
        const savedDocuments = JSON.parse(savedDocumentsJson);
        setDocuments(savedDocuments);
      }
    } catch (error) {
      console.error('Erro ao carregar documentos:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Função para salvar documentos
  const saveDocuments = async (docs: Document[]) => {
    try {
      await AsyncStorage.setItem(DOCUMENTS_STORAGE_KEY, JSON.stringify(docs));
    } catch (error) {
      console.error('Erro ao salvar documentos:', error);
    }
  };

  // Função para formatar o tamanho do arquivo
  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + ' B';
    else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
    else return (bytes / 1048576).toFixed(1) + ' MB';
  };

  // Função para formatar a data
  const formatDate = (date: Date): string => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return date.getDate() + ' ' + months[date.getMonth()];
  };

  // Função para fazer upload de documento
  const uploadDocument = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain', 'application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'],
        copyToCacheDirectory: true
      });
      
      if (result.canceled) {
        return;
      }
      
      if (result.assets && result.assets.length > 0) {
        const asset = result.assets[0];
        
        // Obter informações do arquivo
        let fileInfo;
        
        if (Platform.OS === 'web') {
          fileInfo = {
            size: asset.size,
            uri: asset.uri,
            name: asset.name,
            type: asset.mimeType
          };
        } else {
          fileInfo = await FileSystem.getInfoAsync(asset.uri);
        }
        
        // Criar novo documento
        const newDocument: Document = {
          id: Date.now().toString(),
          name: asset.name,
          size: formatFileSize(asset.size || 0),
          createdAt: formatDate(new Date()),
          uri: asset.uri,
          type: asset.mimeType || ''
        };
        
        // Adicionar à lista de documentos
        const updatedDocuments = [...documents, newDocument];
        setDocuments(updatedDocuments);
        
        // Salvar documentos atualizados
        await saveDocuments(updatedDocuments);
        
        // Navegar para tela de carregamento simulado
        navigation.navigate('Documents_Uploading', { documentName: asset.name });
      }
    } catch (error) {
      console.error('Erro ao fazer upload do documento:', error);
    }
  };

  // Função para excluir um documento
  const deleteDocument = async (id: string) => {
    try {
      const updatedDocuments = documents.filter(doc => doc.id !== id);
      setDocuments(updatedDocuments);
      await saveDocuments(updatedDocuments);
    } catch (error) {
      console.error('Erro ao excluir documento:', error);
    }
  };

  // Renderizar um item da lista
  const renderItem = ({ item }: { item: Document }) => (
    <TouchableOpacity 
      style={styles.documentItem}
      onPress={() => console.log('Documento selecionado:', item.name)}
    >
      <SvgXml xml={fileIcon} width={24} height={24} />
      
      <View style={styles.documentInfo}>
        <Text style={styles.documentName}>{item.name}</Text>
        <View style={styles.documentMeta}>
          <Text style={styles.documentDate}>{item.createdAt}</Text>
          <Text style={styles.documentDot}>•</Text>
          <Text style={styles.documentSize}>{item.size}</Text>
        </View>
      </View>
      
      <TouchableOpacity
        onPress={() => deleteDocument(item.id)}
        style={styles.deleteButton}
      >
        <SvgXml xml={arrowRightIcon} width={16} height={16} />
      </TouchableOpacity>
    </TouchableOpacity>
  );

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
      
      {/* Lista de documentos */}
      <View style={styles.documentsContainer}>
        {documents.length > 0 ? (
          <FlatList
            data={documents}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            contentContainerStyle={styles.listContent}
          />
        ) : (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyTitle}>Upload</Text>
            <Text style={styles.emptyDescription}>Upload your medical documents</Text>
          </View>
        )}
      </View>
      
      {/* Botão circular com + */}
      <TouchableOpacity 
        style={styles.floatingButton}
        onPress={uploadDocument}
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
  documentsContainer: {
    flex: 1,
    paddingHorizontal: 24,
    marginTop: 100,
  },
  listContent: {
    paddingBottom: 100,
  },
  documentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.06)',
    borderRadius: 8,
    marginBottom: 10,
  },
  documentInfo: {
    flex: 1,
    marginLeft: 16,
  },
  documentName: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '500',
  },
  documentMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  documentDate: {
    color: '#FFFFFF',
    fontSize: 12,
    opacity: 0.7,
  },
  documentDot: {
    color: '#FFFFFF',
    fontSize: 12,
    opacity: 0.7,
    marginHorizontal: 4,
  },
  documentSize: {
    color: '#FFFFFF',
    fontSize: 12,
    opacity: 0.7,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 80,
  },
  emptyTitle: {
    color: '#FFFFFF',
    fontSize: 20,
    fontFamily: 'Inter',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
  },
  emptyDescription: {
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
  deleteButton: {
    width: 48,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
  },
}); 