import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types/navigation';

const BottomMenu = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  // Simular que a Home está ativa
  const activeRoute = 'Home';

  const getColor = (route: string) =>
    route === activeRoute ? '#C6FF8E' : '#fff';

  return (
    <View style={styles.menuContainer}>
      <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('MarketplaceScreen')}>
        <Ionicons name="home-outline" size={24} color={getColor('Home')} style={styles.menuIcon} />
        <Text style={[styles.menuLabel, { color: getColor('Home') }]}>Home</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('MarketplaceScreen')}>
        <Ionicons name="barbell-outline" size={24} color={getColor('Community')} style={styles.menuIcon} />
        <Text style={[styles.menuLabel, { color: getColor('Community') }]}>Community</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('MarketplaceScreen')}>
        <Ionicons name="wallet-outline" size={24} color={getColor('Wallet')} style={styles.menuIcon} />
        <Text style={[styles.menuLabel, { color: getColor('Wallet') }]}>Wallet</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('MarketplaceScreen')}>
        <Ionicons name="person-outline" size={24} color={getColor('Profile')} style={styles.menuIcon} />
        <Text style={[styles.menuLabel, { color: getColor('Profile') }]}>Profile</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  menuContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#10221B',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#1A2C23',
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 10,
  },
  menuItem: {
    alignItems: 'center',
    flex: 1,
    paddingTop: 0,
  },
  menuIcon: {
    marginBottom: 2,
  },
  menuLabel: {
    color: '#C6FF8E',
    fontSize: 12,
    marginTop: 0,
    fontWeight: 'bold',
    marginBottom: 26,
  },
});

export default BottomMenu; 