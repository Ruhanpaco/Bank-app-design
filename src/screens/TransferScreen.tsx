import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
  ImageStyle,
  ScrollView,
  Platform,
  StatusBar,
  Dimensions,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import {
  useFonts,
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
} from '@expo-google-fonts/inter';

type TransferScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Transfer'>;
};

type Beneficiary = {
  id: string;
  name: string;
  avatar: string;
  selected?: boolean;
};

const beneficiaries: Beneficiary[] = [
  {
    id: 'new',
    name: 'Add New',
    avatar: 'plus',
  },
  {
    id: '1',
    name: 'Theresa Webb',
    avatar: 'avatar1',
  },
  {
    id: '2',
    name: 'Kathryn Murphy',
    avatar: 'avatar2',
    selected: true,
  },
  {
    id: '3',
    name: 'Kristin Watson',
    avatar: 'avatar3',
  },
  {
    id: '4',
    name: 'Esther Howard',
    avatar: 'avatar4',
  },
];

const { width } = Dimensions.get('window');

const generateTransactionId = () => {
  return 'TXN' + Math.random().toString(36).substr(2, 9).toUpperCase();
};

const getCurrentDateTime = () => {
  return new Date().toLocaleString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true
  });
};

const getRandomFailureReason = () => {
  const reasons = [
    'Insufficient funds',
    'Network error',
    'Bank server timeout',
    'Transaction limit exceeded',
    'Security verification required'
  ];
  return reasons[Math.floor(Math.random() * reasons.length)];
};

const TransferScreen: React.FC<TransferScreenProps> = ({ navigation }) => {
  const [amount, setAmount] = useState('');
  const [selectedBeneficiary, setSelectedBeneficiary] = useState('2');
  const balance = 56980.00;

  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
  });

  if (!fontsLoaded) {
    return null;
  }

  const handleNumberPress = (num: string) => {
    if (amount.includes('.') && amount.split('.')[1]?.length >= 2) {
      return;
    }
    setAmount(prev => {
      if (num === '.' && prev.includes('.')) {
        return prev;
      }
      if (num === '.' && prev === '') {
        return '0.';
      }
      const newAmount = prev + num;
      if (parseFloat(newAmount) > balance) {
        return prev;
      }
      return newAmount;
    });
  };

  const handleDelete = () => {
    setAmount(prev => prev.slice(0, -1));
  };

  const handleSend = () => {
    const isSuccess = Math.random() > 0.3; // 70% success rate
    const selectedBeneficiaryData = beneficiaries.find(b => b.id === selectedBeneficiary);

    navigation.navigate('TransactionDetail', {
      status: isSuccess ? 'success' : 'failed',
      amount: parseFloat(amount),
      beneficiary: {
        name: selectedBeneficiaryData?.name || '',
        avatar: selectedBeneficiaryData?.avatar || '',
      },
      transactionId: generateTransactionId(),
      date: getCurrentDateTime(),
      reason: isSuccess ? undefined : getRandomFailureReason(),
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <FontAwesome5 name="arrow-left" size={20} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Send Money</Text>
        <View style={styles.backButton} />
      </View>

      {/* Beneficiaries */}
      <View style={styles.beneficiarySection}>
        <View style={styles.beneficiaryHeader}>
          <Text style={styles.beneficiaryTitle}>Beneficiary</Text>
          <TouchableOpacity style={styles.searchButton}>
            <FontAwesome5 name="search" size={20} color="#000" />
          </TouchableOpacity>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.beneficiaryList}
          contentContainerStyle={styles.beneficiaryContent}
        >
          {beneficiaries.map(beneficiary => (
            <TouchableOpacity
              key={beneficiary.id}
              style={[
                styles.beneficiaryItem,
                beneficiary.id === selectedBeneficiary && styles.beneficiaryItemSelected,
              ]}
              onPress={() => setSelectedBeneficiary(beneficiary.id)}
            >
              {beneficiary.id === 'new' ? (
                <View style={styles.addNewButton}>
                  <FontAwesome5 name="plus" size={24} color="#1976D2" />
                </View>
              ) : (
                <Image
                  source={require('../assets/images/avatar.png')}
                  style={styles.beneficiaryAvatar as ImageStyle}
                />
              )}
              <Text style={[
                styles.beneficiaryName,
                beneficiary.id === selectedBeneficiary && styles.beneficiaryNameSelected,
              ]}>
                {beneficiary.name}
              </Text>
              {beneficiary.id === selectedBeneficiary && (
                <View style={styles.selectedIndicator} />
              )}
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Amount Input */}
      <View style={styles.amountSection}>
        <Text style={styles.amountLabel}>Amount</Text>
        <Text style={styles.amountDisplay}>
          <Text style={styles.currencySymbol}>$</Text>
          {amount || '0'}
          {!amount.includes('.') && '.00'}
        </Text>
        <Text style={[
          styles.balanceText,
          parseFloat(amount || '0') > balance && styles.balanceExceeded
        ]}>
          Available balance: ${balance.toLocaleString()}
        </Text>
      </View>

      {/* Keypad */}
      <View style={styles.keypad}>
        {[['1', '2', '3'], ['4', '5', '6'], ['7', '8', '9'], ['.', '0', 'delete']].map((row, i) => (
          <View key={i} style={styles.keypadRow}>
            {row.map(key => (
              <TouchableOpacity
                key={key}
                style={[
                  styles.keypadButton,
                  key === 'delete' && styles.keypadButtonDelete
                ]}
                onPress={() => key === 'delete' ? handleDelete() : handleNumberPress(key)}
              >
                {key === 'delete' ? (
                  <FontAwesome5 name="backspace" size={24} color="#666666" />
                ) : (
                  <Text style={styles.keypadButtonText}>{key}</Text>
                )}
              </TouchableOpacity>
            ))}
          </View>
        ))}
      </View>

      {/* Send Button */}
      <View style={styles.bottomSection}>
        <TouchableOpacity
          style={[
            styles.sendButton,
            (!amount || parseFloat(amount) === 0 || parseFloat(amount) > balance) && styles.sendButtonDisabled
          ]}
          onPress={handleSend}
          disabled={!amount || parseFloat(amount) === 0 || parseFloat(amount) > balance}
        >
          <Text style={styles.sendButtonText}>
            Send ${parseFloat(amount || '0').toFixed(2)}
          </Text>
        </TouchableOpacity>
      </View>
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
  beneficiarySection: {
    paddingTop: 24,
    paddingBottom: 24,
    backgroundColor: '#FFFFFF',
  },
  beneficiaryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  beneficiaryTitle: {
    fontSize: 17,
    fontFamily: 'Inter_600SemiBold',
    color: '#000000',
  },
  searchButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  beneficiaryList: {
    flexGrow: 0,
  },
  beneficiaryContent: {
    paddingHorizontal: 16,
    gap: 24,
  },
  beneficiaryItem: {
    alignItems: 'center',
    width: 72,
  },
  beneficiaryItemSelected: {
    transform: [{scale: 1}],
  },
  addNewButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#E3F2FD',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  beneficiaryAvatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    marginBottom: 8,
  },
  beneficiaryName: {
    fontSize: 12,
    fontFamily: 'Inter_500Medium',
    color: '#666666',
    textAlign: 'center',
  },
  beneficiaryNameSelected: {
    color: '#1976D2',
    fontFamily: 'Inter_600SemiBold',
  },
  selectedIndicator: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#1976D2',
    marginTop: 4,
  },
  amountSection: {
    alignItems: 'center',
    paddingVertical: 20,
    backgroundColor: '#F8FAFD',
    marginHorizontal: 16,
    borderRadius: 12,
    marginBottom: 24,
  },
  amountLabel: {
    fontSize: 13,
    fontFamily: 'Inter_500Medium',
    color: '#666666',
    marginBottom: 8,
  },
  amountDisplay: {
    fontSize: 40,
    fontFamily: 'Inter_700Bold',
    color: '#000000',
    marginBottom: 8,
    lineHeight: 48,
  },
  currencySymbol: {
    fontSize: 40,
    fontFamily: 'Inter_700Bold',
    color: '#000000',
  },
  balanceText: {
    fontSize: 12,
    fontFamily: 'Inter_400Regular',
    color: '#666666',
  },
  balanceExceeded: {
    color: '#D32F2F',
  },
  keypad: {
    paddingHorizontal: 16,
    paddingTop: 8,
    flex: 1,
  },
  keypadRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  keypadButton: {
    width: '30%',
    aspectRatio: 2.2,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  keypadButtonDelete: {
    borderColor: 'transparent',
    backgroundColor: '#F5F5F5',
  },
  keypadButtonText: {
    fontSize: 17,
    fontFamily: 'Inter_600SemiBold',
    color: '#000000',
  },
  bottomSection: {
    padding: 16,
    paddingBottom: Platform.OS === 'ios' ? 34 : 16,
  },
  sendButton: {
    backgroundColor: '#1976D2',
    borderRadius: 12,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendButtonDisabled: {
    backgroundColor: '#E0E0E0',
  },
  sendButtonText: {
    fontSize: 15,
    fontFamily: 'Inter_600SemiBold',
    color: '#FFFFFF',
  },
});

export default TransferScreen; 