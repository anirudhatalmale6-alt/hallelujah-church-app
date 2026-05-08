import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, CHURCH } from '../constants/theme';

export default function PrayerScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [request, setRequest] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async () => {
    if (!name.trim()) {
      Alert.alert('Required', 'Please enter your name.');
      return;
    }
    if (!request.trim()) {
      Alert.alert('Required', 'Please enter your prayer request.');
      return;
    }

    setSubmitting(true);
    try {
      const formData = new URLSearchParams();
      formData.append('form_type', 'prayer');
      formData.append('your_name', name.trim());
      formData.append('email', email.trim());
      formData.append('comments', request.trim());

      const response = await fetch(CHURCH.website + '/submit-form.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: formData.toString(),
      });

      setSubmitted(true);
    } catch (err) {
      Alert.alert('Error', 'Unable to submit your prayer request. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <View style={styles.successContainer}>
        <Ionicons name="checkmark-circle" size={80} color={COLORS.success} />
        <Text style={styles.successTitle}>Prayer Request Submitted</Text>
        <Text style={styles.successText}>
          Thank you for sharing your prayer request with us. Our prayer team will be praying for you.
        </Text>
        <TouchableOpacity style={styles.newBtn} onPress={() => {
          setSubmitted(false);
          setName('');
          setEmail('');
          setRequest('');
        }}>
          <Text style={styles.newBtnText}>Submit Another Request</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.headerSection}>
        <Ionicons name="hand-left" size={40} color={COLORS.secondary} />
        <Text style={styles.title}>Prayer Request</Text>
        <Text style={styles.subtitle}>
          Share your prayer needs with us. Our prayer team is here for you.
        </Text>
        <Text style={styles.verse}>
          "Do not be anxious about anything, but in every situation, by prayer and petition, with thanksgiving, present your requests to God." — Philippians 4:6
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Your Name *</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your name"
          value={name}
          onChangeText={setName}
        />

        <Text style={styles.label}>Email (optional)</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your email"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />

        <Text style={styles.label}>Prayer Request *</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Share your prayer request..."
          multiline
          numberOfLines={6}
          textAlignVertical="top"
          value={request}
          onChangeText={setRequest}
        />

        <TouchableOpacity
          style={[styles.submitBtn, submitting && styles.btnDisabled]}
          onPress={handleSubmit}
          disabled={submitting}
        >
          <Ionicons name="send" size={18} color="#fff" />
          <Text style={styles.submitText}>
            {submitting ? 'Submitting...' : 'Submit Prayer Request'}
          </Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.privacyNote}>
        Your prayer request is kept confidential and shared only with our prayer team.
      </Text>

      <View style={{ height: 20 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f0ebe3' },
  content: { paddingBottom: 20 },
  headerSection: {
    backgroundColor: COLORS.primary,
    paddingVertical: 25,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: COLORS.textWhite,
    marginTop: 8,
  },
  subtitle: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
    textAlign: 'center',
    marginTop: 5,
  },
  verse: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.6)',
    textAlign: 'center',
    fontStyle: 'italic',
    marginTop: 10,
    lineHeight: 18,
  },
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
  label: { fontSize: 15, fontWeight: '600', color: COLORS.text, marginBottom: 5, marginTop: 10 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    fontSize: 15,
    backgroundColor: '#fff',
  },
  textArea: { height: 120 },
  submitBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.primary,
    paddingVertical: 14,
    borderRadius: 8,
    gap: 8,
    marginTop: 15,
  },
  btnDisabled: { opacity: 0.6 },
  submitText: { color: '#fff', fontWeight: '700', fontSize: 16 },
  privacyNote: {
    textAlign: 'center',
    color: COLORS.textLight,
    fontSize: 12,
    marginTop: 15,
    marginHorizontal: 20,
  },
  successContainer: {
    flex: 1,
    backgroundColor: '#f0ebe3',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,
  },
  successTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: COLORS.primary,
    marginTop: 15,
  },
  successText: {
    fontSize: 15,
    color: COLORS.textLight,
    textAlign: 'center',
    marginTop: 10,
    lineHeight: 22,
  },
  newBtn: {
    marginTop: 20,
    paddingHorizontal: 25,
    paddingVertical: 12,
    backgroundColor: COLORS.primary,
    borderRadius: 8,
  },
  newBtnText: { color: '#fff', fontWeight: '700', fontSize: 15 },
});
