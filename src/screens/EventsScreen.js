import React, { useState, useEffect } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity, Linking,
  ActivityIndicator, RefreshControl,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, CHURCH } from '../constants/theme';

const EVENTS_URL = 'https://raw.githubusercontent.com/anirudhatalmale6-alt/hallelujah-church-app/master/events.json';

const DEFAULT_EVENTS = [
  { id: '1', title: 'Sunday 1st Service', day: 'Every Sunday', time: '8:00 AM', icon: 'musical-notes', description: 'Join us for praise, worship, and the Word of God.' },
  { id: '2', title: 'Sunday 2nd Service', day: 'Every Sunday', time: '11:00 AM', icon: 'musical-notes', description: 'Join us for our second worship service.' },
  { id: '3', title: 'Tuesday Bible Study', day: 'Every Tuesday', time: '7:00 PM', icon: 'book', description: 'Deepen your understanding of the Scriptures.' },
  { id: '4', title: 'Thursday Fasting - Prayer', day: 'Every Thursday', time: '9:00 AM', icon: 'hand-left', description: 'Come together in fasting and prayer.' },
];

const DEFAULT_SPECIAL = [
  { id: 's1', title: '6 Pou 6', date: 'July 5, 2026', icon: 'star', description: 'Special church event. Mark your calendar!' },
];

export default function EventsScreen() {
  const [events, setEvents] = useState(DEFAULT_EVENTS);
  const [specialEvents, setSpecialEvents] = useState(DEFAULT_SPECIAL);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchEvents = async () => {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 8000);
      const response = await fetch(EVENTS_URL + '?t=' + Date.now(), { signal: controller.signal });
      clearTimeout(timeoutId);
      if (!response.ok) return;
      const data = await response.json();
      if (data.events && data.events.length > 0) setEvents(data.events);
      if (data.specialEvents) setSpecialEvents(data.specialEvents);
    } catch {
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => { fetchEvents(); }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={COLORS.secondary} />
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={() => { setRefreshing(true); fetchEvents(); }} colors={[COLORS.secondary]} />
      }
    >
      <Text style={styles.header}>Events & Calendar</Text>
      <Text style={styles.subHeader}>
        Stay connected with what is happening at Hallelujah In The City.
      </Text>

      {events.map((event) => (
        <View key={event.id} style={styles.card}>
          <View style={styles.iconBox}>
            <Ionicons name={event.icon || 'calendar'} size={28} color={COLORS.textWhite} />
          </View>
          <View style={styles.cardContent}>
            <Text style={styles.eventTitle}>{event.title}</Text>
            <View style={styles.timeRow}>
              <Ionicons name="calendar-outline" size={16} color={COLORS.secondary} />
              <Text style={styles.timeText}>{event.day}{event.time ? ` at ${event.time}` : ''}</Text>
            </View>
            <Text style={styles.eventDesc}>{event.description}</Text>
          </View>
        </View>
      ))}

      {specialEvents.length > 0 && (
        <>
          <Text style={[styles.header, { marginTop: 20 }]}>Upcoming Special Events</Text>
          {specialEvents.map((event) => (
            <View key={event.id} style={styles.card}>
              <View style={[styles.iconBox, { backgroundColor: COLORS.secondary }]}>
                <Ionicons name={event.icon || 'star'} size={28} color={COLORS.textWhite} />
              </View>
              <View style={styles.cardContent}>
                <Text style={styles.eventTitle}>{event.title}</Text>
                <View style={styles.timeRow}>
                  <Ionicons name="calendar-outline" size={16} color={COLORS.secondary} />
                  <Text style={styles.timeText}>{event.date}{event.time ? ` at ${event.time}` : ''}</Text>
                </View>
                <Text style={styles.eventDesc}>{event.description}</Text>
              </View>
            </View>
          ))}
        </>
      )}

      <View style={styles.card}>
        <View style={styles.cardContent}>
          <Text style={styles.eventTitle}>Stay Updated</Text>
          <Text style={styles.eventDesc}>
            Follow us on Facebook for the latest events and announcements.
          </Text>
          <TouchableOpacity style={styles.fbBtn} onPress={() => Linking.openURL(CHURCH.facebook)}>
            <Ionicons name="logo-facebook" size={20} color="#fff" />
            <Text style={styles.fbBtnText}>Follow on Facebook</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={{ height: 20 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.primary },
  content: { padding: 15, paddingBottom: 20 },
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: COLORS.primary },
  header: { fontSize: 22, fontWeight: '800', color: COLORS.textWhite, marginBottom: 5 },
  subHeader: { fontSize: 14, color: 'rgba(255,255,255,0.7)', marginBottom: 15 },
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  iconBox: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  cardContent: { flex: 1 },
  eventTitle: { fontSize: 16, fontWeight: '700', color: COLORS.primary, marginBottom: 4 },
  timeRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 6, gap: 5 },
  timeText: { fontSize: 14, color: COLORS.secondary, fontWeight: '600' },
  eventDesc: { fontSize: 14, color: COLORS.textLight, lineHeight: 20 },
  fbBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1877F2',
    paddingVertical: 10,
    borderRadius: 8,
    gap: 8,
    marginTop: 10,
  },
  fbBtnText: { color: '#fff', fontWeight: '700', fontSize: 14 },
});
