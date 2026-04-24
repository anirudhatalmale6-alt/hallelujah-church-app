import React, { useState } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, Linking, ScrollView,
} from 'react-native';
import { WebView } from 'react-native-webview';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, CHURCH } from '../constants/theme';

export default function LiveScreen() {
  const [showVideo, setShowVideo] = useState(false);
  const liveUrl = `https://www.youtube.com/embed/live_stream?channel=${CHURCH.youtubeChannelId}&autoplay=1`;
  const youtubeChannel = CHURCH.youtube;

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
            />
          </View>
        ) : (
          <TouchableOpacity style={styles.playBtn} onPress={() => setShowVideo(true)}>
            <Ionicons name="play-circle" size={80} color={COLORS.secondary} />
            <Text style={styles.playText}>Tap to Watch Live</Text>
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Watch on YouTube</Text>
        <Text style={styles.cardText}>
          You can also watch our live services and past recordings on our YouTube channel.
        </Text>
        <TouchableOpacity
          style={styles.ytBtn}
          onPress={() => Linking.openURL(youtubeChannel)}
        >
          <Ionicons name="logo-youtube" size={22} color="#fff" />
          <Text style={styles.ytBtnText}>Open YouTube Channel</Text>
        </TouchableOpacity>
      </View>

      {/* Radio */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Listen to Our Radio</Text>
        <Text style={styles.cardText}>
          Listen to sermons and worship music anytime through our online radio.
        </Text>
        <TouchableOpacity
          style={styles.radioBtn}
          onPress={() => Linking.openURL(CHURCH.website + '/video-live.htm')}
        >
          <Ionicons name="radio" size={22} color="#fff" />
          <Text style={styles.ytBtnText}>Listen Now</Text>
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
  ytBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FF0000',
    paddingVertical: 12,
    borderRadius: 8,
    gap: 8,
  },
  ytBtnText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 15,
  },
  radioBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.primary,
    paddingVertical: 12,
    borderRadius: 8,
    gap: 8,
  },
});
