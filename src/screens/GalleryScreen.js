import React, { useState } from 'react';
import {
  View, Text, StyleSheet, FlatList, Image, TouchableOpacity, Modal,
  useWindowDimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, CHURCH } from '../constants/theme';

export default function GalleryScreen({ route }) {
  const { title, prefix, count } = route.params;
  const { width: screenWidth } = useWindowDimensions();
  const [viewingImage, setViewingImage] = useState(null);

  const images = Array.from({ length: count }, (_, i) => ({
    id: `${prefix}-${i + 1}`,
    uri: `${CHURCH.website}/slideshows/${prefix}-${i + 1}.jpg`,
  }));

  const imageSize = (screenWidth - 45) / 2;

  return (
    <View style={styles.container}>
      <FlatList
        data={images}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.grid}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => setViewingImage(item)}>
            <Image
              source={{ uri: item.uri }}
              style={[styles.gridImage, { width: imageSize, height: imageSize * 0.7 }]}
            />
          </TouchableOpacity>
        )}
      />

      <Modal visible={!!viewingImage} transparent animationType="fade" onRequestClose={() => setViewingImage(null)}>
        <View style={styles.modalBg}>
          <TouchableOpacity style={styles.closeBtn} onPress={() => setViewingImage(null)}>
            <Ionicons name="close-circle" size={36} color="#fff" />
          </TouchableOpacity>
          {viewingImage && (
            <Image
              source={{ uri: viewingImage.uri }}
              style={{ width: screenWidth, height: screenWidth * 0.65 }}
              resizeMode="contain"
            />
          )}
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.primary },
  grid: { padding: 10 },
  gridImage: {
    borderRadius: 8,
    margin: 5,
    backgroundColor: '#ddd',
  },
  modalBg: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.92)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeBtn: {
    position: 'absolute',
    top: 50,
    right: 20,
    zIndex: 10,
  },
});
