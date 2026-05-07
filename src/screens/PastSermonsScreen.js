import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Modal,
  SectionList,
} from 'react-native';
import { WebView } from 'react-native-webview';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../constants/theme';

const SERMON_CATEGORIES = [
  {
    title: 'Worship Services & Sermons',
    icon: 'book',
    data: [
      { id: 'N0025', title: 'Worship Service #25', videoId: 'o1N0TXOf65M' },
      { id: 'N0024', title: 'Worship Service #24', videoId: 'w7v5FvCZJGA' },
      { id: 'N0023', title: 'Worship Service #23', videoId: 'OC-xrGa0L6I' },
      { id: 'N0022', title: 'Worship Service #22', videoId: 'tVHyenGGMHw' },
      { id: 'N0021', title: 'Worship Service #21', videoId: 'YsmhHHZCAzU' },
      { id: 'N0020', title: 'Worship Service #20', videoId: 'Cio2xrYpmIY' },
      { id: 'N0019', title: 'Worship Service #19', videoId: 'w2P3Z3kfnhw' },
      { id: 'N0018', title: 'Worship Service #18', videoId: 'Yk5LPT2c6Ww' },
      { id: 'N0017', title: 'Worship Service #17', videoId: 'pE8c5TG3Dlg' },
      { id: 'N0016', title: 'Worship Service #16', videoId: 'WNxTpMzsLKE' },
      { id: 'N0015', title: 'Worship Service #15', videoId: '_3dw-lkBci4' },
      { id: 'N0014', title: 'Worship Service #14', videoId: 'AUPCn7rPmkE' },
      { id: 'N0013', title: 'Worship Service #13', videoId: 'uKNL6OF4OJM' },
      { id: 'N0012', title: 'Worship Service #12', videoId: 'SjWtCIGkwjU' },
      { id: 'N0011', title: 'Worship Service #11', videoId: 'Fxbe7j6tPgM' },
      { id: 'N0010', title: 'Worship Service #10', videoId: 'fAX0UNp2w7E' },
      { id: 'N0009', title: 'Worship Service #9', videoId: '5u5L-9PBBMA' },
      { id: 'N0008', title: 'Worship Service #8', videoId: 'a2vCfn4ysYM' },
      { id: 'N0007', title: 'Worship Service #7', videoId: 'p-CFKV0rWQw' },
      { id: 'N0006', title: 'Worship Service #6', videoId: '_tRbKPwehYs' },
      { id: 'N0005', title: 'Worship Service #5', videoId: 'cIbJXJaFxuM' },
      { id: 'N0004', title: 'Worship Service #4', videoId: 'bnBqBTqCKhI' },
      { id: 'N0003', title: 'Worship Service #3', videoId: '18JY3E_QWFE' },
      { id: 'N0002', title: 'Worship Service #2', videoId: 'p8JqC1m2ADo' },
      { id: 'N0001', title: 'Worship Service #1', videoId: '5s6SjhXcO0A' },
    ],
  },
  {
    title: 'Adresse a la Nation',
    icon: 'megaphone',
    data: [
      { id: 'A0002', title: 'Address to the Nation #2', videoId: 'bBY-tfHTO7g' },
      { id: 'A0001', title: 'Address to the Nation #1', videoId: 'Mb3F2nD1vxo' },
    ],
  },
  {
    title: 'Prayer for the Nation',
    icon: 'hand-left',
    data: [
      { id: 'P0005', title: 'Prayer for the Nation #5', videoId: 'jibKq6sQzLk' },
      { id: 'P0004', title: 'Prayer for the Nation #4', videoId: 'KLcLw_WqCts' },
      { id: 'P0003', title: 'Prayer for the Nation #3', videoId: 'YlfMskOhBfc' },
      { id: 'P0002', title: 'Prayer for the Nation #2', videoId: 'hHmjoZNHrFg' },
      { id: 'P0001', title: 'Prayer for the Nation #1', videoId: 'uv8o_rGSbw0' },
    ],
  },
  {
    title: 'Worship / Adoration',
    icon: 'musical-notes',
    data: [
      { id: 'W0004', title: 'Worship by Dr. Victoria Noel', videoId: 'PMSrZ8J_xYA' },
      { id: 'W0003', title: 'Worship by Pasteur Noel #3', videoId: '5QjZUtfPoMs' },
      { id: 'W0002', title: 'Worship by Pasteur Noel #2', videoId: 'ZS3YS5Q7qJ0' },
      { id: 'W0001', title: 'Worship by Pasteur Noel #1', videoId: 'gTUZ4foHb98' },
    ],
  },
  {
    title: 'Bouyon Cho Show',
    icon: 'people',
    data: [
      { id: 'S0001', title: 'Family Presentation', videoId: 'DYaV4B0SB0g' },
    ],
  },
];

export default function PastSermonsScreen() {
  const [playingVideo, setPlayingVideo] = useState(null);
  const [collapsed, setCollapsed] = useState({});

  const toggleSection = (title) => {
    setCollapsed(prev => ({ ...prev, [title]: !prev[title] }));
  };

  return (
    <View style={styles.container}>
      <SectionList
        sections={SERMON_CATEGORIES.map(cat => ({
          ...cat,
          data: collapsed[cat.title] ? [] : cat.data,
        }))}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        renderSectionHeader={({ section }) => {
          const cat = SERMON_CATEGORIES.find(c => c.title === section.title);
          const isCollapsed = collapsed[section.title];
          return (
            <TouchableOpacity style={styles.sectionHeader} onPress={() => toggleSection(section.title)}>
              <Ionicons name={cat.icon} size={20} color={COLORS.secondary} />
              <Text style={styles.sectionTitle}>{section.title}</Text>
              <Text style={styles.sectionCount}>{cat.data.length}</Text>
              <Ionicons name={isCollapsed ? 'chevron-down' : 'chevron-up'} size={18} color={COLORS.textLight} />
            </TouchableOpacity>
          );
        }}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.videoRow} onPress={() => setPlayingVideo(item)}>
            <Image
              source={{ uri: `https://i.ytimg.com/vi/${item.videoId}/mqdefault.jpg` }}
              style={styles.thumb}
            />
            <View style={styles.videoInfo}>
              <Text style={styles.videoTitle} numberOfLines={2}>{item.title}</Text>
              <Text style={styles.videoId}>{item.id}</Text>
            </View>
            <Ionicons name="play-circle" size={28} color={COLORS.secondary} />
          </TouchableOpacity>
        )}
        stickySectionHeadersEnabled={false}
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
              source={{ uri: `https://www.youtube.com/embed/${playingVideo.videoId}?autoplay=1&rel=0` }}
              style={styles.player}
              javaScriptEnabled
              allowsInlineMediaPlayback
              mediaPlaybackRequiresUserAction={false}
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
  container: { flex: 1, backgroundColor: '#f0ebe3' },
  list: { paddingBottom: 20 },
  sectionHeader: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff',
    paddingVertical: 14, paddingHorizontal: 15, marginTop: 10, marginHorizontal: 12,
    borderRadius: 10, gap: 10, shadowColor: '#000', shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08, shadowRadius: 2, elevation: 2,
  },
  sectionTitle: { flex: 1, fontSize: 16, fontWeight: '700', color: COLORS.primary },
  sectionCount: {
    fontSize: 13, fontWeight: '600', color: COLORS.textWhite, backgroundColor: COLORS.secondary,
    paddingHorizontal: 8, paddingVertical: 2, borderRadius: 10, overflow: 'hidden',
  },
  videoRow: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff',
    marginHorizontal: 12, paddingVertical: 10, paddingHorizontal: 12,
    borderBottomWidth: 1, borderBottomColor: '#f0f0f0',
  },
  thumb: { width: 80, height: 50, borderRadius: 6, backgroundColor: '#ddd' },
  videoInfo: { flex: 1, marginLeft: 10 },
  videoTitle: { fontSize: 14, fontWeight: '600', color: COLORS.text, lineHeight: 18 },
  videoId: { fontSize: 11, color: COLORS.textLight, marginTop: 2 },
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
