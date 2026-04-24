import React from 'react';
import {
  View, Text, ScrollView, StyleSheet, Image, TouchableOpacity, Linking,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, CHURCH } from '../constants/theme';

const QuickLink = ({ icon, label, onPress }) => (
  <TouchableOpacity style={styles.quickLink} onPress={onPress}>
    <View style={styles.quickIcon}>
      <Ionicons name={icon} size={28} color={COLORS.textWhite} />
    </View>
    <Text style={styles.quickLabel}>{label}</Text>
  </TouchableOpacity>
);

export default function HomeScreen({ navigation }) {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Hero Section */}
      <View style={styles.hero}>
        <Text style={styles.heroTitle}>{CHURCH.name}</Text>
        <Text style={styles.heroSubtitle}>{CHURCH.tagline}</Text>
        <Text style={styles.heroVerse}>
          "For where two or three gather in my name, there am I with them."{'\n'}
          — Matthew 18:20
        </Text>
      </View>

      {/* Service Times */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Service Times</Text>
        <View style={styles.serviceRow}>
          <Ionicons name="calendar-outline" size={20} color={COLORS.secondary} />
          <View style={styles.serviceInfo}>
            <Text style={styles.serviceDay}>Sunday 1st Service</Text>
            <Text style={styles.serviceTime}>8:00 AM</Text>
          </View>
        </View>
        <View style={styles.serviceRow}>
          <Ionicons name="calendar-outline" size={20} color={COLORS.secondary} />
          <View style={styles.serviceInfo}>
            <Text style={styles.serviceDay}>Sunday 2nd Service</Text>
            <Text style={styles.serviceTime}>11:00 AM</Text>
          </View>
        </View>
        <View style={styles.serviceRow}>
          <Ionicons name="calendar-outline" size={20} color={COLORS.secondary} />
          <View style={styles.serviceInfo}>
            <Text style={styles.serviceDay}>Tuesday Bible Study</Text>
            <Text style={styles.serviceTime}>7:00 PM</Text>
          </View>
        </View>
        <View style={styles.serviceRow}>
          <Ionicons name="calendar-outline" size={20} color={COLORS.secondary} />
          <View style={styles.serviceInfo}>
            <Text style={styles.serviceDay}>Thursday Fasting - Prayer</Text>
            <Text style={styles.serviceTime}>9:00 AM</Text>
          </View>
        </View>
      </View>

      {/* Quick Links */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Quick Links</Text>
        <View style={styles.quickGrid}>
          <QuickLink icon="play-circle" label="Watch Live" onPress={() => navigation.navigate('Live')} />
          <QuickLink icon="heart" label="Give" onPress={() => navigation.navigate('Give')} />
          <QuickLink icon="hand-left" label="Prayer" onPress={() => navigation.getParent().navigate('MoreTab', { screen: 'Prayer' })} />
          <QuickLink icon="call" label="Contact" onPress={() => navigation.getParent().navigate('MoreTab', { screen: 'Contact' })} />
          <QuickLink icon="people" label="Connect" onPress={() => navigation.getParent().navigate('MoreTab', { screen: 'Connection' })} />
          <QuickLink icon="calendar" label="Events" onPress={() => navigation.getParent().navigate('MoreTab', { screen: 'Events' })} />
        </View>
      </View>

      {/* Contact Info */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Visit Us</Text>
        <TouchableOpacity style={styles.contactRow} onPress={() => Linking.openURL(`tel:${CHURCH.phone.replace(/[^\d]/g, '')}`)}>
          <Ionicons name="call-outline" size={20} color={COLORS.secondary} />
          <Text style={styles.contactText}>{CHURCH.phone}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.contactRow} onPress={() => Linking.openURL(`mailto:${CHURCH.email}`)}>
          <Ionicons name="mail-outline" size={20} color={COLORS.secondary} />
          <Text style={styles.contactText}>{CHURCH.email}</Text>
        </TouchableOpacity>
        <View style={styles.contactRow}>
          <Ionicons name="location-outline" size={20} color={COLORS.secondary} />
          <Text style={styles.contactText}>{CHURCH.address}</Text>
        </View>
      </View>

      {/* Social Media */}
      <View style={styles.socialRow}>
        <TouchableOpacity style={styles.socialBtn} onPress={() => Linking.openURL(CHURCH.facebook)}>
          <Ionicons name="logo-facebook" size={30} color="#1877F2" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialBtn} onPress={() => Linking.openURL(CHURCH.youtube)}>
          <Ionicons name="logo-youtube" size={30} color="#FF0000" />
        </TouchableOpacity>
      </View>

      <View style={{ height: 20 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f0ebe3' },
  content: { paddingBottom: 20 },
  hero: {
    backgroundColor: COLORS.primary,
    paddingVertical: 40,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  heroTitle: {
    fontSize: 26,
    fontWeight: '800',
    color: COLORS.textWhite,
    textAlign: 'center',
    marginBottom: 5,
  },
  heroSubtitle: {
    fontSize: 16,
    color: '#d4a853',
    fontWeight: '600',
    marginBottom: 15,
  },
  heroVerse: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.8)',
    textAlign: 'center',
    fontStyle: 'italic',
    lineHeight: 19,
  },
  card: {
    backgroundColor: '#fff',
    marginHorizontal: 15,
    marginTop: 15,
    borderRadius: 10,
    padding: 18,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.primary,
    marginBottom: 12,
    borderBottomWidth: 2,
    borderBottomColor: COLORS.secondary,
    paddingBottom: 8,
  },
  serviceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  serviceInfo: { marginLeft: 12, flex: 1 },
  serviceDay: { fontSize: 15, fontWeight: '600', color: COLORS.text },
  serviceTime: { fontSize: 14, color: COLORS.textLight, marginTop: 2 },
  quickGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  quickLink: {
    width: '30%',
    alignItems: 'center',
    marginBottom: 15,
  },
  quickIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 6,
  },
  quickLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.text,
    textAlign: 'center',
  },
  contactRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  contactText: {
    fontSize: 15,
    color: COLORS.text,
    marginLeft: 10,
  },
  socialRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 15,
    gap: 20,
  },
  socialBtn: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
});
