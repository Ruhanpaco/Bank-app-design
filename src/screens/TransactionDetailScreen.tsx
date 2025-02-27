import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
  Platform,
  ImageStyle,
  Animated,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../types/navigation';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import {
  useFonts,
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
} from '@expo-google-fonts/inter';

type TransactionDetailScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'TransactionDetail'>;
  route: RouteProp<RootStackParamList, 'TransactionDetail'>;
};

const LoadingAnimation: React.FC = () => {
  const [dots, setDots] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      setDots(prev => {
        if (prev.length >= 3) return '';
        return prev + '.';
      });
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.loadingContainer}>
      <View style={styles.loadingCircle}>
        <FontAwesome5 name="exchange-alt" size={32} color="#1976D2" />
      </View>
      <Text style={styles.loadingText}>
        Processing Transaction{dots}
      </Text>
      <Text style={styles.loadingSubtext}>
        Please wait while we process your transaction
      </Text>
    </View>
  );
};

const TransactionDetailScreen: React.FC<TransactionDetailScreenProps> = ({ navigation, route }) => {
  const { status, amount, beneficiary, transactionId, date, reason } = route.params;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.5)).current;
  const [showContent, setShowContent] = useState(false);

  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
  });

  useEffect(() => {
    // Show loading for 2 seconds before displaying content
    const timer = setTimeout(() => {
      setShowContent(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (showContent) {
      // Start the animation sequence when content is ready to show
      Animated.sequence([
        Animated.parallel([
          Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 800,
            useNativeDriver: true,
          }),
          Animated.spring(scaleAnim, {
            toValue: 1,
            tension: 50,
            friction: 7,
            useNativeDriver: true,
          }),
        ]),
        // Add a slight bounce effect
        Animated.spring(scaleAnim, {
          toValue: 1.1,
          tension: 100,
          friction: 5,
          useNativeDriver: true,
        }),
        Animated.spring(scaleAnim, {
          toValue: 1,
          tension: 100,
          friction: 5,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [showContent, fadeAnim, scaleAnim]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.navigate('Home')}
        >
          <FontAwesome5 name="arrow-left" size={20} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Transaction Detail</Text>
        <View style={styles.backButton} />
      </View>

      {!showContent ? (
        <LoadingAnimation />
      ) : (
        <>
          {/* Status Icon with Animation */}
          <Animated.View style={[
            styles.statusContainer,
            {
              opacity: fadeAnim,
              transform: [{ scale: scaleAnim }]
            }
          ]}>
            <View style={[
              styles.statusCircle,
              status === 'success' ? styles.successCircle : styles.failedCircle
            ]}>
              <FontAwesome5 
                name={status === 'success' ? 'check' : 'times'} 
                size={32} 
                color="#FFF" 
              />
            </View>
            <Text style={[
              styles.statusText,
              status === 'success' ? styles.successText : styles.failedText
            ]}>
              {status === 'success' ? 'Transfer Successful' : 'Transfer Failed'}
            </Text>
            <Text style={styles.amountText}>${amount.toFixed(2)}</Text>
          </Animated.View>

          {/* Transaction Details */}
          <View style={styles.detailsCard}>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Beneficiary</Text>
              <View style={styles.beneficiaryInfo}>
                <Image
                  source={require('../assets/images/avatar.png')}
                  style={styles.beneficiaryAvatar as ImageStyle}
                />
                <Text style={styles.beneficiaryName}>{beneficiary.name}</Text>
              </View>
            </View>

            <View style={styles.divider} />

            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Transaction ID</Text>
              <View style={styles.transactionIdContainer}>
                <Text style={styles.detailValue}>{transactionId}</Text>
              </View>
            </View>

            <View style={styles.divider} />

            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Date & Time</Text>
              <Text style={styles.detailValue}>{date}</Text>
            </View>

            {reason && (
              <>
                <View style={styles.divider} />
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Failure Reason</Text>
                  <Text style={[styles.detailValue, styles.failedText]}>{reason}</Text>
                </View>
              </>
            )}
          </View>

          {/* Action Button */}
          <View style={styles.bottomSection}>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => navigation.navigate('Home')}
            >
              <Text style={styles.actionButtonText}>Back to Home</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: Platform.OS === 'android' ? 16 : 0,
    height: 56,
  },
  headerTitle: {
    fontSize: 17,
    fontFamily: 'Inter_600SemiBold',
    color: '#000000',
    textAlign: 'center',
    flex: 1,
    marginHorizontal: 16,
  },
  backButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  statusContainer: {
    alignItems: 'center',
    paddingVertical: 32,
  },
  statusCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  successCircle: {
    backgroundColor: '#2E7D32',
  },
  failedCircle: {
    backgroundColor: '#D32F2F',
  },
  statusText: {
    fontSize: 17,
    fontFamily: 'Inter_600SemiBold',
    marginBottom: 8,
  },
  successText: {
    color: '#2E7D32',
  },
  failedText: {
    color: '#D32F2F',
  },
  amountText: {
    fontSize: 32,
    fontFamily: 'Inter_700Bold',
    color: '#000000',
  },
  detailsCard: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#F0F0F0',
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  detailLabel: {
    fontSize: 15,
    fontFamily: 'Inter_400Regular',
    color: '#666666',
  },
  detailValue: {
    fontSize: 15,
    fontFamily: 'Inter_500Medium',
    color: '#000000',
    zIndex: 1,
  },
  beneficiaryInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  beneficiaryAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 8,
  },
  beneficiaryName: {
    fontSize: 15,
    fontFamily: 'Inter_500Medium',
    color: '#000000',
  },
  divider: {
    height: 1,
    backgroundColor: '#F0F0F0',
  },
  bottomSection: {
    padding: 16,
    paddingBottom: Platform.OS === 'ios' ? 34 : 16,
    marginTop: 'auto',
  },
  actionButton: {
    backgroundColor: '#1976D2',
    borderRadius: 12,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionButtonText: {
    fontSize: 15,
    fontFamily: 'Inter_600SemiBold',
    color: '#FFFFFF',
  },
  transactionIdContainer: {
    backgroundColor: '#F8FAFD',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  loadingCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#E3F2FD',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  loadingText: {
    fontSize: 18,
    fontFamily: 'Inter_600SemiBold',
    color: '#1976D2',
    marginBottom: 8,
  },
  loadingSubtext: {
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    color: '#666666',
    textAlign: 'center',
  },
});

export default TransactionDetailScreen; 