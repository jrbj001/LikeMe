import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import BottomMenu from './BottomMenu';

const { width } = Dimensions.get('window');

const feed = require('./marketplace_feed.json');

const imageMap: { [key: string]: any } = {
  'protocol-image.png': require('../../assets/images/protocol-image.png'),
  'protocol-image-1.png': require('../../assets/images/protocol-image-1.png'),
  'health-food.png': require('../../assets/images/health-food.png'),
  'health-food-1.png': require('../../assets/images/health-food-1.png'),
};

const Item_protocolo = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { id } = route.params as { id: number };
  const [protocol, setProtocol] = useState<any>(null);

  useEffect(() => {
    const found = feed.protocols.find((p: any) => p.id === id);
    setProtocol(found);
  }, [id]);

  if (!protocol) return null;

  return (
    <View style={{ flex: 1, backgroundColor: '#10221B' }}>
      {/* Logo no topo */}
      <View style={styles.logoRow}>
        <Text style={styles.logoText}>
          <Text style={styles.logoWhite}>like</Text>
          <Text style={styles.logoGreen}>me</Text>
        </Text>
      </View>
      {/* Espaço */}
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
      <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
        {/* Imagem grande */}
        <View style={styles.imageWrapper}>
          <Image source={imageMap[protocol.image]} style={styles.protocolImage} resizeMode="cover" />
        </View>
        {/* Título e autor */}
        <Text style={styles.protocolTitle}>
          <Text style={styles.bold}>Performance </Text>
          <Text style={styles.italic}>{protocol.author}</Text>
        </Text>
        {/* Descrição longa */}
        <Text style={styles.description}>{protocol.longDescription}</Text>
        {/* Botão Buy */}
        <View style={styles.buyWrapper}>
          <TouchableOpacity style={styles.buyButton}>
            <Text style={styles.buyText}>Buy</Text>
          </TouchableOpacity>
        </View>
        <View style={{ height: 40 }} />
      </ScrollView>
      <BottomMenu />
    </View>
  );
};

const styles = StyleSheet.create({
  logoRow: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 42,
    paddingLeft: 16,
    marginBottom: 0,
    marginTop: 0,
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
  title: {
    color: '#C6FF8E',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  imageWrapper: {
    width: width - 32,
    height: width - 32,
    alignSelf: 'center',
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: '#fff',
    marginBottom: 18,
  },
  protocolImage: {
    width: '100%',
    height: '100%',
    borderRadius: 16,
  },
  protocolTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginHorizontal: 16,
    marginBottom: 12,
  },
  bold: {
    fontWeight: 'bold',
    color: '#fff',
  },
  italic: {
    fontStyle: 'italic',
    color: '#B4E48E',
  },
  description: {
    color: '#D1D5DB',
    fontSize: 16,
    marginHorizontal: 16,
    marginBottom: 16,
    lineHeight: 22,
  },
  buyWrapper: {
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 24,
  },
  buyButton: {
    backgroundColor: '#C6FF8E',
    borderRadius: 10,
    width: width - 48,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buyText: {
    color: '#10221B',
    fontWeight: 'bold',
    fontSize: 20,
  },
});

export default Item_protocolo; 