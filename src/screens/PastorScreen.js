import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, CHURCH } from '../constants/theme';

export default function PastorScreen() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.hero}>
        <Image
          source={{ uri: CHURCH.website + '/picts/about-noel.jpg' }}
          style={styles.pastorPhoto}
        />
        <Text style={styles.name}>{CHURCH.pastor}</Text>
        <Text style={styles.role}>Senior Pastor</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>About Our Pastor</Text>
        <Text style={styles.cardText}>
          Pastor Noel, Jean Yves is the founder and senior pastor of Hallelujah In The City church in Philadelphia, PA. With a deep passion for spreading the Gospel and serving the community, Pastor Noel leads the congregation in worship, Bible teaching, and outreach.
        </Text>
        <Text style={styles.cardText}>
          Under his leadership, Hallelujah In The City has become a welcoming home for believers of all nationalities, united in faith and love for Christ.
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Vision</Text>
        <Text style={styles.cardText}>
          To build a community of believers who are rooted in the Word of God, empowered by the Holy Spirit, and committed to serving others with the love of Christ.
        </Text>
      </View>

      <View style={{ height: 20 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.primary },
  content: { paddingBottom: 20 },
  hero: {
    backgroundColor: COLORS.primary,
    paddingVertical: 30,
    alignItems: 'center',
  },
  pastorPhoto: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: COLORS.secondary,
    backgroundColor: '#5a3e1b',
    marginBottom: 12,
  },
  name: { fontSize: 22, fontWeight: '800', color: COLORS.textWhite },
  role: { fontSize: 15, color: 'rgba(255,255,255,0.7)', marginTop: 4 },
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
  cardText: { fontSize: 15, color: COLORS.text, lineHeight: 22, marginBottom: 10 },
});
