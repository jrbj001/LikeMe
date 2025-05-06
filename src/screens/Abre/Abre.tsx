import React, { useEffect, useRef } from "react";
import { View, Text, ImageBackground, TouchableOpacity, Animated } from "react-native";
import { Svg, Line } from 'react-native-svg';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types/navigation';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export const Abre = () => {
  const navigation = useNavigation<NavigationProp>();
  const fadeAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const timer = setTimeout(() => {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }).start(() => {
        navigation.replace('Welcome');
      });
    }, 2000);
    return () => clearTimeout(timer);
  }, [navigation, fadeAnim]);

  return (
    <TouchableOpacity 
      style={{ flex: 1 }} 
      activeOpacity={1}
      onPress={() => navigation.navigate('Welcome')}
    >
      <Animated.View style={{ flex: 1, backgroundColor: '#0A1D23', opacity: fadeAnim }}>
        <View style={{ width: '100%', height: '100%' }}>
          <ImageBackground
            source={require("../../assets/images/background-image.png")}
            style={{ flex: 1 }}
            resizeMode="cover"
          >
            <View style={{ position: 'absolute', top: 363, left: 87 }}>
              <Text style={{ fontSize: 70, letterSpacing: 0, lineHeight: 70 }}>
                <Text style={{ color: '#FFF6E9' }}>like</Text>
                <Text style={{ color: '#B4E48E', fontWeight: 'bold' }}>me</Text>
              </Text>
            </View>

            <View style={{ position: 'absolute', width: 123, height: 3, top: 800, left: 126 }}>
              <Svg width="123" height="3" viewBox="0 0 123 3">
                <Line
                  x1="0"
                  y1="1.5"
                  x2="123"
                  y2="1.5"
                  stroke="#FFF6E9"
                  strokeWidth="3"
                />
              </Svg>
            </View>
          </ImageBackground>
        </View>
      </Animated.View>
    </TouchableOpacity>
  );
}; 