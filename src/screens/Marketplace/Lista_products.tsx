import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import BottomMenu from './BottomMenu';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types/navigation';

const { width } = Dimensions.get('window');

const feed = require('./marketplace_feed.json');

const imageMap: { [key: string]: any } = {
  'protocol-image.png': require('../../assets/images/protocol-image.png'),
  'protocol-image-1.png': require('../../assets/images/protocol-image-1.png'),
  'health-food.png': require('../../assets/images/health-food.png'),
  'health-food-1.png': require('../../assets/images/health-food-1.png'),
};

interface Product {
  id: number;
  name: string;
  brand: string;
  price: number;
  image: string;
  rating: number;
  category: string;
}

const Lista_products = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    setProducts(feed.products);
  }, []);

  const getImage = (imgPath: string) => {
    return imageMap[imgPath] || require('../../assets/images/foreground-image.png');
  };

  // Cores das categorias (exemplo, pode ser expandido)
  const categoryColors: { [key: string]: string } = {
    Nutrition: '#E6E96A',
    Sleep: '#5EDFFF',
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
          <Text style={styles.title}>Products</Text>
        </View>
      </View>
      {/* Lista de produtos em grid */}
      <FlatList
        data={products}
        keyExtractor={item => item.id.toString()}
        numColumns={2}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <View style={styles.productCard}>
            {/* Categoria */}
            <View style={[styles.categoryTag, { backgroundColor: categoryColors[item.category] || '#E6E96A' }]}> 
              <Text style={styles.categoryTagText}>{item.category}</Text>
            </View>
            {/* Imagem */}
            <Image source={getImage(item.image)} style={styles.productImage} />
            {/* Nome, rating, marca, preço, botão */}
            <View style={styles.productInfo}>
              <View style={styles.productTitleRow}>
                <Text style={styles.productTitle}>{item.name}</Text>
                <Text style={styles.productRatingStar}>⭐</Text>
                <Text style={styles.productRatingValue}>{item.rating}</Text>
              </View>
              <Text style={styles.productBrand}>{item.brand}</Text>
              <Text style={styles.productPrice}>R$ {item.price.toFixed(2).replace('.', ',')}</Text>
              <TouchableOpacity style={styles.addButton}>
                <Feather name="plus" size={20} color="#fff" />
              </TouchableOpacity>
            </View>
          </View>
        )}
        showsVerticalScrollIndicator={false}
      />
      <BottomMenu />
    </View>
  );
};

const cardWidth = (width - 48) / 2;

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
  title: {
    color: '#C6FF8E',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  listContent: {
    paddingHorizontal: 8,
    paddingBottom: 90,
  },
  productCard: {
    backgroundColor: '#fff',
    borderRadius: 28,
    margin: 8,
    width: cardWidth,
    overflow: 'hidden',
    elevation: 2,
    paddingBottom: 12,
    paddingTop: 8,
    alignItems: 'center',
    position: 'relative',
  },
  categoryTag: {
    position: 'absolute',
    top: 16,
    left: 16,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 2,
    zIndex: 2,
  },
  categoryTagText: {
    color: '#222',
    fontWeight: 'bold',
    fontSize: 15,
  },
  productImage: {
    width: cardWidth - 32,
    height: cardWidth - 32,
    borderRadius: 12,
    marginBottom: 8,
    marginTop: 16,
    resizeMode: 'contain',
  },
  productInfo: {
    width: '100%',
    paddingHorizontal: 16,
    marginTop: 4,
  },
  productTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
  },
  productTitle: {
    color: '#222',
    fontWeight: 'bold',
    fontSize: 18,
    flex: 1,
  },
  productRatingStar: {
    color: '#FBBF24',
    fontSize: 18,
    marginLeft: 6,
    marginRight: 2,
  },
  productRatingValue: {
    color: '#FBBF24',
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 2,
  },
  productBrand: {
    color: '#666',
    fontSize: 15,
    marginBottom: 2,
    textAlign: 'left',
  },
  productPrice: {
    color: '#222',
    fontWeight: 'bold',
    fontSize: 17,
    marginBottom: 8,
    textAlign: 'left',
  },
  addButton: {
    backgroundColor: '#000',
    borderRadius: 999,
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    right: 16,
    bottom: 8,
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

export default Lista_products; 