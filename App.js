import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <Stack.Navigator 
        initialRouteName="Welcome"
        screenOptions={{
          headerShown: false,
        }}
      >
      </Stack.Navigator>
    </NavigationContainer>
  );
}
