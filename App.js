import React, { useState, useRef, createContext, useContext } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from './src/constants/theme';
import DrawerMenu from './src/components/DrawerMenu';

import HomeScreen from './src/screens/HomeScreen';
import LiveScreen from './src/screens/LiveScreen';
import SermonsScreen from './src/screens/SermonsScreen';
import DonateScreen from './src/screens/DonateScreen';
import MoreScreen from './src/screens/MoreScreen';
import EventsScreen from './src/screens/EventsScreen';
import PrayerScreen from './src/screens/PrayerScreen';
import AboutScreen from './src/screens/AboutScreen';
import PastorScreen from './src/screens/PastorScreen';
import ContactScreen from './src/screens/ContactScreen';
import ConnectionScreen from './src/screens/ConnectionScreen';
import PastSermonsScreen from './src/screens/PastSermonsScreen';

const DrawerContext = createContext();
export const useDrawer = () => useContext(DrawerContext);

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function HeaderMenuButton() {
  const { openDrawer } = useDrawer();
  return (
    <TouchableOpacity onPress={openDrawer} style={{ marginLeft: 10, padding: 4 }}>
      <Ionicons name="menu" size={26} color={COLORS.textWhite} />
    </TouchableOpacity>
  );
}

function MoreStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: COLORS.primary },
        headerTintColor: COLORS.textWhite,
        headerTitleStyle: { fontWeight: '700' },
        headerLeft: () => <HeaderMenuButton />,
      }}
    >
      <Stack.Screen name="MoreMenu" component={MoreScreen} options={{ title: 'More' }} />
      <Stack.Screen name="Events" component={EventsScreen} options={{ title: 'Events & Calendar' }} />
      <Stack.Screen name="Prayer" component={PrayerScreen} options={{ title: 'Prayer Request' }} />
      <Stack.Screen name="About" component={AboutScreen} options={{ title: 'About Us' }} />
      <Stack.Screen name="Pastor" component={PastorScreen} options={{ title: 'About Our Pastor' }} />
      <Stack.Screen name="Contact" component={ContactScreen} options={{ title: 'Contact Us' }} />
      <Stack.Screen name="Connection" component={ConnectionScreen} options={{ title: 'Connection Card' }} />
      <Stack.Screen name="PastSermons" component={PastSermonsScreen} options={{ title: 'Past Sermons' }} />
    </Stack.Navigator>
  );
}

export default function App() {
  const [drawerVisible, setDrawerVisible] = useState(false);
  const navigationRef = useRef(null);

  const drawerContext = {
    openDrawer: () => setDrawerVisible(true),
    closeDrawer: () => setDrawerVisible(false),
  };

  return (
    <DrawerContext.Provider value={drawerContext}>
      <NavigationContainer ref={navigationRef}>
        <StatusBar style="light" />
        <View style={{ flex: 1 }}>
          <Tab.Navigator
            screenOptions={({ route }) => ({
              headerStyle: { backgroundColor: COLORS.primary },
              headerTintColor: COLORS.textWhite,
              headerTitleStyle: { fontWeight: '700' },
              headerLeft: () => <HeaderMenuButton />,
              tabBarActiveTintColor: COLORS.secondary,
              tabBarInactiveTintColor: COLORS.tabInactive,
              tabBarStyle: {
                backgroundColor: '#fff',
                borderTopColor: '#eee',
                paddingBottom: 5,
                paddingTop: 5,
                height: 60,
              },
              tabBarIcon: ({ focused, color, size }) => {
                let iconName;
                if (route.name === 'Home') iconName = focused ? 'home' : 'home-outline';
                else if (route.name === 'Live') iconName = focused ? 'play-circle' : 'play-circle-outline';
                else if (route.name === 'Sermons') iconName = focused ? 'videocam' : 'videocam-outline';
                else if (route.name === 'Give') iconName = focused ? 'heart' : 'heart-outline';
                else if (route.name === 'MoreTab') iconName = focused ? 'menu' : 'menu-outline';
                return <Ionicons name={iconName} size={size} color={color} />;
              },
            })}
          >
            <Tab.Screen name="Home" component={HomeScreen} options={{ title: 'Home' }} />
            <Tab.Screen name="Live" component={LiveScreen} options={{ title: 'Live' }} />
            <Tab.Screen name="Sermons" component={SermonsScreen} options={{ title: 'Sermons' }} />
            <Tab.Screen name="Give" component={DonateScreen} options={{ title: 'Give' }} />
            <Tab.Screen
              name="MoreTab"
              component={MoreStack}
              options={{ title: 'More', headerShown: false }}
            />
          </Tab.Navigator>

          <DrawerMenu
            visible={drawerVisible}
            onClose={() => setDrawerVisible(false)}
            navigation={navigationRef.current}
          />
        </View>
      </NavigationContainer>
    </DrawerContext.Provider>
  );
}
