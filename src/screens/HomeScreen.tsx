import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  TouchableOpacity,
  Platform,
  Dimensions,
  Animated,
  ImageStyle,
  ViewStyle,
  ScrollView,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { LinearGradient } from 'expo-linear-gradient';
import {
  useFonts,
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
} from '@expo-google-fonts/inter';

const { width } = Dimensions.get('window');

type HomeScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Home'>;
};

// Update the Transaction type
type Transaction = {
  id: string;
  title: string;
  amount: number;
  timestamp: string;
  type: 'incoming' | 'outgoing';
  category: string;
};

// Update sample transaction data
const transactions: Transaction[] = [
  {
    id: '1',
    title: 'Grocery Shopping',
    amount: 438,
    timestamp: 'Today, 12:30 pm',
    type: 'outgoing',
    category: 'shopping',
  },
  {
    id: '2',
    title: 'Salary Deposit',
    amount: 1200,
    timestamp: 'Today, 12:30 pm',
    type: 'incoming',
    category: 'salary',
  },
  {
    id: '3',
    title: 'Netflix Subscription',
    amount: 15,
    timestamp: 'Today, 12:30 pm',
    type: 'outgoing',
    category: 'entertainment',
  },
  {
    id: '4',
    title: 'Freelance Payment',
    amount: 786,
    timestamp: 'Today, 12:30 pm',
    type: 'incoming',
    category: 'work',
  },
  {
    id: '5',
    title: 'Restaurant Payment',
    amount: 55,
    timestamp: 'Today, 12:30 pm',
    type: 'outgoing',
    category: 'food',
  },
];

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const [activeButton, setActiveButton] = useState<string | null>(null);
  const scaleAnim = React.useRef(new Animated.Value(1)).current;
  const bgAnim = React.useRef(new Animated.Value(0)).current;

  const handlePressIn = (buttonType: string) => {
    setActiveButton(buttonType);
    Animated.spring(scaleAnim, {
      toValue: 0.95,
      tension: 100,
      friction: 5,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      tension: 100,
      friction: 5,
      useNativeDriver: true,
    }).start(() => setActiveButton(null));
  };

  const getButtonStyle = (buttonType: string) => {
    const backgroundColor = bgAnim.interpolate({
      inputRange: [0, 1],
      outputRange: ['transparent', '#F0F7FF'],
    });

    return [
      styles.actionButton,
      { transform: [{ scale: activeButton === buttonType ? scaleAnim : 1 }] },
      activeButton === buttonType && { backgroundColor },
    ];
  };

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
      <View style={styles.mainContent}>
        <View style={styles.header}>
          <View style={styles.balanceCard}>
            <View style={styles.balanceInfo}>
              <Image
                source={require('../assets/images/avatar.png')}
                style={styles.avatar as ImageStyle}
              />
              <View style={styles.balanceTexts}>
                <Text style={styles.balanceLabel}>Total Balance</Text>
                <Text style={styles.balanceAmount}>$56,980.00</Text>
              </View>
            </View>
            <TouchableOpacity style={styles.notificationButton}>
              <FontAwesome5 name="bell" size={20} color="#000" />
            </TouchableOpacity>
          </View>

          {/* Card Section */}
          <View style={styles.cardContainer}>
            <LinearGradient
              colors={['#1A237E', '#0D47A1', '#1976D2']}
              start={{ x: 0, y: 0.2 }}
              end={{ x: 1, y: 0.8 }}
              style={styles.card}
            >
              {/* Curved Lines Pattern */}
              <View style={styles.patternContainer}>
                <View style={[styles.curveLine, styles.curveLineTop]} />
                <View style={[styles.curveLine, styles.curveLineMiddle]} />
                <View style={[styles.curveLine, styles.curveLineBottom]} />
                <View style={styles.shimmerEffect} />
              </View>

              <View style={styles.cardContent}>
                {/* Card Header */}
                <View style={styles.cardHeader}>
                  <View>
                    <Text style={styles.cardType}>Platinum</Text>
                    <Text style={styles.cardName}>Anik Deb</Text>
                  </View>
                  <Image
                    source={require('../assets/images/visa.png')}
                    style={styles.visaLogo as ImageStyle}
                  />
                </View>

                {/* Card Chip */}
                <View style={styles.chipSection}>
                  <Image
                    source={require('../assets/images/chip.png')}
                    style={styles.chipImage as ImageStyle}
                  />
                  <View style={styles.contactlessIcon}>
                    <FontAwesome5 name="wifi" size={16} color="#FFF" />
                  </View>
                </View>

                {/* Card Number and Expiry */}
                <View style={styles.cardBottom}>
                  <Text style={styles.cardNumber}>6458 6354 7909 0001</Text>
                  <View style={styles.cardFooter}>
                    <Text style={styles.validThru}>Valid Thru</Text>
                    <Text style={styles.cardExpiry}>10/25</Text>
                  </View>
                </View>
              </View>
            </LinearGradient>
          </View>

          {/* Quick Actions */}
          <View style={styles.quickActions}>
            <TouchableOpacity 
              style={styles.actionButton}
              activeOpacity={0.7}
              onPressIn={() => handlePressIn('deposit')}
              onPressOut={handlePressOut}
            >
              <Animated.View 
                style={[
                  styles.actionIcon,
                  {
                    transform: [
                      { scale: activeButton === 'deposit' ? scaleAnim : 1 }
                    ],
                    backgroundColor: activeButton === 'deposit' ? '#E3F2FD' : '#FFFFFF',
                  }
                ]}
              >
                <FontAwesome5 
                  name="arrow-down" 
                  size={14} 
                  color={activeButton === 'deposit' ? '#1976D2' : '#666666'} 
                />
              </Animated.View>
              <Text style={[
                styles.actionText,
                activeButton === 'deposit' && styles.actionTextActive
              ]}>Deposit</Text>
            </TouchableOpacity>

            <View style={styles.actionDivider} />

            <TouchableOpacity 
              style={styles.actionButton}
              activeOpacity={0.7}
              onPressIn={() => handlePressIn('withdraw')}
              onPressOut={handlePressOut}
            >
              <Animated.View 
                style={[
                  styles.actionIcon,
                  {
                    transform: [
                      { scale: activeButton === 'withdraw' ? scaleAnim : 1 }
                    ],
                    backgroundColor: activeButton === 'withdraw' ? '#E3F2FD' : '#FFFFFF',
                  }
                ]}
              >
                <FontAwesome5 
                  name="arrow-up" 
                  size={14} 
                  color={activeButton === 'withdraw' ? '#1976D2' : '#666666'} 
                />
              </Animated.View>
              <Text style={[
                styles.actionText,
                activeButton === 'withdraw' && styles.actionTextActive
              ]}>Withdraw</Text>
            </TouchableOpacity>

            <View style={styles.actionDivider} />

            <TouchableOpacity 
              style={styles.actionButton}
              activeOpacity={0.7}
              onPressIn={() => handlePressIn('transfer')}
              onPressOut={() => {
                handlePressOut();
                navigation.navigate('Transfer');
              }}
            >
              <Animated.View 
                style={[
                  styles.actionIcon,
                  {
                    transform: [
                      { scale: activeButton === 'transfer' ? scaleAnim : 1 }
                    ],
                    backgroundColor: activeButton === 'transfer' ? '#E3F2FD' : '#FFFFFF',
                  }
                ]}
              >
                <FontAwesome5 
                  name="exchange-alt" 
                  size={14} 
                  color={activeButton === 'transfer' ? '#1976D2' : '#666666'} 
                />
              </Animated.View>
              <Text style={[
                styles.actionText,
                activeButton === 'transfer' && styles.actionTextActive
              ]}>Transfer</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Transactions Section */}
        <View style={styles.transactionsContainer}>
          <View style={styles.transactionsBox}>
            <View style={styles.transactionsHeader}>
              <Text style={styles.transactionsTitle}>Transactions</Text>
              <TouchableOpacity style={styles.filterButton}>
                <FontAwesome5 name="sliders-h" size={16} color="#000" />
              </TouchableOpacity>
            </View>

            <ScrollView 
              style={styles.transactionsList}
              showsVerticalScrollIndicator={false}
            >
              {transactions.map((transaction, index) => (
                <TouchableOpacity
                  key={transaction.id}
                  style={[
                    styles.transactionItem,
                    index === transactions.length - 1 && styles.lastTransactionItem,
                  ]}
                  activeOpacity={0.7}
                >
                  <View style={styles.transactionLeft}>
                    <View
                      style={[
                        styles.transactionIcon,
                        { backgroundColor: transaction.type === 'incoming' ? '#E3F2FD' : '#FBE9E7' },
                      ]}
                    >
                      <FontAwesome5 
                        name={transaction.type === 'incoming' ? 'arrow-down' : 'arrow-up'} 
                        size={14} 
                        color={transaction.type === 'incoming' ? '#1976D2' : '#D32F2F'} 
                      />
                    </View>
                    <View style={styles.transactionInfo}>
                      <Text style={styles.transactionTitle}>
                        {transaction.title}
                      </Text>
                      <Text style={styles.transactionTime}>
                        {transaction.timestamp}
                      </Text>
                    </View>
                  </View>
                  <Text
                    style={[
                      styles.transactionAmount,
                      transaction.type === 'incoming'
                        ? styles.depositAmount
                        : styles.withdrawalAmount,
                    ]}
                  >
                    {transaction.type === 'incoming' ? '+' : '-'}$
                    {transaction.amount.toLocaleString()}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>
      </View>
      
      {/* Bottom Navigation Bar */}
      <View style={styles.navbar}>
        <TouchableOpacity style={styles.navItem} activeOpacity={0.7}>
          <FontAwesome5 name="home" size={20} color="#1976D2" />
          <Text style={[styles.navText, styles.navTextActive]}>Home</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.navItem} 
          activeOpacity={0.7}
          onPress={() => navigation.navigate('Transfer')}
        >
          <FontAwesome5 name="exchange-alt" size={20} color="#666666" />
          <Text style={styles.navText}>Transfer</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.centerButton} activeOpacity={0.9}>
          <View style={styles.plusButton}>
            <FontAwesome5 name="plus" size={20} color="#FFFFFF" />
          </View>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.navItem} 
          activeOpacity={0.7}
          onPress={() => navigation.navigate('Chat')}
        >
          <FontAwesome5 name="comment" size={20} color="#666666" />
          <Text style={styles.navText}>Chat</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.navItem} 
          activeOpacity={0.7}
          onPress={() => navigation.navigate('Profile')}
        >
          <FontAwesome5 name="user" size={20} color="#666666" />
          <Text style={styles.navText}>Profile</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBF2FC',
  },
  mainContent: {
    flex: 1,
    backgroundColor: '#EBF2FC',
    paddingBottom: Platform.OS === 'ios' ? 90 : 80,
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: Platform.OS === 'android' ? 16 : 0,
    gap: 24,
  },
  balanceCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  balanceInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    resizeMode: 'cover',
  },
  balanceTexts: {
    gap: 4,
  },
  balanceLabel: {
    fontSize: 14,
    color: '#666666',
    fontFamily: 'Inter_400Regular',
  },
  balanceAmount: {
    fontSize: 24,
    color: '#000000',
    fontFamily: 'Inter_700Bold',
  },
  notificationButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  cardContainer: {
    paddingTop: 8,
    marginBottom: -16,
  },
  card: {
    height: 220,
    borderRadius: 28,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.4,
    shadowRadius: 24,
    elevation: 12,
  },
  patternContainer: {
    position: 'absolute',
    width: '200%',
    height: '100%',
    left: '-50%',
  },
  curveLine: {
    position: 'absolute',
    width: '100%',
    height: 300,
    backgroundColor: '#ffffff',
  },
  curveLineTop: {
    top: -160,
    transform: [
      { scaleX: 1.6 },
      { rotate: '-12deg' }
    ],
    borderRadius: 150,
    opacity: 0.04,
  },
  curveLineMiddle: {
    top: -80,
    transform: [
      { scaleX: 2 },
      { rotate: '8deg' }
    ],
    borderRadius: 150,
    opacity: 0.03,
  },
  curveLineBottom: {
    top: 80,
    transform: [
      { scaleX: 1.4 },
      { rotate: '-15deg' }
    ],
    borderRadius: 150,
    opacity: 0.02,
  },
  shimmerEffect: {
    position: 'absolute',
    width: '200%',
    height: 100,
    backgroundColor: '#ffffff',
    opacity: 0.05,
    transform: [
      { rotate: '35deg' },
      { translateX: -200 },
      { translateY: 100 }
    ],
  },
  cardContent: {
    flex: 1,
    padding: 24,
    justifyContent: 'space-between',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  cardType: {
    fontSize: 12,
    color: '#FFFFFF',
    opacity: 0.8,
    fontFamily: 'Inter_500Medium',
    marginBottom: 4,
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  cardName: {
    fontSize: 20,
    color: '#FFFFFF',
    fontFamily: 'Inter_600SemiBold',
  },
  visaLogo: {
    width: 65,
    height: 22,
    resizeMode: 'contain',
  },
  chipSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginVertical: 24,
  },
  chipImage: {
    width: 45,
    height: 34,
    resizeMode: 'contain',
  },
  contactlessIcon: {
    opacity: 0.9,
    transform: [{ rotate: '90deg' }],
  },
  cardBottom: {
    flexDirection: 'column',
    gap: 12,
  },
  cardNumber: {
    fontSize: 19,
    color: '#FFFFFF',
    fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
    letterSpacing: 2.5,
  },
  cardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  validThru: {
    fontSize: 10,
    color: '#FFFFFF',
    opacity: 0.7,
    fontFamily: 'Inter_400Regular',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  cardExpiry: {
    fontSize: 16,
    color: '#FFFFFF',
    fontFamily: 'Inter_600SemiBold',
  },
  quickActions: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 10,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    shadowColor: '#1976D2',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  actionButton: {
    alignItems: 'center',
    flex: 1,
    paddingVertical: 2,
  },
  actionIcon: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
    shadowColor: '#1976D2',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  actionText: {
    fontSize: 11,
    color: '#666666',
    fontFamily: 'Inter_500Medium',
  },
  actionTextActive: {
    color: '#1976D2',
  },
  actionDivider: {
    width: 1,
    height: 20,
    backgroundColor: '#F0F0F0',
    marginHorizontal: 10,
  },
  transactionsContainer: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 24,
  },
  transactionsBox: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  transactionsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  transactionsTitle: {
    fontSize: 20,
    fontFamily: 'Inter_600SemiBold',
    color: '#000000',
  },
  filterButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#F8F8F8',
    alignItems: 'center',
    justifyContent: 'center',
  },
  transactionsList: {
    maxHeight: '100%',
  },
  transactionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 4,
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F5',
  },
  lastTransactionItem: {
    borderBottomWidth: 0,
  },
  transactionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  transactionIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  transactionInfo: {
    gap: 4,
  },
  transactionTitle: {
    fontSize: 16,
    fontFamily: 'Inter_500Medium',
    color: '#000000',
  },
  transactionTime: {
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    color: '#666666',
  },
  transactionAmount: {
    fontSize: 16,
    fontFamily: 'Inter_600SemiBold',
  },
  depositAmount: {
    color: '#2E7D32',
  },
  withdrawalAmount: {
    color: '#D32F2F',
  },
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: Platform.OS === 'ios' ? 34 : 16,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    gap: 4,
  },
  navText: {
    fontSize: 12,
    color: '#666666',
    fontFamily: 'Inter_500Medium',
  },
  navTextActive: {
    color: '#1976D2',
  },
  centerButton: {
    flex: 1,
    alignItems: 'center',
    marginTop: -40,
  },
  plusButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#1976D2',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#1976D2',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
});

export default HomeScreen; 