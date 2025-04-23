import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';
import { Abre } from '../screens/Abre';
import { Welcome } from '../screens/Welcome';
import { Abre_documents } from '../screens/Abre_documents';
import { Documents_Home } from '../screens/Documents/Documents_Home';
import { Documents_Upload } from '../screens/Documents/Documents_Upload';
import { Documents_Uploading } from '../screens/Documents/Documents_Uploading';
import { Documents_Complete } from '../screens/Documents/Documents_Complete';
import { Documents_ListWithFiles } from '../screens/Documents/Documents_ListWithFiles';
import { Documents_Unified } from '../screens/Documents/Unified/Documents_Unified';

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
        <Stack.Screen name="Abre_documents" component={Abre_documents} />
        <Stack.Screen name="Documents_Home" component={Documents_Home} />
        <Stack.Screen name="Documents_Upload" component={Documents_Upload} />
        <Stack.Screen name="Documents_Uploading" component={Documents_Uploading} />
        <Stack.Screen name="Documents_Complete" component={Documents_Complete} />
        <Stack.Screen name="Documents_ListWithFiles" component={Documents_ListWithFiles} />
        <Stack.Screen name="Documents_Unified" component={Documents_Unified} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}; 