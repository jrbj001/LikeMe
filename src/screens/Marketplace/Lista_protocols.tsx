import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import BottomMenu from './BottomMenu';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const feed = require('./marketplace_feed.json');

const imageMap: { [key: string]: any } = {
  'protocol-image.png': require('../../assets/images/protocol-image.png'),
  'protocol-image-1.png': require('../../assets/images/protocol-image-1.png'),
  'health-food.png': require('../../assets/images/health-food.png'),
  'health-food-1.png': require('../../assets/images/health-food-1.png'),
};

interface Protocol {
  id: number;
  title: string;
  author: string;
  image: string;
  description: string;
  tags: string[];
}

const Lista_protocols = () => {
  const navigation = useNavigation();
  const [protocols, setProtocols] = useState<Protocol[]>([]);

  useEffect(() => {
    setProtocols(feed.protocols);
  }, []);

  const getImage = (imgPath: string) => {
    return imageMap[imgPath] || require('../../assets/images/foreground-image.png');
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#10221B' }}>
      {/* Logo no topo */}
      <View style={styles.logoContainer}>
        <Text style={styles.logoText}>
          <Text style={styles.logoWhite}>like</Text>
          <Text style={styles.logoGreen}>me</Text>
        </Text>
      </View>
      {/* Espaço entre logo e header */}
      <View style={{ height: 24 }} />
      {/* Header com seta e título centralizado */}
      <View style={styles.headerRow}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Feather name="arrow-left" size={28} color="#fff" />
        </TouchableOpacity>
        <View style={styles.headerTitleWrapper}>
          <Text style={styles.title}>Protocols</Text>
        </View>
      </View>
      {/* Lista de protocolos em grid */}
      <FlatList
        data={protocols}
        keyExtractor={item => item.id.toString()}
        numColumns={2}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <View style={styles.protocolCard}>
            <Image source={getImage(item.image)} style={styles.protocolImage} />
            <View style={styles.protocolInfo}>
              <Text style={styles.protocolTitle}>{item.title}</Text>
              <Text style={styles.protocolAuthor}>{item.author}</Text>
            </View>
          </View>
        )}
        showsVerticalScrollIndicator={false}
      />
      <BottomMenu />
    </View>
  );
};

const styles = StyleSheet.create({
  logoContainer: {
    width: '100%',
    alignItems: 'flex-start',
    paddingTop: 42,
    paddingLeft: 16,
    marginBottom: 0,
    marginTop: 0,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 12,
    position: 'relative',
    height: 40,
  },
  backButton: {
    position: 'absolute',
    left: 16,
    zIndex: 2,
    padding: 4,
  },
  headerTitleWrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoText: {
    fontSize: 20,
    letterSpacing: 0,
    fontWeight: 'normal',
    marginTop: 6,
  },
  logoWhite: {
    color: '#FFFFFF',
    fontWeight: 'normal',
  },
  logoGreen: {
    color: '#B4E48E',
    fontWeight: 'bold',
  },
  title: {
    color: '#C6FF8E',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 90,
  },
  protocolCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    margin: 8,
    width: (width - 48) / 2,
    overflow: 'hidden',
    elevation: 2,
  },
  protocolImage: {
    width: '100%',
    height: 100,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  protocolInfo: {
    padding: 10,
  },
  protocolTitle: {
    color: '#222',
    fontWeight: 'bold',
    fontSize: 15,
  },
  protocolAuthor: {
    color: '#666',
    fontSize: 13,
    marginBottom: 4,
  },
});

export default Lista_protocols; 