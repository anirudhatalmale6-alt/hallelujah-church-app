import React, { useState, useEffect } from 'react';
import {
  View, Text, StyleSheet, FlatList, TouchableOpacity, Image,
  ActivityIndicator, RefreshControl, Modal,
} from 'react-native';
import { WebView } from 'react-native-webview';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, CHURCH } from '../constants/theme';

export default function SermonsScreen() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);
  const [playingVideo, setPlayingVideo] = useState(null);

  const fetchVideos = async () => {
    try {
      setError(null);
      const rssUrl = `https://www.youtube.com/feeds/videos.xml?channel_id=${CHURCH.youtubeChannelId}`;
      const response = await fetch(rssUrl);
      const text = await response.text();

      const entries = [];
      const entryRegex = /<entry>([\s\S]*?)<\/entry>/g;
      let match;
      while ((match = entryRegex.exec(text)) !== null) {
        const entry = match[1];
        const videoId = entry.match(/<yt:videoId>(.*?)<\/yt:videoId>/)?.[1];
        const title = entry.match(/<title>(.*?)<\/title>/)?.[1];
        const published = entry.match(/<published>(.*?)<\/published>/)?.[1];
        if (videoId && title) {
          entries.push({
            id: videoId,
            title: title.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;/g, "'"),
            thumbnail: `https://i.ytimg.com/vi/${videoId}/mqdefault.jpg`,
            date: published ? new Date(published).toLocaleDateString('en-US', {
              year: 'numeric', month: 'long', day: 'numeric',
            }) : '',
          });
        }
      }
      setVideos(entries);
    } catch (err) {
      setError('Unable to load sermons. Please check your connection.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  const renderVideo = ({ item }) => (
    <TouchableOpacity style={styles.videoCard} onPress={() => setPlayingVideo(item)}>
      <Image source={{ uri: item.thumbnail }} style={styles.thumbnail} />
      <View style={styles.playOverlay}>
        <Ionicons name="play-circle" size={44} color="rgba(255,255,255,0.9)" />
      </View>
      <View style={styles.videoInfo}>
        <Text style={styles.videoTitle} numberOfLines={2}>{item.title}</Text>
        <Text style={styles.videoDate}>{item.date}</Text>
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={COLORS.secondary} />
        <Text style={styles.loadingText}>Loading sermons...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Ionicons name="cloud-offline-outline" size={50} color={COLORS.textLight} />
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity style={styles.retryBtn} onPress={() => { setLoading(true); fetchVideos(); }}>
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
        renderItem={renderVideo}
        contentContainerStyle={styles.list}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={() => { setRefreshing(true); fetchVideos(); }} colors={[COLORS.secondary]} />
        }
        ListHeaderComponent={
          <Text style={styles.header}>Sermon Archives</Text>
        }
        ListEmptyComponent={
          <View style={styles.center}>
            <Text style={styles.emptyText}>No sermons found.</Text>
          </View>
        }
      />

      <Modal visible={!!playingVideo} animationType="slide" onRequestClose={() => setPlayingVideo(null)}>
        <View style={styles.playerContainer}>
          <View style={styles.playerHeader}>
            <TouchableOpacity onPress={() => setPlayingVideo(null)} style={styles.closeBtn}>
              <Ionicons name="close" size={28} color={COLORS.textWhite} />
            </TouchableOpacity>
            <Text style={styles.playerTitle} numberOfLines={1}>
              {playingVideo?.title}
            </Text>
          </View>
          {playingVideo && (
            <WebView
              source={{ uri: `https://www.youtube.com/embed/${playingVideo.id}?autoplay=1&rel=0` }}
              style={styles.player}
              javaScriptEnabled
              allowsInlineMediaPlayback
              mediaPlaybackRequiresUserAction={false}
            />
          )}
          <View style={styles.playerInfo}>
            <Text style={styles.playerVideoTitle}>{playingVideo?.title}</Text>
            <Text style={styles.playerDate}>{playingVideo?.date}</Text>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f0ebe3' },
  list: { padding: 15, paddingBottom: 20 },
  header: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.primary,
    marginBottom: 15,
  },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  loadingText: { marginTop: 10, fontSize: 15, color: COLORS.textLight },
  errorText: { marginTop: 10, fontSize: 15, color: COLORS.textLight, textAlign: 'center' },
  retryBtn: {
    marginTop: 15,
    paddingHorizontal: 25,
    paddingVertical: 10,
    backgroundColor: COLORS.primary,
    borderRadius: 8,
  },
  retryText: { color: '#fff', fontWeight: '700' },
  emptyText: { fontSize: 15, color: COLORS.textLight },
  videoCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 15,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  thumbnail: {
    width: '100%',
    height: 190,
    backgroundColor: '#ddd',
  },
  playOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 190,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.15)',
  },
  videoInfo: { padding: 12 },
  videoTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: COLORS.text,
    lineHeight: 20,
  },
  videoDate: {
    fontSize: 13,
    color: COLORS.textLight,
    marginTop: 4,
  },
  playerContainer: { flex: 1, backgroundColor: '#000' },
  playerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    paddingTop: 50,
    paddingBottom: 12,
    paddingHorizontal: 15,
  },
  closeBtn: { marginRight: 12 },
  playerTitle: { flex: 1, color: COLORS.textWhite, fontSize: 16, fontWeight: '600' },
  player: { flex: 1, backgroundColor: '#000' },
  playerInfo: {
    backgroundColor: COLORS.primary,
    padding: 15,
    paddingBottom: 30,
  },
  playerVideoTitle: { color: COLORS.textWhite, fontSize: 16, fontWeight: '700', lineHeight: 22 },
  playerDate: { color: 'rgba(255,255,255,0.7)', fontSize: 13, marginTop: 5 },
});
