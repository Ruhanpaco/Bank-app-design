import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './src/screens/HomeScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import ChatScreen from './src/screens/ChatScreen';
import TransferScreen from './src/screens/TransferScreen';
import TransactionDetailScreen from './src/screens/TransactionDetailScreen';
import { RootStackParamList } from './src/types/navigation';

const Stack = createNativeStackNavigator<RootStackParamList>();

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <Stack.Navigator 
        id={undefined}
        initialRouteName="Home"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="Chat" component={ChatScreen} />
        <Stack.Screen name="Transfer" component={TransferScreen} />
        <Stack.Screen name="TransactionDetail" component={TransactionDetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App; 