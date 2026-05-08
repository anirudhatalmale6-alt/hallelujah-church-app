import React, { useState, useRef } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, Image,
} from 'react-native';
import { WebView } from 'react-native-webview';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, CHURCH } from '../constants/theme';

export default function RadioScreen({ navigation }) {
  const [playing, setPlaying] = useState(false);

  const playerHtml = `<!DOCTYPE html><html><head><meta name="viewport" content="width=device-width,initial-scale=1"><style>*{margin:0;padding:0;box-sizing:border-box}body{background:transparent;display:flex;justify-content:center;align-items:center;height:100vh}</style></head><body><audio id="radio" src="https://s2.voscast.com:8562/stream" preload="none"></audio><script>
    window.addEventListener('message', function(e) {
      var radio = document.getElementById('radio');
      if (e.data === 'play') { radio.play(); }
      if (e.data === 'stop') { radio.pause(); radio.currentTime = 0; }
    });
  </script></body></html>`;

  const webViewRef = useRef(null);

  const togglePlay = () => {
    if (playing) {
      webViewRef.current?.postMessage('stop');
    } else {
      webViewRef.current?.postMessage('play');
    }
    setPlaying(!playing);
  };

  return (
    <View style={styles.container}>
      <View style={styles.radioCard}>
        <Image
          source={require('../../assets/hc-globe-logo.png')}
          style={styles.radioLogo}
        />
        <Text style={styles.title}>Radio Alelouya Nan Vil La</Text>
        <Text style={styles.subtitle}>Listen to sermons and worship music anytime</Text>

        <TouchableOpacity style={styles.playButton} onPress={togglePlay}>
          <Ionicons
            name={playing ? 'stop-circle' : 'play-circle'}
            size={100}
            color={playing ? '#E91E63' : COLORS.secondary}
          />
        </TouchableOpacity>
        <Text style={styles.statusText}>
          {playing ? 'Now Playing...' : 'Tap to Listen'}
        </Text>

        <WebView
          ref={webViewRef}
          source={{ html: playerHtml }}
          style={styles.hiddenPlayer}
          javaScriptEnabled
          mediaPlaybackRequiresUserAction={false}
          allowsInlineMediaPlayback
          originWhitelist={['*']}
        />
      </View>

      {/* Give / Donate */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Support the Ministry</Text>
        <Text style={styles.cardText}>
          Your generous giving helps us continue serving our community and spreading the word of God.
        </Text>
        <TouchableOpacity
          style={styles.giveBtn}
          onPress={() => navigation.navigate('Give')}
        >
          <Ionicons name="heart" size={22} color="#fff" />
          <Text style={styles.giveBtnText}>Give / Donate</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f0ebe3', padding: 15 },
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
  playButton: {
    marginBottom: 10,
  },
  statusText: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.primary,
    marginBottom: 10,
  },
  hiddenPlayer: {
    width: 0,
    height: 0,
    opacity: 0,
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
