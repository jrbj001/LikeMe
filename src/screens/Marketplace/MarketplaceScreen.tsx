import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import BottomMenu from './BottomMenu';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types/navigation';

// Definições de tipos para os dados do feed
interface Tag {
  name: string;
  color: string;
}

interface SectionTitle {
  title: string;
  seeAll?: string;
}

interface Protocol {
  id: number;
  title: string;
  author: string;
  image: string;
  description: string;
  tags: string[];
}

interface Product {
  id: number;
  name: string;
  brand: string;
  price: number;
  image: string;
  rating: number;
  category: string;
}

interface Service {
  id: number;
  name: string;
  category: string;
}

interface MarketplaceFeed {
  tags: Tag[];
  sections: {
    protocols: SectionTitle;
    products: SectionTitle;
    services: SectionTitle;
  };
  protocols: Protocol[];
  products: Product[];
  services: Service[];
}

const feed: MarketplaceFeed = require('./marketplace_feed.json');

// Mapa estático de imagens
const imageMap: { [key: string]: any } = {
  'protocol-image.png': require('../../assets/images/protocol-image.png'),
  'protocol-image-1.png': require('../../assets/images/protocol-image-1.png'),
  'health-food.png': require('../../assets/images/health-food.png'),
  'health-food-1.png': require('../../assets/images/health-food-1.png'),
  // Adicione aqui outros nomes de imagens usados no JSON
};

const MarketplaceScreen = () => {
  const [data, setData] = useState<MarketplaceFeed | null>(null);
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  useEffect(() => {
    setData(feed);
  }, []);

  // Função para carregar imagem dinâmica
  const getImage = (imgPath: string) => {
    return imageMap[imgPath] || require('../../assets/images/foreground-image.png');
  };

  // Função para buscar cor da tag
  const getTagColor = (tagName: string) => {
    const tag = data?.tags.find(t => t.name === tagName);
    return tag ? tag.color : '#fff';
  };

  if (!data) return null;

  return (
    <View style={{ flex: 1, backgroundColor: '#10221B' }}>
      {/* Logo no topo */}
      <View style={styles.logoContainer}>
        <Text style={styles.logoText}>
          <Text style={styles.logoWhite}>like</Text>
          <Text style={styles.logoGreen}>me</Text>
        </Text>
      </View>
      <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 80 }}>
        {/* Tags coloridas no topo */}
        <View style={styles.tagsContainer}>
          {data.tags.map(tag => (
            <View key={tag.name} style={[styles.tag, { backgroundColor: tag.color }]}> 
              <Text style={styles.tagText}>{tag.name}</Text>
            </View>
          ))}
        </View>
        {/* Protocols */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>{data.sections.protocols.title}</Text>
          {data.sections.protocols.seeAll && (
            <TouchableOpacity onPress={() => navigation.navigate('Lista_protocols')}>
              <Text style={styles.seeAll}>{data.sections.protocols.seeAll}</Text>
            </TouchableOpacity>
          )}
        </View>
        {/* Espaço entre header e cards de Protocols */}
        <View style={{ height: 12 }} />
        <FlatList
          data={data.protocols}
          keyExtractor={item => item.id.toString()}
          horizontal
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.protocolCard} onPress={() => navigation.navigate('Item_protocolo', { id: item.id })}>
              <Image source={getImage(item.image)} style={styles.protocolImage} />
              <View style={styles.protocolInfo}>
                <Text style={styles.protocolTitle}>{item.title}</Text>
                <Text style={styles.protocolAuthor}>{item.author}</Text>
                <View style={styles.protocolTagsRow}>
                  {item.tags.map(tag => (
                    <View key={tag} style={[styles.cardTag, { backgroundColor: getTagColor(tag) }]}> 
                      <Text style={styles.cardTagText}>{tag}</Text>
                    </View>
                  ))}
                </View>
              </View>
            </TouchableOpacity>
          )}
          showsHorizontalScrollIndicator={false}
        />
        {/* Espaço entre Protocols e Products */}
        <View style={{ height: 16 }} />
        {/* Products */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>{data.sections.products.title}</Text>
          {data.sections.products.seeAll && (
            <TouchableOpacity><Text style={styles.seeAll}>{data.sections.products.seeAll}</Text></TouchableOpacity>
          )}
        </View>
        {/* Espaço entre header e cards de Products */}
        <View style={{ height: 12 }} />
        <FlatList
          data={data.products}
          keyExtractor={item => item.id.toString()}
          horizontal
          renderItem={({ item }) => (
            <View style={styles.productCard}>
              <View style={[styles.cardTag, { backgroundColor: getTagColor(item.category), position: 'absolute', top: 10, left: 10, zIndex: 2 }]}> 
                <Text style={styles.cardTagText}>{item.category}</Text>
              </View>
              <Image source={getImage(item.image)} style={styles.productImage} />
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
                <Text style={styles.productTitle}>{item.name}</Text>
                <Text style={styles.productRatingStar}>⭐</Text>
                <Text style={styles.productRatingValue}>{item.rating}</Text>
              </View>
              <Text style={styles.productBrand}>{item.brand}</Text>
              <View style={styles.productRow}>
                <Text style={styles.productPrice}>R$ {item.price.toFixed(2).replace('.', ',')}</Text>
              </View>
              <TouchableOpacity style={styles.addButton}>
                <Text style={styles.addButtonText}>+</Text>
              </TouchableOpacity>
            </View>
          )}
          showsHorizontalScrollIndicator={false}
        />
        {/* Espaço entre Products e Services */}
        <View style={{ height: 16 }} />
        {/* Services */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>{data.sections.services.title}</Text>
        </View>
        <View style={styles.servicesContainer}>
          {data.services.map(service => (
            <TouchableOpacity key={service.id} style={styles.serviceButton}>
              <Text style={styles.serviceButtonText}>{service.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
      <BottomMenu />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#10221B',
    padding: 16,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 16,
    gap: 4,
  },
  tag: {
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 2,
    marginRight: 4,
    marginBottom: 4,
  },
  tagText: {
    color: '#222',
    fontWeight: 'normal',
    fontSize: 13,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 8,
    marginBottom: 4,
  },
  sectionTitle: {
    color: '#C6FF8E',
    fontSize: 20,
    fontWeight: 'bold',
  },
  seeAll: {
    color: '#B0B0B0',
    fontSize: 14,
    fontWeight: 'bold',
  },
  protocolCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    marginRight: 16,
    width: 180,
    overflow: 'hidden',
    elevation: 2,
  },
  protocolImage: {
    width: '100%',
    height: 90,
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
  protocolTagsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 4,
  },
  cardTag: {
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 2,
    marginRight: 4,
    marginBottom: 4,
  },
  cardTagText: {
    color: '#222',
    fontWeight: 'normal',
    fontSize: 11,
  },
  productCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    marginRight: 16,
    width: 160,
    padding: 10,
    alignItems: 'center',
    position: 'relative',
    elevation: 2,
  },
  productImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginBottom: 8,
    marginTop: 8,
  },
  productTitle: {
    color: '#222',
    fontWeight: 'bold',
    fontSize: 15,
    textAlign: 'center',
  },
  productBrand: {
    color: '#666',
    fontSize: 13,
    marginBottom: 4,
    textAlign: 'center',
  },
  productRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 4,
  },
  productPrice: {
    color: '#222',
    fontWeight: 'bold',
    fontSize: 14,
  },
  productRatingStar: {
    color: '#FBBF24',
    fontSize: 15,
    marginLeft: 6,
    marginRight: 2,
  },
  productRatingValue: {
    color: '#FBBF24',
    fontSize: 14,
    fontWeight: 'bold',
    marginRight: 2,
  },
  addButton: {
    backgroundColor: '#10221B',
    borderRadius: 20,
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 10,
    right: 10,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
  },
  servicesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 8,
    marginBottom: 24,
  },
  serviceButton: {
    borderColor: '#5EDFFF',
    borderWidth: 1,
    borderTopLeftRadius: 16,
    borderBottomLeftRadius: 16,
    borderTopRightRadius: 16,
    borderBottomRightRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 4,
    marginBottom: 4,
    backgroundColor: 'transparent',
  },
  serviceButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
  },
  logoContainer: {
    width: '100%',
    alignItems: 'flex-start',
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
});

export default MarketplaceScreen; 