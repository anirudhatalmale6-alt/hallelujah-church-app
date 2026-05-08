import React from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, Image, Linking, ScrollView,
} from 'react-native';
import { WebView } from 'react-native-webview';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, CHURCH } from '../constants/theme';

const PLAYER_HTML = `<!DOCTYPE html><html><head><meta name="viewport" content="width=device-width,initial-scale=1"><style>*{margin:0;padding:0}body{background:#5a3e1b;display:flex;justify-content:center;align-items:center;min-height:100vh}audio{width:90%}</style></head><body><audio controls src="https://s2.voscast.com:8562/stream" style="width:90%"></audio></body></html>`;

export default function RadioScreen({ navigation }) {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.radioCard}>
        <Image
          source={require('../../assets/hc-globe-logo.png')}
          style={styles.radioLogo}
        />
        <Text style={styles.title}>Radio Alelouya Nan Vil La</Text>
        <Text style={styles.subtitle}>Listen to sermons and worship music anytime</Text>

        <View style={styles.playerContainer}>
          <WebView
            source={{ html: PLAYER_HTML }}
            style={styles.player}
            javaScriptEnabled
            mediaPlaybackRequiresUserAction={false}
            allowsInlineMediaPlayback
            originWhitelist={['*']}
            scrollEnabled={false}
          />
        </View>
      </View>

      {/* Give / Donate */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Support the Ministry</Text>
        <Text style={styles.cardText}>
          Your generous giving helps us continue serving our community and spreading the word of God.
        </Text>
        <TouchableOpacity
          style={styles.giveBtn}
          onPress={() => navigation.getParent()?.navigate('Give')}
        >
          <Ionicons name="heart" size={22} color="#fff" />
          <Text style={styles.giveBtnText}>Give / Donate</Text>
        </TouchableOpacity>
      </View>

      <View style={{ height: 20 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.primary },
  content: { padding: 15 },
  radioCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 25,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  radioLogo: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 15,
    borderWidth: 2,
    borderColor: COLORS.secondary,
  },
  title: {
    fontSize: 20,
    fontWeight: '800',
    color: COLORS.primary,
    textAlign: 'center',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 14,
    color: COLORS.textLight,
    textAlign: 'center',
    marginBottom: 20,
  },
  playerContainer: {
    width: '100%',
    height: 60,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: COLORS.primary,
  },
  player: {
    flex: 1,
    backgroundColor: COLORS.primary,
  },
  card: {
    backgroundColor: '#fff',
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
    marginBottom: 8,
  },
  cardText: {
    fontSize: 14,
    color: COLORS.textLight,
    marginBottom: 12,
    lineHeight: 20,
  },
  giveBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.secondary,
    paddingVertical: 14,
    borderRadius: 8,
    gap: 8,
  },
  giveBtnText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },
});
