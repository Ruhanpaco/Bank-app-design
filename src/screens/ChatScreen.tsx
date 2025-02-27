import React, { useState } from 'react';
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
  TextInput,
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

type ChatScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Chat'>;
};

type SupportAgent = {
  id: string;
  name: string;
  role: string;
  avatar: string;
  online: boolean;
  lastMessage?: string;
  lastMessageTime?: string;
};

const supportAgents: SupportAgent[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    role: 'Financial Advisor',
    avatar: 'avatar1',
    online: true,
    lastMessage: 'Hello! How can I help you today?',
    lastMessageTime: '2m ago',
  },
  {
    id: '2',
    name: 'Michael Chen',
    role: 'Account Manager',
    avatar: 'avatar2',
    online: true,
    lastMessage: 'Your account has been updated',
    lastMessageTime: '1h ago',
  },
  {
    id: '3',
    name: 'Emma Wilson',
    role: 'Support Specialist',
    avatar: 'avatar3',
    online: false,
    lastMessage: 'Thank you for your patience',
    lastMessageTime: '2h ago',
  },
  {
    id: '4',
    name: 'James Rodriguez',
    role: 'Investment Advisor',
    avatar: 'avatar4',
    online: false,
    lastMessage: 'Let me check that for you',
    lastMessageTime: '1d ago',
  },
];

const ChatScreen: React.FC<ChatScreenProps> = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
  });

  if (!fontsLoaded) {
    return null;
  }

  const filteredAgents = supportAgents.filter(agent =>
    agent.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.mainContent}>
        <View style={styles.header}>
          <View style={styles.headerTop}>
            <Text style={styles.headerTitle}>Messages</Text>
            <TouchableOpacity style={styles.settingsButton}>
              <FontAwesome5 name="ellipsis-h" size={20} color="#1976D2" />
            </TouchableOpacity>
          </View>

          {/* Search Bar */}
          <View style={styles.searchContainer}>
            <FontAwesome5 name="search" size={16} color="#666666" style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search messages"
              placeholderTextColor="#666666"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
        </View>

        {/* Support Team Section */}
        <View style={styles.supportTeamSection}>
          <Text style={styles.sectionTitle}>Support Team</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.agentsScrollView}
            contentContainerStyle={styles.agentsContainer}
          >
            {supportAgents.map(agent => (
              <TouchableOpacity
                key={agent.id}
                style={styles.agentCard}
                activeOpacity={0.7}
              >
                <View style={styles.avatarContainer}>
                  <Image
                    source={require('../assets/images/avatar.png')}
                    style={styles.agentAvatar as ImageStyle}
                  />
                  {agent.online && <View style={styles.onlineIndicator} />}
                </View>
                <Text style={styles.agentName}>{agent.name.split(' ')[0]}</Text>
                <Text style={styles.agentRole}>{agent.role}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Recent Chats */}
        <View style={styles.recentChatsSection}>
          <Text style={styles.sectionTitle}>Recent Chats</Text>
          <ScrollView showsVerticalScrollIndicator={false}>
            {filteredAgents.map(agent => (
              <View
                key={agent.id}
                style={styles.chatItem}
              >
                <View style={styles.chatItemLeft}>
                  <View style={styles.chatAvatarContainer}>
                    <Image
                      source={require('../assets/images/avatar.png')}
                      style={styles.chatAvatar as ImageStyle}
                    />
                    {agent.online && <View style={styles.chatOnlineIndicator} />}
                  </View>
                  <View style={styles.chatInfo}>
                    <Text style={styles.chatName}>{agent.name}</Text>
                    <Text style={styles.lastMessage}>{agent.lastMessage}</Text>
                  </View>
                </View>
                <View style={styles.chatItemRight}>
                  <Text style={styles.messageTime}>{agent.lastMessageTime}</Text>
                </View>
              </View>
            ))}
          </ScrollView>
        </View>
      </View>

      {/* Bottom Navigation Bar */}
      <View style={styles.navbar}>
        <TouchableOpacity 
          style={styles.navItem} 
          activeOpacity={0.7}
          onPress={() => navigation.navigate('Home')}
        >
          <FontAwesome5 name="home" size={20} color="#666666" />
          <Text style={styles.navText}>Home</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.navItem} 
          activeOpacity={0.7}
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
        >
          <FontAwesome5 name="comment" size={20} color="#1976D2" />
          <Text style={[styles.navText, styles.navTextActive]}>Chat</Text>
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
    paddingBottom: Platform.OS === 'ios' ? 90 : 80,
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: Platform.OS === 'android' ? 16 : 0,
    paddingBottom: 16,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 24,
    fontFamily: 'Inter_600SemiBold',
    color: '#000000',
  },
  settingsButton: {
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
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingHorizontal: 16,
    height: 50,
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    fontFamily: 'Inter_400Regular',
    color: '#000000',
  },
  supportTeamSection: {
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Inter_600SemiBold',
    color: '#000000',
    marginBottom: 16,
  },
  agentsScrollView: {
    marginHorizontal: -16,
  },
  agentsContainer: {
    paddingHorizontal: 16,
    gap: 16,
  },
  agentCard: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    width: 120,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 8,
  },
  agentAvatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
  },
  onlineIndicator: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: '#2E7D32',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  agentName: {
    fontSize: 14,
    fontFamily: 'Inter_600SemiBold',
    color: '#000000',
    marginBottom: 4,
  },
  agentRole: {
    fontSize: 12,
    fontFamily: 'Inter_400Regular',
    color: '#666666',
    textAlign: 'center',
  },
  recentChatsSection: {
    flex: 1,
    paddingHorizontal: 16,
  },
  chatItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 12,
    marginBottom: 12,
  },
  chatItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  chatAvatarContainer: {
    position: 'relative',
    marginRight: 12,
  },
  chatAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  chatOnlineIndicator: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#2E7D32',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  chatInfo: {
    flex: 1,
  },
  chatName: {
    fontSize: 16,
    fontFamily: 'Inter_600SemiBold',
    color: '#000000',
    marginBottom: 4,
  },
  lastMessage: {
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    color: '#666666',
  },
  chatItemRight: {
    alignItems: 'flex-end',
  },
  messageTime: {
    fontSize: 12,
    fontFamily: 'Inter_400Regular',
    color: '#666666',
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

export default ChatScreen; 