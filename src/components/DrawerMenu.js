import React, { useRef, useEffect } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, Animated, Dimensions,
  TouchableWithoutFeedback, Image, Linking, ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, CHURCH } from '../constants/theme';

const DRAWER_WIDTH = Dimensions.get('window').width * 0.8;

const DrawerItem = ({ icon, label, onPress, color }) => (
  <TouchableOpacity style={styles.drawerItem} onPress={onPress}>
    <Ionicons name={icon} size={22} color={color || COLORS.secondary} />
    <Text style={styles.drawerItemText}>{label}</Text>
  </TouchableOpacity>
);

export default function DrawerMenu({ visible, onClose, navigation }) {
  const slideAnim = useRef(new Animated.Value(-DRAWER_WIDTH)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 280,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 280,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: -DRAWER_WIDTH,
          duration: 250,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 250,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [visible]);

  const navigateTo = (tab, screen) => {
    onClose();
    if (screen) {
      navigation.navigate(tab, { screen });
    } else {
      navigation.navigate(tab);
    }
  };

  if (!visible) return null;

  return (
    <View style={styles.overlay}>
      <TouchableWithoutFeedback onPress={onClose}>
        <Animated.View style={[styles.backdrop, { opacity: fadeAnim }]} />
      </TouchableWithoutFeedback>

      <Animated.View style={[styles.drawer, { transform: [{ translateX: slideAnim }] }]}>
        <View style={styles.drawerHeader}>
          <View style={styles.logoCircle}>
            <Ionicons name="church" size={32} color={COLORS.secondary} />
          </View>
          <Text style={styles.drawerTitle}>{CHURCH.name}</Text>
          <Text style={styles.drawerSub}>{CHURCH.tagline}</Text>
        </View>

        <ScrollView style={styles.drawerBody} showsVerticalScrollIndicator={false}>
          <DrawerItem icon="home" label="Home" onPress={() => navigateTo('Home')} />
          <DrawerItem icon="play-circle" label="Watch Live" onPress={() => navigateTo('Live')} />
          <DrawerItem icon="videocam" label="Sermons" onPress={() => navigateTo('Sermons')} />
          <DrawerItem icon="heart" label="Give / Donate" onPress={() => navigateTo('Give')} />

          <View style={styles.divider} />

          <DrawerItem icon="film" label="Past Sermons" onPress={() => navigateTo('MoreTab', 'PastSermons')} />
          <DrawerItem icon="calendar" label="Events & Calendar" onPress={() => navigateTo('MoreTab', 'Events')} />
          <DrawerItem icon="hand-left" label="Prayer Request" onPress={() => navigateTo('MoreTab', 'Prayer')} />
          <DrawerItem icon="people" label="Connection Card" onPress={() => navigateTo('MoreTab', 'Connection')} />

          <View style={styles.divider} />

          <DrawerItem icon="information-circle" label="About Us" onPress={() => navigateTo('MoreTab', 'About')} />
          <DrawerItem icon="person" label="About Our Pastor" onPress={() => navigateTo('MoreTab', 'Pastor')} />
          <DrawerItem icon="chatbubble-ellipses" label="Contact Us" onPress={() => navigateTo('MoreTab', 'Contact')} />

          <View style={styles.divider} />

          <DrawerItem icon="logo-facebook" label="Facebook" color="#1877F2" onPress={() => { onClose(); Linking.openURL(CHURCH.facebook); }} />
          <DrawerItem icon="logo-youtube" label="YouTube" color="#FF0000" onPress={() => { onClose(); Linking.openURL(CHURCH.youtube); }} />
          <DrawerItem icon="globe" label="Website" color={COLORS.primary} onPress={() => { onClose(); Linking.openURL(CHURCH.website); }} />

          <View style={{ height: 30 }} />
        </ScrollView>

        <View style={styles.drawerFooter}>
          <Text style={styles.footerText}>{CHURCH.phone}</Text>
          <Text style={styles.footerTextSmall}>{CHURCH.address}</Text>
        </View>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1000,
  },
  backdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  drawer: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    width: DRAWER_WIDTH,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 0 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 20,
  },
  drawerHeader: {
    backgroundColor: COLORS.primary,
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  logoCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(255,255,255,0.15)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  drawerTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: COLORS.textWhite,
    textAlign: 'center',
  },
  drawerSub: {
    fontSize: 13,
    color: '#d4a853',
    fontWeight: '600',
    marginTop: 3,
  },
  drawerBody: {
    flex: 1,
    paddingTop: 10,
  },
  drawerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 20,
    gap: 15,
  },
  drawerItemText: {
    fontSize: 15,
    fontWeight: '600',
    color: COLORS.text,
  },
  divider: {
    height: 1,
    backgroundColor: '#eee',
    marginHorizontal: 20,
    marginVertical: 8,
  },
  drawerFooter: {
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.primary,
  },
  footerTextSmall: {
    fontSize: 11,
    color: COLORS.textLight,
    marginTop: 2,
    textAlign: 'center',
  },
});
