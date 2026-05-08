import React, { useState } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, ScrollView, Linking,
} from 'react-native';
import { WebView } from 'react-native-webview';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, CHURCH } from '../constants/theme';

export default function LiveScreen() {
  const [showVideo, setShowVideo] = useState(false);
  const liveUrl = `https://www.youtube.com/embed/live_stream?channel=${CHURCH.youtubeChannelId}&autoplay=1`;

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.card}>
        <Text style={styles.title}>Live Church Service</Text>
        <Text style={styles.subtitle}>
          Join us for worship every Sunday at 8:00 AM and 11:00 AM
        </Text>

        {showVideo ? (
          <View style={styles.videoContainer}>
            <WebView
              source={{ uri: liveUrl }}
              style={styles.video}
              javaScriptEnabled
              allowsInlineMediaPlayback
              mediaPlaybackRequiresUserAction={false}
              setSupportMultipleWindows={false}
              onShouldStartLoadWithRequest={(request) => {
                if (request.url.includes('youtube.com')) return true;
                return false;
              }}
            />
          </View>
        ) : (
          <TouchableOpacity style={styles.playBtn} onPress={() => setShowVideo(true)}>
            <Ionicons name="play-circle" size={80} color={COLORS.secondary} />
            <Text style={styles.playText}>Tap to Watch Live</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Give / Donate */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Support the Ministry</Text>
        <Text style={styles.cardText}>
          Your generous giving helps us continue serving our community and spreading the word of God.
        </Text>
        <TouchableOpacity
          style={styles.giveBtn}
          onPress={() => Linking.openURL(CHURCH.donationUrl)}
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
  container: { flex: 1, backgroundColor: '#f0ebe3' },
  content: { paddingBottom: 20 },
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
  title: {
    fontSize: 22,
    fontWeight: '800',
    color: COLORS.primary,
    textAlign: 'center',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 15,
    color: COLORS.textLight,
    textAlign: 'center',
    marginBottom: 15,
  },
  videoContainer: {
    height: 220,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#000',
  },
  video: { flex: 1 },
  playBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 30,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#eee',
  },
  playText: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.primary,
    marginTop: 8,
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
