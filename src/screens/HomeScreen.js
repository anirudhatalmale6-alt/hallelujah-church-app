import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  View, Text, ScrollView, StyleSheet, Image, TouchableOpacity, Linking,
  useWindowDimensions, FlatList,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, CHURCH } from '../constants/theme';

const SLIDER_IMAGES = [
  { uri: CHURCH.website + '/JQuery/imageJQR-1.jpg' },
  { uri: CHURCH.website + '/JQuery/imageJQR-2.jpg' },
  { uri: CHURCH.website + '/JQuery/imageJQR-3.jpg' },
  { uri: CHURCH.website + '/JQuery/imageJQR-4.jpg' },
  { uri: CHURCH.website + '/JQuery/imageJQR-5.jpg' },
];

const SLIDESHOW_GALLERIES = [
  { title: 'Slideshow 1', thumb: CHURCH.website + '/slideshows/thumb-slideshow-1.jpg', images: 10, prefix: 'Fslide1' },
  { title: 'Slideshow 2', thumb: CHURCH.website + '/slideshows/thumb-slideshow-2.jpg', images: 10, prefix: 'Fslide2' },
  { title: 'Slideshow 3', thumb: CHURCH.website + '/slideshows/thumb-slideshow-3.jpg', images: 10, prefix: 'Fslide3' },
  { title: 'Slideshow 4', thumb: CHURCH.website + '/slideshows/thumb-slideshow-4.jpg', images: 10, prefix: 'Fslide4' },
];

const QuickLink = ({ icon, label, onPress, color }) => (
  <TouchableOpacity style={styles.quickLink} onPress={onPress}>
    <View style={[styles.quickIcon, color && { backgroundColor: color }]}>
      <Ionicons name={icon} size={26} color={COLORS.textWhite} />
    </View>
    <Text style={styles.quickLabel}>{label}</Text>
  </TouchableOpacity>
);

export default function HomeScreen({ navigation }) {
  const [activeSlide, setActiveSlide] = useState(0);
  const flatListRef = useRef(null);
  const { width: screenWidth } = useWindowDimensions();
  const sliderHeight = Math.round(screenWidth * 0.3);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide(prev => {
        const next = (prev + 1) % SLIDER_IMAGES.length;
        flatListRef.current?.scrollToIndex({ index: next, animated: true });
        return next;
      });
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const getItemLayout = useCallback((_, index) => ({
    length: screenWidth,
    offset: screenWidth * index,
    index,
  }), [screenWidth]);

  const overlayHeight = 52;
  const totalSliderHeight = sliderHeight + overlayHeight;

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Image Slider */}
      <View style={[styles.sliderContainer, { height: totalSliderHeight }]}>
        <FlatList
          ref={flatListRef}
          data={SLIDER_IMAGES}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          keyExtractor={(_, i) => String(i)}
          getItemLayout={getItemLayout}
          onMomentumScrollEnd={(e) => {
            const index = Math.round(e.nativeEvent.contentOffset.x / screenWidth);
            setActiveSlide(index);
          }}
          renderItem={({ item }) => (
            <Image
              source={{ uri: item.uri }}
              style={{ width: screenWidth, height: sliderHeight, resizeMode: 'cover' }}
            />
          )}
        />
        <View style={styles.overlay}>
          <Image
            source={require('../../assets/hc-logo-small.png')}
            style={styles.heroLogo}
          />
          <View>
            <Text style={styles.heroTitle}>{CHURCH.name}</Text>
            <Text style={styles.heroSubtitle}>{CHURCH.tagline}</Text>
          </View>
        </View>
        <View style={[styles.dots, { bottom: overlayHeight + 8 }]}>
          {SLIDER_IMAGES.map((_, i) => (
            <View key={i} style={[styles.dot, activeSlide === i && styles.dotActive]} />
          ))}
        </View>
      </View>

      {/* Verse */}
      <View style={styles.verseCard}>
        <Ionicons name="book-outline" size={20} color={COLORS.secondary} />
        <Text style={styles.verseText}>
          "For where two or three gather in my name, there am I with them."
        </Text>
        <Text style={styles.verseRef}>— Matthew 18:20</Text>
      </View>

      {/* Quick Links */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Quick Links</Text>
        <View style={styles.quickGrid}>
          <QuickLink icon="play-circle" label="Watch Live" onPress={() => navigation.navigate('Live')} color="#E91E63" />
          <QuickLink icon="heart" label="Give" onPress={() => navigation.navigate('Give')} color="#FF9800" />
          <QuickLink icon="hand-left" label="Prayer" onPress={() => navigation.navigate('MoreTab', { screen: 'Prayer' })} color="#9C27B0" />
          <QuickLink icon="call" label="Contact" onPress={() => navigation.navigate('MoreTab', { screen: 'Contact' })} color="#4CAF50" />
          <QuickLink icon="people" label="Connect" onPress={() => navigation.navigate('MoreTab', { screen: 'Connection' })} color="#00BCD4" />
          <QuickLink icon="calendar" label="Events" onPress={() => navigation.navigate('MoreTab', { screen: 'Events' })} color="#2196F3" />
        </View>
      </View>

      {/* Service Times */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Service Times</Text>
        {[
          { day: 'Sunday 1st Service', time: '8:00 AM', icon: 'sunny-outline' },
          { day: 'Sunday 2nd Service', time: '11:00 AM', icon: 'sunny-outline' },
          { day: 'Tuesday Bible Study', time: '7:00 PM', icon: 'book-outline' },
          { day: 'Thursday Fasting & Prayer', time: '9:00 AM', icon: 'flame-outline' },
        ].map((service, i) => (
          <View key={i} style={styles.serviceRow}>
            <View style={styles.serviceIconWrap}>
              <Ionicons name={service.icon} size={18} color={COLORS.secondary} />
            </View>
            <View style={styles.serviceInfo}>
              <Text style={styles.serviceDay}>{service.day}</Text>
              <Text style={styles.serviceTime}>{service.time}</Text>
            </View>
          </View>
        ))}
      </View>

      {/* Visit Us - BEFORE Past Sermons */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Visit Us</Text>
        <TouchableOpacity style={styles.contactRow} onPress={() => Linking.openURL(`tel:${CHURCH.phone.replace(/[^\d]/g, '')}`)}>
          <Ionicons name="call-outline" size={20} color={COLORS.secondary} />
          <Text style={styles.contactText}>{CHURCH.phone}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.contactRow} onPress={() => Linking.openURL(`mailto:${CHURCH.email}`)}>
          <Ionicons name="mail-outline" size={20} color={COLORS.secondary} />
          <Text style={styles.contactText}>{CHURCH.email}</Text>
        </TouchableOpacity>
        <View style={styles.contactRow}>
          <Ionicons name="location-outline" size={20} color={COLORS.secondary} />
          <Text style={styles.contactText}>{CHURCH.address}</Text>
        </View>
      </View>

      {/* Past Sermons */}
      <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('MoreTab', { screen: 'PastSermons' })}>
        <Text style={styles.cardTitle}>Past Sermons</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.photoScroll}>
          {['o1N0TXOf65M', 'bBY-tfHTO7g', 'uv8o_rGSbw0', 'gTUZ4foHb98', 'DYaV4B0SB0g'].map(vid => (
            <Image
              key={vid}
              source={{ uri: `https://i.ytimg.com/vi/${vid}/mqdefault.jpg` }}
              style={styles.photoThumb}
            />
          ))}
        </ScrollView>
        <View style={styles.viewAllRow}>
          <Text style={styles.viewAllText}>View All Sermons</Text>
          <Ionicons name="chevron-forward" size={18} color={COLORS.secondary} />
        </View>
      </TouchableOpacity>

      {/* Photo Galleries */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Photo Galleries</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {SLIDESHOW_GALLERIES.map((gallery, i) => (
            <TouchableOpacity
              key={i}
              style={styles.galleryItem}
              onPress={() => navigation.navigate('MoreTab', {
                screen: 'Gallery',
                params: { title: gallery.title, prefix: gallery.prefix, count: gallery.images },
              })}
            >
              <Image source={{ uri: gallery.thumb }} style={styles.galleryThumb} />
              <Text style={styles.galleryLabel}>{gallery.title}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Social Media */}
      <View style={styles.socialRow}>
        <TouchableOpacity style={styles.socialBtn} onPress={() => Linking.openURL(CHURCH.facebook)}>
          <Ionicons name="logo-facebook" size={30} color="#1877F2" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialBtn} onPress={() => Linking.openURL(CHURCH.youtube)}>
          <Ionicons name="logo-youtube" size={30} color="#FF0000" />
        </TouchableOpacity>
      </View>

      <View style={{ height: 20 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f0ebe3' },
  content: { paddingBottom: 20 },
  sliderContainer: { position: 'relative', backgroundColor: '#2a1a08' },
  overlay: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(90,62,27,0.85)',
    paddingVertical: 10,
    paddingHorizontal: 15,
    gap: 12,
  },
  heroLogo: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#5a3e1b',
  },
  heroTitle: {
    fontSize: 18, fontWeight: '800', color: COLORS.textWhite,
  },
  heroSubtitle: {
    fontSize: 12, color: '#d4a853', fontWeight: '600', marginTop: 1,
  },
  dots: {
    position: 'absolute', left: 0, right: 0,
    flexDirection: 'row', justifyContent: 'center', gap: 6,
  },
  dot: { width: 8, height: 8, borderRadius: 4, backgroundColor: 'rgba(255,255,255,0.4)' },
  dotActive: { backgroundColor: '#d4a853', width: 20 },
  verseCard: {
    backgroundColor: COLORS.primary, marginHorizontal: 15, marginTop: 12, borderRadius: 10,
    padding: 15, alignItems: 'center',
  },
  verseText: {
    fontSize: 14, color: 'rgba(255,255,255,0.9)', textAlign: 'center',
    fontStyle: 'italic', lineHeight: 20, marginTop: 6,
  },
  verseRef: { fontSize: 12, color: '#d4a853', marginTop: 5, fontWeight: '600' },
  card: {
    backgroundColor: '#fff', marginHorizontal: 15, marginTop: 12, borderRadius: 10,
    padding: 18, shadowColor: '#000', shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1, shadowRadius: 3, elevation: 2,
  },
  cardTitle: {
    fontSize: 18, fontWeight: '700', color: COLORS.primary, marginBottom: 12,
    borderBottomWidth: 2, borderBottomColor: COLORS.secondary, paddingBottom: 8,
  },
  quickGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  quickLink: { width: '30%', alignItems: 'center', marginBottom: 15 },
  quickIcon: {
    width: 52, height: 52, borderRadius: 14, backgroundColor: COLORS.primary,
    justifyContent: 'center', alignItems: 'center', marginBottom: 6,
  },
  quickLabel: { fontSize: 12, fontWeight: '600', color: COLORS.text, textAlign: 'center' },
  serviceRow: {
    flexDirection: 'row', alignItems: 'center', paddingVertical: 10,
    borderBottomWidth: 1, borderBottomColor: '#f0f0f0',
  },
  serviceIconWrap: {
    width: 36, height: 36, borderRadius: 18, backgroundColor: '#fdf6e3',
    justifyContent: 'center', alignItems: 'center',
  },
  serviceInfo: { marginLeft: 12, flex: 1 },
  serviceDay: { fontSize: 15, fontWeight: '600', color: COLORS.text },
  serviceTime: { fontSize: 14, color: COLORS.textLight, marginTop: 2 },
  photoScroll: { marginTop: 5 },
  photoThumb: {
    width: 150, height: 90, borderRadius: 8, marginRight: 10, backgroundColor: '#ddd',
  },
  viewAllRow: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    marginTop: 10, paddingTop: 10, borderTopWidth: 1, borderTopColor: '#f0f0f0',
  },
  viewAllText: { fontSize: 14, fontWeight: '600', color: COLORS.secondary, marginRight: 4 },
  galleryItem: { marginRight: 12, alignItems: 'center' },
  galleryThumb: {
    width: 140, height: 100, borderRadius: 8, backgroundColor: '#ddd',
  },
  galleryLabel: { fontSize: 13, fontWeight: '600', color: COLORS.text, marginTop: 6 },
  contactRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 8 },
  contactText: { fontSize: 15, color: COLORS.text, marginLeft: 10 },
  socialRow: {
    flexDirection: 'row', justifyContent: 'center', marginTop: 12, gap: 20,
  },
  socialBtn: {
    width: 50, height: 50, borderRadius: 25, backgroundColor: '#fff',
    justifyContent: 'center', alignItems: 'center', shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.1, shadowRadius: 2, elevation: 2,
  },
});
