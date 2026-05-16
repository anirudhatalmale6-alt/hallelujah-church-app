import React, { useState, useEffect } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, Image, Modal,
  FlatList, ActivityIndicator,
} from 'react-native';
import { WebView } from 'react-native-webview';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../constants/theme';

const WEBSITE_BASE = 'https://www.hallelujahinthecity.org';
const VIDEO_PAGES = [
  { id: '1', page: 'video-1.htm' },
  { id: '2', page: 'video-2.htm' },
  { id: '3', page: 'video-3.htm' },
  { id: '4', page: 'video-4.htm' },
];

function extractYouTubeId(html) {
  const match = html.match(/youtube\.com\/embed\/([a-zA-Z0-9_-]+)/);
  return match ? match[1] : null;
}

function extractTitle(html) {
  const match = html.match(/<h\d[^>]*class="[^"]*vid-title[^"]*"[^>]*>(.*?)<\/h\d>/i)
    || html.match(/<h1[^>]*>(.*?)<\/h1>/i)
    || html.match(/<h2[^>]*>(.*?)<\/h2>/i);
  return match ? match[1].replace(/<[^>]+>/g, '').trim() : null;
}

export default function PastSermonsScreen() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [playingVideo, setPlayingVideo] = useState(null);

  useEffect(() => {
    loadVideos();
  }, []);

  const loadVideos = async () => {
    setLoading(true);
    setError(null);
    try {
      const results = await Promise.all(
        VIDEO_PAGES.map(async ({ id, page }) => {
          const res = await fetch(`${WEBSITE_BASE}/${page}`);
          const html = await res.text();
          const videoId = extractYouTubeId(html);
          const title = extractTitle(html);
          return videoId ? { id, videoId, title: title || `Video ${id}` } : null;
        })
      );
      setVideos(results.filter(Boolean));
    } catch (e) {
      setError('Unable to load videos. Please check your internet connection.');
    }
    setLoading(false);
  };

  if (loading) {
    return (
      <View style={[styles.container, styles.center]}>
        <ActivityIndicator size="large" color={COLORS.secondary} />
        <Text style={styles.loadingText}>Loading videos...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={[styles.container, styles.center]}>
        <Ionicons name="cloud-offline" size={48} color={COLORS.secondary} />
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity style={styles.retryBtn} onPress={loadVideos}>
          <Text style={styles.retryText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={videos}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.videoCard} onPress={() => setPlayingVideo(item)}>
            <Image
              source={{ uri: `https://i.ytimg.com/vi/${item.videoId}/hqdefault.jpg` }}
              style={styles.thumb}
            />
            <View style={styles.playOverlay}>
              <Ionicons name="play-circle" size={56} color="rgba(255,255,255,0.9)" />
            </View>
            <View style={styles.videoInfo}>
              <Text style={styles.videoTitle}>{item.title}</Text>
            </View>
          </TouchableOpacity>
        )}
      />

      <Modal visible={!!playingVideo} animationType="slide" onRequestClose={() => setPlayingVideo(null)}>
        <View style={styles.playerContainer}>
          <View style={styles.playerHeader}>
            <TouchableOpacity onPress={() => setPlayingVideo(null)} style={styles.closeBtn}>
              <Ionicons name="close" size={28} color={COLORS.textWhite} />
            </TouchableOpacity>
            <Text style={styles.playerHeaderTitle} numberOfLines={1}>
              {playingVideo?.title}
            </Text>
          </View>
          {playingVideo && (
            <WebView
              source={{ html: `<!DOCTYPE html><html><head><meta name="viewport" content="width=device-width,initial-scale=1"><style>*{margin:0;padding:0}html,body{width:100%;height:100%;background:#000}iframe{width:100%;height:100%;border:0}</style></head><body><iframe src="https://www.youtube.com/embed/${playingVideo.videoId}?autoplay=1&playsinline=1&rel=0" allow="autoplay;encrypted-media;fullscreen" allowfullscreen></iframe></body></html>` }}
              style={styles.player}
              javaScriptEnabled
              allowsInlineMediaPlayback
              mediaPlaybackRequiresUserAction={false}
              setSupportMultipleWindows={false}
              allowsFullscreenVideo
            />
          )}
          <View style={styles.playerInfo}>
            <Text style={styles.playerVideoTitle}>{playingVideo?.title}</Text>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.primary },
  center: { justifyContent: 'center', alignItems: 'center' },
  list: { padding: 12, gap: 12 },
  loadingText: { color: COLORS.textWhite, marginTop: 12, fontSize: 15 },
  errorText: { color: COLORS.textWhite, marginTop: 12, fontSize: 15, textAlign: 'center', paddingHorizontal: 30 },
  retryBtn: {
    marginTop: 16, backgroundColor: COLORS.secondary, paddingVertical: 10,
    paddingHorizontal: 24, borderRadius: 8,
  },
  retryText: { color: '#fff', fontSize: 15, fontWeight: '700' },
  videoCard: {
    backgroundColor: '#fff', borderRadius: 12, overflow: 'hidden',
    shadowColor: '#000', shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1, shadowRadius: 4, elevation: 3,
  },
  thumb: { width: '100%', height: 200, backgroundColor: '#ddd' },
  playOverlay: {
    position: 'absolute', top: 0, left: 0, right: 0, height: 200,
    justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.2)',
  },
  videoInfo: { padding: 14 },
  videoTitle: { fontSize: 16, fontWeight: '700', color: COLORS.text },
  playerContainer: { flex: 1, backgroundColor: '#000' },
  playerHeader: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.primary,
    paddingTop: 50, paddingBottom: 12, paddingHorizontal: 15,
  },
  closeBtn: { marginRight: 12 },
  playerHeaderTitle: { flex: 1, color: COLORS.textWhite, fontSize: 16, fontWeight: '600' },
  player: { flex: 1, backgroundColor: '#000' },
  playerInfo: { backgroundColor: COLORS.primary, padding: 15, paddingBottom: 30 },
  playerVideoTitle: { color: COLORS.textWhite, fontSize: 16, fontWeight: '700' },
});
