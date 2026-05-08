import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, Alert, Linking,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, CHURCH } from '../constants/theme';

export default function ContactScreen() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async () => {
    if (!name.trim()) { Alert.alert('Required', 'Please enter your name.'); return; }
    if (!phone.trim()) { Alert.alert('Required', 'Please enter your phone number.'); return; }
    if (!email.trim()) { Alert.alert('Required', 'Please enter your email.'); return; }
    if (!message.trim()) { Alert.alert('Required', 'Please enter your message.'); return; }

    setSubmitting(true);
    try {
      const formData = new URLSearchParams();
      formData.append('form_type', 'contact');
      formData.append('your_name', name.trim());
      formData.append('phone', phone.trim());
      formData.append('email', email.trim());
      formData.append('comments', message.trim());

      await fetch(CHURCH.website + '/submit-form.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: formData.toString(),
      });

      setSubmitted(true);
    } catch (err) {
      Alert.alert('Error', 'Unable to send your message. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <View style={styles.successContainer}>
        <Ionicons name="checkmark-circle" size={80} color={COLORS.success} />
        <Text style={styles.successTitle}>Message Sent!</Text>
        <Text style={styles.successText}>Thank you for reaching out. We will get back to you soon.</Text>
        <TouchableOpacity style={styles.newBtn} onPress={() => {
          setSubmitted(false); setName(''); setPhone(''); setEmail(''); setMessage('');
        }}>
          <Text style={styles.newBtnText}>Send Another Message</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Contact Info */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Get In Touch</Text>
        <TouchableOpacity style={styles.infoRow} onPress={() => Linking.openURL(`tel:${CHURCH.phone.replace(/[^\d]/g, '')}`)}>
          <Ionicons name="call-outline" size={22} color={COLORS.secondary} />
          <View>
            <Text style={styles.infoLabel}>Phone</Text>
            <Text style={styles.infoValue}>{CHURCH.phone}</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.infoRow} onPress={() => Linking.openURL(`mailto:${CHURCH.email}`)}>
          <Ionicons name="mail-outline" size={22} color={COLORS.secondary} />
          <View>
            <Text style={styles.infoLabel}>Email</Text>
            <Text style={styles.infoValue}>{CHURCH.email}</Text>
          </View>
        </TouchableOpacity>
        <View style={styles.infoRow}>
          <Ionicons name="location-outline" size={22} color={COLORS.secondary} />
          <View>
            <Text style={styles.infoLabel}>Location</Text>
            <Text style={styles.infoValue}>{CHURCH.address}</Text>
          </View>
        </View>
      </View>

      {/* Contact Form */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Send Us a Message</Text>

        <Text style={styles.label}>Name *</Text>
        <TextInput style={styles.input} placeholder="Your name" value={name} onChangeText={setName} />

        <Text style={styles.label}>Phone *</Text>
        <TextInput style={styles.input} placeholder="Your phone number" keyboardType="phone-pad" value={phone} onChangeText={setPhone} />

        <Text style={styles.label}>Email *</Text>
        <TextInput style={styles.input} placeholder="Your email" keyboardType="email-address" autoCapitalize="none" value={email} onChangeText={setEmail} />

        <Text style={styles.label}>Message *</Text>
        <TextInput style={[styles.input, styles.textArea]} placeholder="Your message..." multiline numberOfLines={5} textAlignVertical="top" value={message} onChangeText={setMessage} />

        <TouchableOpacity style={[styles.submitBtn, submitting && styles.btnDisabled]} onPress={handleSubmit} disabled={submitting}>
          <Ionicons name="send" size={18} color="#fff" />
          <Text style={styles.submitText}>{submitting ? 'Sending...' : 'Send Message'}</Text>
        </TouchableOpacity>
      </View>

      <View style={{ height: 20 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.primary },
  content: { paddingBottom: 20 },
  card: {
    backgroundColor: '#fff', marginHorizontal: 15, marginTop: 15, borderRadius: 10,
    padding: 18, shadowColor: '#000', shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1, shadowRadius: 3, elevation: 2,
  },
  cardTitle: {
    fontSize: 18, fontWeight: '700', color: COLORS.primary, marginBottom: 10,
    borderBottomWidth: 2, borderBottomColor: COLORS.secondary, paddingBottom: 8,
  },
  infoRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 10, gap: 12, borderBottomWidth: 1, borderBottomColor: '#f0f0f0' },
  infoLabel: { fontSize: 13, color: COLORS.textLight },
  infoValue: { fontSize: 15, fontWeight: '600', color: COLORS.text },
  label: { fontSize: 15, fontWeight: '600', color: COLORS.text, marginBottom: 5, marginTop: 10 },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 5, padding: 10, fontSize: 15, backgroundColor: '#fff' },
  textArea: { height: 100 },
  submitBtn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    backgroundColor: COLORS.primary, paddingVertical: 14, borderRadius: 8, gap: 8, marginTop: 15,
  },
  btnDisabled: { opacity: 0.6 },
  submitText: { color: '#fff', fontWeight: '700', fontSize: 16 },
  successContainer: { flex: 1, backgroundColor: COLORS.primary, justifyContent: 'center', alignItems: 'center', padding: 30 },
  successTitle: { fontSize: 22, fontWeight: '800', color: COLORS.textWhite, marginTop: 15 },
  successText: { fontSize: 15, color: 'rgba(255,255,255,0.8)', textAlign: 'center', marginTop: 10, lineHeight: 22 },
  newBtn: { marginTop: 20, paddingHorizontal: 25, paddingVertical: 12, backgroundColor: COLORS.primary, borderRadius: 8 },
  newBtnText: { color: '#fff', fontWeight: '700', fontSize: 15 },
});
