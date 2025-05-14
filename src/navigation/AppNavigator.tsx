import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';
import { Abre } from '../screens/Abre';
import { Welcome } from '../screens/Welcome';
import { Abre_documents } from '../screens/Abre_documents';
import { Documents_Unified } from '../screens/Documents/Unified/Documents_Unified';
import { AbreAmaninese } from '../screens/AbreAmaninese';
import { Abre_amaninese_default } from '../screens/AbreAmaninese/Abre_amaninese_default';
import TermosDeUso from '../screens/TermosDeUso/TermosDeUso';
import MarketplaceScreen from '../screens/Marketplace/MarketplaceScreen';
import Lista_protocols from '../screens/Marketplace/Lista_protocols';
import Item_protocolo from '../screens/Marketplace/Item_protocolo';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Abre"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Abre" component={Abre} />
        <Stack.Screen name="Welcome" component={Welcome} />
        <Stack.Screen name="AbreAmaninese" component={AbreAmaninese} />
        <Stack.Screen name="Abre_amaninese_default" component={Abre_amaninese_default} />
        <Stack.Screen name="Abre_documents" component={Abre_documents} />
        <Stack.Screen name="Documents_Unified" component={Documents_Unified} />
        <Stack.Screen name="TermosDeUso" component={TermosDeUso} />
        <Stack.Screen name="MarketplaceScreen" component={MarketplaceScreen} />
        <Stack.Screen name="Lista_protocols" component={Lista_protocols} />
        <Stack.Screen name="Item_protocolo" component={Item_protocolo} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}; 