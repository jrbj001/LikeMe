import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, FlatList, Dimensions, Animated, Modal, Platform, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../types/navigation';
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

const closeIcon = `
<svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M9 3L3 9M3 3L9 9" stroke="#071E22" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`;

const pauseIcon = `
<svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M4.5 2.25H3C2.58579 2.25 2.25 2.58579 2.25 3V9C2.25 9.41421 2.58579 9.75 3 9.75H4.5C4.91421 9.75 5.25 9.41421 5.25 9V3C5.25 2.58579 4.91421 2.25 4.5 2.25Z" stroke="#071E22" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M9 2.25H7.5C7.08579 2.25 6.75 2.58579 6.75 3V9C6.75 9.41421 7.08579 9.75 7.5 9.75H9C9.41421 9.75 9.75 9.41421 9.75 9V3C9.75 2.58579 9.41421 2.25 9 2.25Z" stroke="#071E22" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`;

const checkIcon = `
<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M13.3337 4L6.00033 11.3333L2.66699 8" stroke="#071E22" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
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

const fileIcon = `
<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M5.55005 20V4C5.55005 2.20508 7.00513 0.75 8.80005 0.75H17.3894L23.25 6.61066V20C23.25 21.7949 21.795 23.25 20.0001 23.25H8.80005C7.00512 23.25 5.55005 21.7949 5.55005 20Z" fill="white" stroke="#D0D5DD" stroke-width="1.5"/>
  <path clip-rule="evenodd" d="M16.8 4.8C16.8 6.12548 17.8746 7.2 19.2 7.2H24V6.3H19.2C18.3716 6.3 17.7 5.62843 17.7 4.8V0H16.8V4.8Z" fill="#D0D5DD" fill-rule="evenodd"/>
  <rect fill="#079455" height="9.6" rx="2" width="19.2" y="9.6001"/>
</svg>
`;

const trashIcon = `
<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M2 4H3.33333H14" stroke="#FFF7E9" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M5.33333 4V2.66667C5.33333 2.31305 5.47381 1.97391 5.72386 1.72386C5.97391 1.47381 6.31305 1.33333 6.66667 1.33333H9.33333C9.68695 1.33333 10.0261 1.47381 10.2761 1.72386C10.5262 1.97391 10.6667 2.31305 10.6667 2.66667V4M12.6667 4V13.3333C12.6667 13.687 12.5262 14.0261 12.2761 14.2761C12.0261 14.5262 11.687 14.6667 11.3333 14.6667H4.66667C4.31305 14.6667 3.97391 14.5262 3.72386 14.2761C3.47381 14.0261 3.33333 13.687 3.33333 13.3333V4H12.6667Z" stroke="#FFF7E9" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`;

const menuDotsIcon = `
<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
  <circle cx="8" cy="3" r="1.5" fill="#FFFFFF"/>
  <circle cx="8" cy="8" r="1.5" fill="#FFFFFF"/>
  <circle cx="8" cy="13" r="1.5" fill="#FFFFFF"/>
</svg>
`;

const shareIcon = `
<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M15 6.66667C16.3807 6.66667 17.5 5.54738 17.5 4.16667C17.5 2.78595 16.3807 1.66667 15 1.66667C13.6193 1.66667 12.5 2.78595 12.5 4.16667C12.5 5.54738 13.6193 6.66667 15 6.66667Z" stroke="#344054" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M5 12.5C6.38071 12.5 7.5 11.3807 7.5 10C7.5 8.61929 6.38071 7.5 5 7.5C3.61929 7.5 2.5 8.61929 2.5 10C2.5 11.3807 3.61929 12.5 5 12.5Z" stroke="#344054" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M15 18.3333C16.3807 18.3333 17.5 17.214 17.5 15.8333C17.5 14.4526 16.3807 13.3333 15 13.3333C13.6193 13.3333 12.5 14.4526 12.5 15.8333C12.5 17.214 13.6193 18.3333 15 18.3333Z" stroke="#344054" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M7.15833 11.2583L12.85 14.575" stroke="#344054" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M12.8417 5.425L7.15833 8.74167" stroke="#344054" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`;

const downloadIcon = `
<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M17.5 12.5V15.8333C17.5 16.2754 17.3244 16.6993 17.0118 17.0118C16.6993 17.3244 16.2754 17.5 15.8333 17.5H4.16667C3.72464 17.5 3.30072 17.3244 2.98816 17.0118C2.67559 16.6993 2.5 16.2754 2.5 15.8333V12.5" stroke="#344054" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M5.83333 8.33333L10 12.5L14.1667 8.33333" stroke="#344054" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M10 12.5V2.5" stroke="#344054" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`;

const editIcon = `
<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M14.1667 2.5C14.3855 2.28113 14.6454 2.10751 14.9313 1.98906C15.2173 1.87061 15.5238 1.80957 15.8333 1.80957C16.1429 1.80957 16.4494 1.87061 16.7353 1.98906C17.0213 2.10751 17.2812 2.28113 17.5 2.5C17.7189 2.71875 17.8925 2.97865 18.0109 3.2646C18.1294 3.55054 18.1904 3.85702 18.1904 4.16667C18.1904 4.47631 18.1294 4.78279 18.0109 5.06874C17.8925 5.35468 17.7189 5.61458 17.5 5.83333L6.25 17.0833L2.5 18.3333L3.75 14.5833L14.1667 2.5Z" stroke="#344054" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`;

const deleteIcon = `
<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M2.5 5H4.16667H17.5" stroke="#344054" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M6.66667 5V3.33333C6.66667 2.89131 6.84226 2.46738 7.15482 2.15482C7.46738 1.84226 7.89131 1.66667 8.33333 1.66667H11.6667C12.1087 1.66667 12.5326 1.84226 12.8452 2.15482C13.1577 2.46738 13.3333 2.89131 13.3333 3.33333V5M15.8333 5V16.6667C15.8333 17.1087 15.6577 17.5326 15.3452 17.8452C15.0326 18.1577 14.6087 18.3333 14.1667 18.3333H5.83333C5.39131 18.3333 4.96738 18.1577 4.65482 17.8452C4.34226 17.5326 4.16667 17.1087 4.16667 16.6667V5H15.8333Z" stroke="#344054" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`;

const infoIcon = `
<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M10 18.3333C14.6024 18.3333 18.3333 14.6024 18.3333 10C18.3333 5.39763 14.6024 1.66667 10 1.66667C5.39763 1.66667 1.66667 5.39763 1.66667 10C1.66667 14.6024 5.39763 18.3333 10 18.3333Z" stroke="#344054" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M10 13.3333V10" stroke="#344054" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M10 6.66667H10.0083" stroke="#344054" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`;

// SVGs personalizados para cada tipo de arquivo
const pdfIcon = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="24" height="24" rx="4" fill="#E74C3C"/><text x="6" y="17" fill="white" font-size="10" font-family="Arial" font-weight="bold">PDF</text></svg>`;
const imageIcon = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="24" height="24" rx="4" fill="#27AE60"/><text x="4" y="17" fill="white" font-size="10" font-family="Arial" font-weight="bold">IMG</text></svg>`;
const wordIcon = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="24" height="24" rx="4" fill="#2980D9"/><text x="4" y="17" fill="white" font-size="10" font-family="Arial" font-weight="bold">DOC</text></svg>`;
const excelIcon = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="24" height="24" rx="4" fill="#229954"/><text x="4" y="17" fill="white" font-size="10" font-family="Arial" font-weight="bold">XLS</text></svg>`;
const textIcon = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="24" height="24" rx="4" fill="#8E44AD"/><text x="4" y="17" fill="white" font-size="10" font-family="Arial" font-weight="bold">TXT</text></svg>`;
const genericIcon = fileIcon;

// Função para retornar o ícone correto conforme a extensão
const getFileIcon = (name?: string) => {
  if (!name) return genericIcon;
  const ext = name.split('.').pop()?.toLowerCase();
  if (!ext) return genericIcon;
  if (ext === 'pdf') return pdfIcon;
  if (["jpg","jpeg","png","gif","bmp","webp"].includes(ext)) return imageIcon;
  if (["doc","docx"].includes(ext)) return wordIcon;
  if (["xls","xlsx"].includes(ext)) return excelIcon;
  if (["txt","rtf","csv"].includes(ext)) return textIcon;
  return genericIcon;
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

// Chave para armazenamento de documentos
const DOCUMENTS_STORAGE_KEY = '@likeme_documents';

// Interface para os documentos
interface Document {
  id: string;
  name: string;
  size: string;
  createdAt: string;
  uri: string;
  type: string;
}

// Dimensões da tela
const { width, height } = Dimensions.get('window');

// Estados para a tela unificada
enum ScreenState {
  LIST = 'list',         // Mostrar lista (vazia ou com arquivos)
  UPLOAD_OPTIONS = 'uploadOptions', // Modal de opções de upload
  UPLOADING = 'uploading',    // Progresso de upload
  UPLOAD_COMPLETE = 'uploadComplete', // Upload concluído
}

// Função utilitária para extrair a extensão do arquivo
const getFileExtension = (name?: string, type?: string) => {
  if (name && name.includes('.')) {
    return name.split('.').pop()?.toUpperCase();
  }
  if (type && type.includes('/')) {
    return type.split('/').pop()?.toUpperCase();
  }
  return '';
};

export const Documents_Unified = () => {
  const navigation = useNavigation<NavigationProp>();
  const [documents, setDocuments] = useState<Document[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [screenState, setScreenState] = useState<ScreenState>(ScreenState.LIST);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [currentDocument, setCurrentDocument] = useState<Document | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  
  // Animações
  const fadeAnim = useState(new Animated.Value(1))[0];
  const modalOpacity = useState(new Animated.Value(0))[0];
  
  // Carregar documentos ao iniciar
  useEffect(() => {
    loadSavedDocuments();
  }, []);
  
  // Efeito para animação de upload
  useEffect(() => {
    if (screenState === ScreenState.UPLOADING) {
      // Simulação de progresso de upload
      const interval = setInterval(() => {
        setUploadProgress((oldProgress) => {
          const newProgress = oldProgress + 5;
          if (newProgress >= 100) {
            clearInterval(interval);
            setTimeout(() => {
              // Adicionar documento à lista quando o upload for concluído
              if (currentDocument) {
                const updatedDocuments = [...documents, currentDocument];
                setDocuments(updatedDocuments);
                saveDocuments(updatedDocuments);
              }
              setScreenState(ScreenState.UPLOAD_COMPLETE);
              setTimeout(() => {
                setScreenState(ScreenState.LIST);
              }, 1000);
            }, 500);
            return 100;
          }
          return newProgress;
        });
      }, 300);
      
      return () => clearInterval(interval);
    } else if (screenState === ScreenState.UPLOAD_COMPLETE) {
      // Reset do progresso para o próximo upload
      setUploadProgress(0);
    }
  }, [screenState, currentDocument, documents]);
  
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
  
  // Funções auxiliares para o componente
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
      console.log(`Documentos salvos: ${docs.length} documentos`);
    } catch (error) {
      console.error('Erro ao salvar documentos:', error);
    }
  };
  
  // Função para fazer upload de documento
  const uploadDocument = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: '*/*',
        copyToCacheDirectory: true
      });
      
      if (result.canceled) {
        setScreenState(ScreenState.LIST);
        return;
      }
      
      if (result.assets && result.assets.length > 0) {
        const asset = result.assets[0];
        console.log('Documento selecionado:', asset);
        
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
        
        console.log('Novo documento criado:', newDocument);
        
        // Atualizar documento atual
        setCurrentDocument(newDocument);
        
        // Mudar para estado de upload
        setScreenState(ScreenState.UPLOADING);
        setUploadProgress(0);
      }
    } catch (error) {
      console.error('Erro ao fazer upload do documento:', error);
      setScreenState(ScreenState.LIST);
    }
  };
  
  // Função para excluir um documento
  const deleteDocument = async (id: string) => {
    try {
      const updatedDocuments = documents.filter(doc => doc.id !== id);
      setDocuments(updatedDocuments);
      await saveDocuments(updatedDocuments);
      console.log(`Documento excluído: ${id}`);
    } catch (error) {
      console.error('Erro ao excluir documento:', error);
    }
  };
  
  // Função para mostrar o modal de opções de upload
  const showUploadOptions = () => {
    setScreenState(ScreenState.UPLOAD_OPTIONS);
    Animated.timing(modalOpacity, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true
    }).start();
  };
  
  // Função para fechar o modal de opções de upload
  const hideUploadOptions = () => {
    Animated.timing(modalOpacity, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true
    }).start(() => {
      setScreenState(ScreenState.LIST);
    });
  };
  
  const handleMenuPress = (document: Document) => {
    setSelectedDocument(document);
    setShowModal(true);
  };

  const handleShare = () => {
    // Implementar compartilhamento
    setShowModal(false);
  };

  const handleDownload = async () => {
    if (!selectedDocument) return;
    try {
      // Caminho de destino na pasta de downloads
      const fileName = selectedDocument.name;
      const destPath = FileSystem.documentDirectory + fileName;
      await FileSystem.copyAsync({
        from: selectedDocument.uri,
        to: destPath,
      });
      Alert.alert('Download', 'Arquivo copiado para a pasta interna do app.');
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível baixar o arquivo.');
    }
    setShowModal(false);
  };

  const handleRename = () => {
    // Implementar renomeação
    setShowModal(false);
  };

  const handleDelete = () => {
    if (selectedDocument) {
      deleteDocument(selectedDocument.id);
    }
    setShowModal(false);
  };

  const handleDetails = () => {
    setShowDetailsModal(true);
    setShowModal(false);
  };

  const ModalContent = () => (
    <View style={styles.modalContainer}>
      <View style={styles.modalHeader}>
        <View style={styles.modalHeaderContent}>
          <SvgXml xml={getFileIcon(selectedDocument?.name)} width={24} height={24} />
          <View style={styles.modalHeaderText}>
            <Text style={styles.modalTitle}>{selectedDocument?.name}</Text>
            <View style={styles.modalSubtitle}>
              <Text style={styles.modalSubtitleText}>{selectedDocument?.createdAt}</Text>
              <Text style={styles.modalSubtitleText}>•</Text>
              <Text style={styles.modalSubtitleText}>{selectedDocument?.size}</Text>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.modalOptions}>
        <TouchableOpacity style={styles.modalOption} onPress={handleShare}>
          <SvgXml xml={shareIcon} width={20} height={20} />
          <Text style={styles.modalOptionText}>Compartilhar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.modalOption} onPress={handleDownload}>
          <SvgXml xml={downloadIcon} width={20} height={20} />
          <Text style={styles.modalOptionText}>Download</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.modalOption} onPress={handleRename}>
          <SvgXml xml={editIcon} width={20} height={20} />
          <Text style={styles.modalOptionText}>Renomear</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.modalOption} onPress={handleDelete}>
          <SvgXml xml={deleteIcon} width={20} height={20} />
          <Text style={styles.modalOptionText}>Excluir</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.modalOption} onPress={handleDetails}>
          <SvgXml xml={infoIcon} width={20} height={20} />
          <Text style={styles.modalOptionText}>Detalhes</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
  
  // Renderizar um item da lista
  const renderItem = ({ item }: { item: Document }) => (
    <TouchableOpacity 
      style={styles.documentItem}
      onPress={() => handleMenuPress(item)}
    >
      <SvgXml xml={getFileIcon(item.name)} width={24} height={24} />
      
      <View style={styles.documentInfo}>
        <Text style={styles.documentName}>{item.name}</Text>
        <View style={styles.documentMeta}>
          <Text style={styles.documentDate}>{item.createdAt}</Text>
          <Text style={styles.documentDot}>•</Text>
          <Text style={styles.documentSize}>{item.size} {getFileExtension(item.name, item.type)}</Text>
        </View>
      </View>
      
      <TouchableOpacity
        onPress={() => handleMenuPress(item)}
        style={styles.deleteButton}
      >
        <SvgXml xml={menuDotsIcon} width={16} height={16} />
      </TouchableOpacity>
    </TouchableOpacity>
  );
  
  // Modal de detalhes do documento
  const DetailsModal = () => (
    <Modal
      visible={showDetailsModal}
      transparent={true}
      animationType="fade"
      onRequestClose={() => setShowDetailsModal(false)}
    >
      <TouchableOpacity
        style={styles.documentOptionsOverlay}
        activeOpacity={1}
        onPress={() => setShowDetailsModal(false)}
      >
        <View style={styles.documentOptionsContent}>
          <Text style={{fontWeight: 'bold', fontSize: 18, marginBottom: 12}}>Detalhes do Documento</Text>
          <Text><Text style={{fontWeight: 'bold'}}>Nome:</Text> {selectedDocument?.name}</Text>
          <Text><Text style={{fontWeight: 'bold'}}>Data:</Text> {selectedDocument?.createdAt}</Text>
          <Text><Text style={{fontWeight: 'bold'}}>Tamanho:</Text> {selectedDocument?.size}</Text>
          <Text><Text style={{fontWeight: 'bold'}}>Tipo:</Text> {selectedDocument?.type}</Text>
          <Text numberOfLines={1} ellipsizeMode="middle"><Text style={{fontWeight: 'bold'}}>Caminho:</Text> {selectedDocument?.uri}</Text>
          <TouchableOpacity style={{marginTop: 20, alignSelf: 'flex-end'}} onPress={() => setShowDetailsModal(false)}>
            <Text style={{color: '#5DC090', fontWeight: 'bold'}}>Fechar</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Modal>
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
            source={require('../../../../assets/img/arrow-left.png')} 
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
      
      {/* Conteúdo principal - muda conforme o estado */}
      <View style={styles.contentContainer}>
        {/* Lista de documentos */}
        {screenState === ScreenState.LIST && (
          <>
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
          </>
        )}
        
        {/* Modal de opções de upload */}
        {screenState === ScreenState.UPLOAD_OPTIONS && (
          <Animated.View style={[styles.uploadPopoverOverlay, { opacity: modalOpacity }]}>
            <TouchableOpacity style={{flex:1}} activeOpacity={1} onPress={hideUploadOptions}>
              <View style={styles.uploadPopoverContent} pointerEvents="box-none">
                <View style={styles.modalContent}>                
                  <TouchableOpacity 
                    style={styles.optionButton}
                    onPress={() => {
                      hideUploadOptions();
                      setTimeout(() => {
                        uploadDocument();
                      }, 300);
                    }}
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
            </TouchableOpacity>
          </Animated.View>
        )}
        
        {/* Upload em progresso */}
        {screenState === ScreenState.UPLOADING && (
          <View style={styles.uploadingContainer}>
            <View style={styles.uploadingModal}>
              <Text style={styles.uploadingTitle}>Uploading File</Text>
              
              <View style={styles.fileItemContainer}>
                <Text style={styles.fileName}>{currentDocument?.name || ''}</Text>
                <Text style={styles.fileSize}>{currentDocument?.size || '0 KB'} {getFileExtension(currentDocument?.name, currentDocument?.type)}</Text>
                
                <View style={styles.progressBarContainer}>
                  <View style={[styles.progressBar, { width: `${uploadProgress}%` }]} />
                </View>
                
                <View style={styles.actionButtons}>
                  <TouchableOpacity style={styles.iconButton}>
                    <SvgXml xml={pauseIcon} width={12} height={12} />
                  </TouchableOpacity>
                  
                  <TouchableOpacity 
                    style={styles.iconButton}
                    onPress={() => {
                      setScreenState(ScreenState.LIST);
                      setUploadProgress(0);
                    }}
                  >
                    <SvgXml xml={closeIcon} width={12} height={12} />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        )}
        
        {/* Upload concluído */}
        {screenState === ScreenState.UPLOAD_COMPLETE && (
          <View style={styles.uploadingContainer}>
            <View style={styles.uploadingModal}>
              <Text style={styles.uploadingTitle}>Uploading File</Text>
              
              <View style={styles.fileItemContainer}>
                <Text style={styles.fileName}>{currentDocument?.name || ''}</Text>
                <Text style={styles.fileSize}>{currentDocument?.size || '0 KB'} {getFileExtension(currentDocument?.name, currentDocument?.type)}</Text>
                
                <View style={styles.checkContainer}>
                  <View style={styles.checkCircle}>
                    <SvgXml xml={checkIcon} width={16} height={16} />
                  </View>
                  <Text style={styles.uploadedText}>Uploaded</Text>
                </View>
              </View>
            </View>
          </View>
        )}
      </View>
      
      {/* Botão circular com + */}
      <TouchableOpacity 
        style={styles.floatingButton}
        onPress={showUploadOptions}
      >
        <SvgXml xml={plusCircleIcon} width={24} height={24} />
      </TouchableOpacity>
      
      {/* Linha de swipe na parte inferior */}
      <View style={styles.swipeContainer}>
        <SvgXml xml={swipeIcon} width={123} height={3} />
      </View>
      
      <Modal
        visible={showModal}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowModal(false)}
      >
        <TouchableOpacity
          style={styles.documentOptionsOverlay}
          activeOpacity={1}
          onPress={() => setShowModal(false)}
        >
          <View style={styles.documentOptionsContent}>
            <ModalContent />
          </View>
        </TouchableOpacity>
      </Modal>
      
      <DetailsModal />
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
    marginTop: 32,
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
  contentContainer: {
    flex: 1,
    marginTop: 20,
  },
  // Estilos da lista vazia
  emptyContainer: {
    position: 'absolute',
    top: 300,
    left: 0,
    right: 0,
    alignItems: 'center',
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
  // Estilos da lista de documentos
  listContent: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  documentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0E2932',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
  },
  documentInfo: {
    flex: 1,
    marginLeft: 12,
  },
  documentName: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'Inter',
    fontWeight: '500',
  },
  documentMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  documentDate: {
    color: '#AAAAAA',
    fontSize: 12,
    fontFamily: 'Inter',
  },
  documentDot: {
    color: '#AAAAAA',
    fontSize: 12,
    marginHorizontal: 4,
  },
  documentSize: {
    color: '#AAAAAA',
    fontSize: 12,
    fontFamily: 'Inter',
  },
  deleteButton: {
    width: 48,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
  },
  // Estilos do modal de opções
  documentOptionsOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  documentOptionsContent: {
    width: '100%',
    maxWidth: 500,
    backgroundColor: '#F2F4F7',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '90%',
    maxWidth: 375,
    backgroundColor: '#F2F4F7',
    borderRadius: 16,
    overflow: 'hidden',
  },
  modalTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1D2939',
    marginBottom: 4,
  },
  modalSubtitle: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  modalSubtitleText: {
    fontSize: 12,
    color: '#1D2939',
  },
  modalOptions: {
    gap: 12,
  },
  modalOption: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    padding: 12,
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
  },
  modalOptionText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#344054',
  },
  // Estilos para a tela de upload
  uploadingContainer: {
    paddingHorizontal: 24,
    marginTop: 30,
  },
  uploadingModal: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 16,
  },
  uploadingTitle: {
    fontSize: 16,
    color: '#071E22',
    fontWeight: '500',
    marginBottom: 12,
  },
  fileItemContainer: {
    marginTop: 8,
  },
  fileName: {
    fontSize: 14,
    color: '#071E22',
    fontWeight: '500',
  },
  fileSize: {
    fontSize: 12,
    color: '#737373',
    marginTop: 4,
    marginBottom: 8,
  },
  progressBarContainer: {
    height: 4,
    backgroundColor: '#E5E5E5',
    borderRadius: 2,
    overflow: 'hidden',
    marginBottom: 10,
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#5DC090',
    borderRadius: 2,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 8,
  },
  iconButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  // Estilos para upload concluído
  checkContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  checkCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#5DC090',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  uploadedText: {
    fontSize: 14,
    color: '#5DC090',
    fontWeight: '500',
  },
  // Botão flutuante e swipe
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
  modalContainer: {
    padding: 16,
  },
  modalHeader: {
    marginBottom: 16,
  },
  modalHeaderContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  modalHeaderText: {
    flex: 1,
  },
  documentMenu: {
    padding: 8,
  },
  optionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    padding: 12,
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    marginBottom: 8,
  },
  optionText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#344054',
  },
  // Estilos para o popover do upload (UPLOAD_OPTIONS)
  uploadPopoverOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.01)', // quase transparente só para capturar o clique
    zIndex: 10,
  },
  uploadPopoverContent: {
    position: 'absolute',
    right: 24,
    bottom: 140, // um pouco acima do botão flutuante
    minWidth: 240,
    backgroundColor: '#FFF',
    borderTopLeftRadius: 16,
    borderBottomLeftRadius: 16,
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    paddingVertical: 0,
    paddingHorizontal: 0,
  },
}); 