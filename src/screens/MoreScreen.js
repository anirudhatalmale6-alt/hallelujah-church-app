import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Linking, Share } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, CHURCH } from '../constants/theme';

const PLAY_STORE_URL = 'https://play.google.com/store/apps/details?id=org.hallelujahinthecity.app';

const MenuItem = ({ icon, label, onPress, color }) => (
  <TouchableOpacity style={styles.menuItem} onPress={onPress}>
    <View style={[styles.menuIcon, color && { backgroundColor: color }]}>
      <Ionicons name={icon} size={22} color="#fff" />
    </View>
    <Text style={styles.menuLabel}>{label}</Text>
    <Ionicons name="chevron-forward" size={20} color={COLORS.textLight} />
  </TouchableOpacity>
);

export default function MoreScreen({ navigation }) {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{CHURCH.name}</Text>
        <Text style={styles.headerSub}>{CHURCH.address}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Church</Text>
        <MenuItem icon="calendar" label="Events & Calendar" onPress={() => navigation.navigate('Events')} color="#4CAF50" />
        <MenuItem icon="hand-left" label="Prayer Request" onPress={() => navigation.navigate('Prayer')} color="#9C27B0" />
        <MenuItem icon="videocam" label="Past Sermons" onPress={() => navigation.navigate('PastSermons')} color="#673AB7" />
        <MenuItem icon="radio" label="Radio Alelouya Nan Vil La" onPress={() => navigation.navigate('Radio')} color="#E91E63" />
        <MenuItem icon="information-circle" label="About Us" onPress={() => navigation.navigate('About')} color="#2196F3" />
        <MenuItem icon="person" label="About Our Pastor" onPress={() => navigation.navigate('Pastor')} color="#FF9800" />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Connect</Text>
        <MenuItem icon="chatbubble-ellipses" label="Contact Us" onPress={() => navigation.navigate('Contact')} color="#E91E63" />
        <MenuItem icon="people" label="Connection Card" onPress={() => navigation.navigate('Connection')} color="#00BCD4" />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Follow Us</Text>
        <MenuItem icon="logo-facebook" label="Facebook" onPress={() => Linking.openURL(CHURCH.facebook)} color="#1877F2" />
        <MenuItem icon="logo-youtube" label="YouTube" onPress={() => Linking.openURL(CHURCH.youtube)} color="#FF0000" />
        <MenuItem icon="globe" label="Website" onPress={() => Linking.openURL(CHURCH.website)} color={COLORS.primary} />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Contact</Text>
        <MenuItem icon="call" label={CHURCH.phone} onPress={() => Linking.openURL(`tel:${CHURCH.phone.replace(/[^\d]/g, '')}`)} color="#4CAF50" />
        <MenuItem icon="mail" label={CHURCH.email} onPress={() => Linking.openURL(`mailto:${CHURCH.email}`)} color="#F44336" />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Share</Text>
        <MenuItem icon="share-social" label="Share This App" onPress={() => Share.share({ message: `Download the ${CHURCH.name} app - ${CHURCH.tagline}\n${PLAY_STORE_URL}` })} color="#8b6914" />
      </View>

      <Text style={styles.version}>Hallelujah In The City App v2.4.5</Text>
      <View style={{ height: 20 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.primary },
  content: { paddingBottom: 20 },
  header: {
    backgroundColor: COLORS.primary,
    paddingVertical: 20,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  headerTitle: { fontSize: 20, fontWeight: '800', color: COLORS.textWhite },
  headerSub: { fontSize: 14, color: 'rgba(255,255,255,0.7)', marginTop: 3 },
  section: { marginTop: 15, marginHorizontal: 15 },
  sectionTitle: {
    fontSize: 13, fontWeight: '700', color: '#d4a853',
    textTransform: 'uppercase', letterSpacing: 1, marginBottom: 8, marginLeft: 5,
  },
  menuItem: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff',
    paddingVertical: 14, paddingHorizontal: 15, borderRadius: 10,
    marginBottom: 2, shadowColor: '#000', shadowOffset: { width: 0, height: 0.5 },
    shadowOpacity: 0.05, shadowRadius: 1, elevation: 1,
  },
  menuIcon: {
    width: 36, height: 36, borderRadius: 8, backgroundColor: COLORS.primary,
    justifyContent: 'center', alignItems: 'center', marginRight: 12,
  },
  menuLabel: { flex: 1, fontSize: 15, fontWeight: '600', color: COLORS.text },
  version: { textAlign: 'center', color: 'rgba(255,255,255,0.5)', fontSize: 12, marginTop: 20 },
});
