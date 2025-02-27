import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Platform,
  Dimensions,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';
import {
  useFonts,
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
} from '@expo-google-fonts/inter';

type WelcomeScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Welcome'>;
};

const { width } = Dimensions.get('window');

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ navigation }) => {
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Decorative Pattern */}
        <View style={styles.patternContainer}>
          <View style={styles.circle} />
          <View style={styles.linesContainer}>
            {Array.from({ length: 18 }).map((_, index) => (
              <View 
                key={index} 
                style={[
                  styles.line,
                  {
                    transform: [
                      { rotate: `${(index * 10)}deg` }
                    ]
                  }
                ]} 
              />
            ))}
          </View>
        </View>

        {/* Text Content */}
        <View style={styles.textContainer}>
          <Text style={styles.title}>
            Secure your financial{'\n'}future with us.
          </Text>
          <Text style={styles.subtitle}>
            Your financial future, our priority. Secure your finances with our trusted banking services.
          </Text>
        </View>

        {/* Buttons */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.loginButton}
            onPress={() => navigation.navigate('Home')}
            activeOpacity={0.9}
          >
            <Text style={styles.loginButtonText}>Log In</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.registerButton}
            onPress={() => console.log('Register pressed')}
            activeOpacity={0.9}
          >
            <Text style={styles.registerButtonText}>Register</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E3F2FD',
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: 'space-between',
    paddingTop: Platform.OS === 'android' ? 40 : 0,
    paddingBottom: Platform.OS === 'android' ? 24 : 0,
  },
  patternContainer: {
    height: width * 0.8,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
  },
  circle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#1976D2',
    position: 'absolute',
    zIndex: 2,
  },
  linesContainer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  line: {
    width: 1,
    height: '100%',
    backgroundColor: '#1976D2',
    position: 'absolute',
    opacity: 0.15,
  },
  textContainer: {
    marginBottom: 40,
  },
  title: {
    fontSize: 32,
    fontFamily: 'Inter_700Bold',
    color: '#1976D2',
    marginBottom: 16,
    lineHeight: 40,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: 'Inter_400Regular',
    color: '#1976D2',
    opacity: 0.7,
    lineHeight: 24,
  },
  buttonContainer: {
    gap: 16,
    marginBottom: Platform.OS === 'ios' ? 40 : 24,
  },
  loginButton: {
    backgroundColor: '#1976D2',
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'Inter_600SemiBold',
  },
  registerButton: {
    backgroundColor: '#FFFFFF',
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#1976D2',
  },
  registerButtonText: {
    color: '#1976D2',
    fontSize: 16,
    fontFamily: 'Inter_600SemiBold',
  },
});

export default WelcomeScreen; 