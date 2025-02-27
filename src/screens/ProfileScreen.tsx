import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  TouchableOpacity,
  Platform,
  ScrollView,
  ImageStyle,
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

type ProfileScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Profile'>;
};

type MenuItemProps = {
  icon: string;
  label: string;
  value?: string;
  color?: string;
  onPress?: () => void;
};

const MenuItem: React.FC<MenuItemProps> = ({ icon, label, value, color = '#666666', onPress }) => (
  <TouchableOpacity style={styles.menuItem} onPress={onPress} activeOpacity={0.7}>
    <View style={styles.menuItemLeft}>
      <View style={[styles.menuIcon, { backgroundColor: `${color}15` }]}>
        <FontAwesome5 name={icon} size={16} color={color} />
      </View>
      <Text style={styles.menuLabel}>{label}</Text>
    </View>
    <View style={styles.menuItemRight}>
      {value && <Text style={styles.menuValue}>{value}</Text>}
      <FontAwesome5 name="chevron-right" size={14} color="#999999" />
    </View>
  </TouchableOpacity>
);

const ProfileScreen: React.FC<ProfileScreenProps> = ({ navigation }) => {
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
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerTop}>
            <TouchableOpacity 
              style={styles.backButton}
              onPress={() => navigation.goBack()}
            >
              <FontAwesome5 name="arrow-left" size={20} color="#000000" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Profile</Text>
            <TouchableOpacity style={styles.editButton}>
              <FontAwesome5 name="edit" size={20} color="#1976D2" />
            </TouchableOpacity>
          </View>

          <View style={styles.profileInfo}>
            <Image
              source={require('../assets/images/avatar.png')}
              style={styles.avatar as ImageStyle}
            />
            <Text style={styles.userName}>Anik Deb</Text>
            <Text style={styles.userEmail}>anikdeb@gmail.com</Text>
          </View>
        </View>

        {/* Account Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account</Text>
          <View style={styles.menuGroup}>
            <MenuItem 
              icon="user-circle" 
              label="Personal Information" 
              color="#1976D2"
            />
            <MenuItem 
              icon="shield-alt" 
              label="Security" 
              color="#2E7D32"
            />
            <MenuItem 
              icon="bell" 
              label="Notifications" 
              color="#D32F2F"
            />
          </View>
        </View>

        {/* Preferences Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Preferences</Text>
          <View style={styles.menuGroup}>
            <MenuItem 
              icon="globe" 
              label="Language" 
              value="English" 
              color="#1976D2"
            />
            <MenuItem 
              icon="moon" 
              label="Dark Mode" 
              value="Off" 
              color="#673AB7"
            />
            <MenuItem 
              icon="dollar-sign" 
              label="Currency" 
              value="USD" 
              color="#2E7D32"
            />
          </View>
        </View>

        {/* More Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>More</Text>
          <View style={styles.menuGroup}>
            <MenuItem 
              icon="headset" 
              label="Help & Support" 
              color="#1976D2"
            />
            <MenuItem 
              icon="file-alt" 
              label="Terms and Policies" 
              color="#FF9800"
            />
            <MenuItem 
              icon="info-circle" 
              label="About" 
              color="#2E7D32"
            />
          </View>
        </View>

        {/* Logout Button */}
        <TouchableOpacity style={styles.logoutButton} activeOpacity={0.9}>
          <FontAwesome5 name="sign-out-alt" size={18} color="#D32F2F" />
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBF2FC',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: Platform.OS === 'android' ? 16 : 0,
    paddingBottom: 24,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  headerTitle: {
    fontSize: 20,
    fontFamily: 'Inter_600SemiBold',
    color: '#000000',
  },
  backButton: {
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
  editButton: {
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
  profileInfo: {
    alignItems: 'center',
    gap: 8,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 8,
  },
  userName: {
    fontSize: 24,
    fontFamily: 'Inter_600SemiBold',
    color: '#000000',
  },
  userEmail: {
    fontSize: 16,
    fontFamily: 'Inter_400Regular',
    color: '#666666',
  },
  section: {
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Inter_600SemiBold',
    color: '#000000',
    marginBottom: 16,
  },
  menuGroup: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    overflow: 'hidden',
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F5',
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  menuIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuLabel: {
    fontSize: 16,
    fontFamily: 'Inter_500Medium',
    color: '#000000',
  },
  menuItemRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  menuValue: {
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    color: '#666666',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    marginBottom: Platform.OS === 'ios' ? 34 : 24,
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#FFE5E5',
  },
  logoutText: {
    fontSize: 16,
    fontFamily: 'Inter_600SemiBold',
    color: '#D32F2F',
  },
});

export default ProfileScreen; 