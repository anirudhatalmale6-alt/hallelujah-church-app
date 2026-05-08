import React, { useState, useEffect } from 'react';
import {
  View, Text, StyleSheet, FlatList, TouchableOpacity, Image,
  ActivityIndicator, RefreshControl, Modal,
} from 'react-native';
import { WebView } from 'react-native-webview';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, CHURCH } from '../constants/theme';

const ALL_SERMONS = [
  { id: 'o1N0TXOf65M', title: 'Worship Service #25', date: '' },
  { id: 'w7v5FvCZJGA', title: 'Worship Service #24', date: '' },
  { id: 'OC-xrGa0L6I', title: 'Worship Service #23', date: '' },
  { id: 'tVHyenGGMHw', title: 'Worship Service #22', date: '' },
  { id: 'YsmhHHZCAzU', title: 'Worship Service #21', date: '' },
  { id: 'Cio2xrYpmIY', title: 'Worship Service #20', date: '' },
  { id: 'w2P3Z3kfnhw', title: 'Worship Service #19', date: '' },
  { id: 'Yk5LPT2c6Ww', title: 'Worship Service #18', date: '' },
  { id: 'pE8c5TG3Dlg', title: 'Worship Service #17', date: '' },
  { id: 'WNxTpMzsLKE', title: 'Worship Service #16', date: '' },
  { id: '_3dw-lkBci4', title: 'Worship Service #15', date: '' },
  { id: 'AUPCn7rPmkE', title: 'Worship Service #14', date: '' },
  { id: 'uKNL6OF4OJM', title: 'Worship Service #13', date: '' },
  { id: 'SjWtCIGkwjU', title: 'Worship Service #12', date: '' },
  { id: 'Fxbe7j6tPgM', title: 'Worship Service #11', date: '' },
  { id: 'fAX0UNp2w7E', title: 'Worship Service #10', date: '' },
  { id: '5u5L-9PBBMA', title: 'Worship Service #9', date: '' },
  { id: 'a2vCfn4ysYM', title: 'Worship Service #8', date: '' },
  { id: 'p-CFKV0rWQw', title: 'Worship Service #7', date: '' },
  { id: '_tRbKPwehYs', title: 'Worship Service #6', date: '' },
  { id: 'cIbJXJaFxuM', title: 'Worship Service #5', date: '' },
  { id: 'bnBqBTqCKhI', title: 'Worship Service #4', date: '' },
  { id: '18JY3E_QWFE', title: 'Worship Service #3', date: '' },
  { id: 'p8JqC1m2ADo', title: 'Worship Service #2', date: '' },
  { id: '5s6SjhXcO0A', title: 'Worship Service #1', date: '' },
  { id: 'bBY-tfHTO7g', title: 'Address to the Nation #2', date: '' },
  { id: 'Mb3F2nD1vxo', title: 'Address to the Nation #1', date: '' },
  { id: 'jibKq6sQzLk', title: 'Prayer for the Nation #5', date: '' },
  { id: 'KLcLw_WqCts', title: 'Prayer for the Nation #4', date: '' },
  { id: 'YlfMskOhBfc', title: 'Prayer for the Nation #3', date: '' },
  { id: 'hHmjoZNHrFg', title: 'Prayer for the Nation #2', date: '' },
  { id: 'uv8o_rGSbw0', title: 'Prayer for the Nation #1', date: '' },
  { id: 'PMSrZ8J_xYA', title: 'Worship by Dr. Victoria Noel', date: '' },
  { id: '5QjZUtfPoMs', title: 'Worship by Pasteur Noel #3', date: '' },
  { id: 'ZS3YS5Q7qJ0', title: 'Worship by Pasteur Noel #2', date: '' },
  { id: 'gTUZ4foHb98', title: 'Worship by Pasteur Noel #1', date: '' },
  { id: 'DYaV4B0SB0g', title: 'Bouyon Cho Show - Family Presentation', date: '' },
].map(v => ({ ...v, thumbnail: `https://i.ytimg.com/vi/${v.id}/mqdefault.jpg` }));

export default function SermonsScreen() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [playingVideo, setPlayingVideo] = useState(null);

  const fetchVideos = async () => {
    try {
      const rssUrl = `https://www.youtube.com/feeds/videos.xml?channel_id=${CHURCH.youtubeChannelId}`;
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000);
      const response = await fetch(rssUrl, { signal: controller.signal });
      clearTimeout(timeoutId);
      if (!response.ok) {
        setVideos(ALL_SERMONS);
        return;
      }
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
      if (entries.length > 0) {
        setVideos(entries);
      } else {
        setVideos(ALL_SERMONS);
      }
    } catch {
      setVideos(ALL_SERMONS);
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

  return (
    <View style={styles.container}>
      <FlatList
        data={videos}
        keyExtractor={(item) => item.id}
        renderItem={renderVideo}
        contentContainerStyle={styles.list}
        initialNumToRender={6}
        maxToRenderPerBatch={5}
        windowSize={5}
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
              source={{ uri: `https://m.youtube.com/watch?v=${playingVideo.id}` }}
              style={styles.player}
              javaScriptEnabled
              allowsInlineMediaPlayback
              mediaPlaybackRequiresUserAction={false}
              setSupportMultipleWindows={false}
              allowsFullscreenVideo
              userAgent="Mozilla/5.0 (Linux; Android 13; Pixel 7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Mobile Safari/537.36"
              onShouldStartLoadWithRequest={(request) => {
                if (request.url.includes('youtube.com') || request.url.includes('googlevideo.com') || request.url.includes('google.com') || request.url.includes('gstatic.com') || request.url.includes('ytimg.com')) return true;
                return false;
              }}
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
  container: { flex: 1, backgroundColor: COLORS.primary },
  list: { padding: 15, paddingBottom: 20 },
  header: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.textWhite,
    marginBottom: 15,
  },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  loadingText: { marginTop: 10, fontSize: 15, color: 'rgba(255,255,255,0.7)' },
  errorText: { marginTop: 10, fontSize: 15, color: 'rgba(255,255,255,0.7)', textAlign: 'center' },
  retryBtn: {
    marginTop: 15,
    paddingHorizontal: 25,
    paddingVertical: 10,
    backgroundColor: COLORS.primary,
    borderRadius: 8,
  },
  retryText: { color: '#fff', fontWeight: '700' },
  emptyText: { fontSize: 15, color: 'rgba(255,255,255,0.7)' },
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
