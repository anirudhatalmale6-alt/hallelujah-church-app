import React from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity, Linking,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, CHURCH } from '../constants/theme';

export default function AboutScreen({ navigation }) {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.hero}>
        <Ionicons name="home" size={50} color={COLORS.secondary} />
        <Text style={styles.heroTitle}>{CHURCH.name}</Text>
        <Text style={styles.heroSubtitle}>{CHURCH.address}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Our Mission</Text>
        <Text style={styles.cardText}>
          Hallelujah In The City is a Christ-centered church in Philadelphia welcoming all nationalities for worship, Bible teaching, prayer, and community outreach. We believe in the transformative power of the Gospel and strive to bring hope and love to our community.
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>What We Believe</Text>
        <View style={styles.beliefRow}>
          <Ionicons name="book-outline" size={20} color={COLORS.secondary} />
          <Text style={styles.beliefText}>The Bible is the inspired Word of God</Text>
        </View>
        <View style={styles.beliefRow}>
          <Ionicons name="heart-outline" size={20} color={COLORS.secondary} />
          <Text style={styles.beliefText}>Salvation through Jesus Christ</Text>
        </View>
        <View style={styles.beliefRow}>
          <Ionicons name="water-outline" size={20} color={COLORS.secondary} />
          <Text style={styles.beliefText}>Water Baptism and Holy Communion</Text>
        </View>
        <View style={styles.beliefRow}>
          <Ionicons name="flame-outline" size={20} color={COLORS.secondary} />
          <Text style={styles.beliefText}>The Baptism of the Holy Spirit</Text>
        </View>
        <View style={styles.beliefRow}>
          <Ionicons name="people-outline" size={20} color={COLORS.secondary} />
          <Text style={styles.beliefText}>Fellowship and community service</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('Pastor')}>
        <View style={styles.pastorRow}>
          <View style={styles.pastorIcon}>
            <Ionicons name="person" size={30} color={COLORS.textWhite} />
          </View>
          <View style={styles.pastorInfo}>
            <Text style={styles.pastorLabel}>Our Pastor</Text>
            <Text style={styles.pastorName}>{CHURCH.pastor}</Text>
            <Text style={styles.pastorLink}>Tap to learn more</Text>
          </View>
          <Ionicons name="chevron-forward" size={24} color={COLORS.textLight} />
        </View>
      </TouchableOpacity>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Connect With Us</Text>
        <TouchableOpacity style={styles.linkRow} onPress={() => Linking.openURL(CHURCH.website)}>
          <Ionicons name="globe-outline" size={20} color={COLORS.secondary} />
          <Text style={styles.linkText}>Visit Our Website</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.linkRow} onPress={() => Linking.openURL(CHURCH.facebook)}>
          <Ionicons name="logo-facebook" size={20} color="#1877F2" />
          <Text style={styles.linkText}>Follow on Facebook</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.linkRow} onPress={() => Linking.openURL(CHURCH.youtube)}>
          <Ionicons name="logo-youtube" size={20} color="#FF0000" />
          <Text style={styles.linkText}>Subscribe on YouTube</Text>
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
    paddingVertical: 30,
    alignItems: 'center',
  },
  heroTitle: { fontSize: 22, fontWeight: '800', color: COLORS.textWhite, marginTop: 10 },
  heroSubtitle: { fontSize: 15, color: 'rgba(255,255,255,0.7)', marginTop: 4 },
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
    marginBottom: 10,
    borderBottomWidth: 2,
    borderBottomColor: COLORS.secondary,
    paddingBottom: 8,
  },
  cardText: { fontSize: 15, color: COLORS.text, lineHeight: 22 },
  beliefRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    gap: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  beliefText: { fontSize: 15, color: COLORS.text, flex: 1 },
  pastorRow: { flexDirection: 'row', alignItems: 'center' },
  pastorIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pastorInfo: { flex: 1, marginLeft: 12 },
  pastorLabel: { fontSize: 13, color: COLORS.textLight },
  pastorName: { fontSize: 16, fontWeight: '700', color: COLORS.primary },
  pastorLink: { fontSize: 13, color: COLORS.secondary, marginTop: 2 },
  linkRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    gap: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  linkText: { fontSize: 15, color: COLORS.text },
});
