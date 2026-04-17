import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Picker } from 'react-native';
import { COLORS, CHURCH } from '../constants/theme';

const SelectField = ({ label, value, onValueChange, items }) => (
  <View style={styles.selectContainer}>
    <Text style={styles.label}>{label}</Text>
    <View style={styles.selectBox}>
      <TouchableOpacity
        style={styles.selectTouchable}
        onPress={() => {
          // On mobile, we'll cycle through options or show alert picker
          const currentIdx = items.findIndex(i => i.value === value);
          const nextIdx = (currentIdx + 1) % items.length;
          onValueChange(items[nextIdx].value);
        }}
      >
        <Text style={styles.selectText}>
          {items.find(i => i.value === value)?.label || 'Select...'}
        </Text>
        <Ionicons name="chevron-down" size={18} color={COLORS.textLight} />
      </TouchableOpacity>
    </View>
  </View>
);

export default function ConnectionScreen() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [regarding, setRegarding] = useState('First Time Visitor');
  const [ageGroup, setAgeGroup] = useState('');
  const [hearAbout, setHearAbout] = useState('');
  const [likeTo, setLikeTo] = useState('');
  const [ministry, setMinistry] = useState('');
  const [comments, setComments] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async () => {
    if (!name.trim()) { Alert.alert('Required', 'Please enter your name.'); return; }
    if (!phone.trim()) { Alert.alert('Required', 'Please enter your phone number.'); return; }

    setSubmitting(true);
    try {
      const formData = new URLSearchParams();
      formData.append('form_type', 'connection');
      formData.append('your_name', name.trim());
      formData.append('phone', phone.trim());
      formData.append('email', email.trim());
      formData.append('address', address.trim());
      formData.append('city', city.trim());
      formData.append('state', state.trim());
      formData.append('zip_code', zipCode.trim());
      formData.append('regarding', regarding);
      formData.append('age_group', ageGroup);
      formData.append('hear_about', hearAbout);
      formData.append('like_to', likeTo);
      formData.append('ministry', ministry);
      formData.append('comments', comments.trim());

      await fetch(CHURCH.website + '/submit-form.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: formData.toString(),
      });

      setSubmitted(true);
    } catch (err) {
      Alert.alert('Error', 'Unable to submit. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <View style={styles.successContainer}>
        <Ionicons name="checkmark-circle" size={80} color={COLORS.success} />
        <Text style={styles.successTitle}>Connected!</Text>
        <Text style={styles.successText}>
          Thank you for connecting with us. We look forward to welcoming you!
        </Text>
        <TouchableOpacity style={styles.newBtn} onPress={() => {
          setSubmitted(false); setName(''); setPhone(''); setEmail('');
          setAddress(''); setCity(''); setState(''); setZipCode('');
          setComments('');
        }}>
          <Text style={styles.newBtnText}>Submit Another Card</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.headerSection}>
        <Ionicons name="people" size={40} color={COLORS.secondary} />
        <Text style={styles.title}>Connection Card</Text>
        <Text style={styles.subtitle}>We would love to know more about you!</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Your Information</Text>

        <Text style={styles.label}>Name *</Text>
        <TextInput style={styles.input} placeholder="Your name" value={name} onChangeText={setName} />

        <Text style={styles.label}>Phone *</Text>
        <TextInput style={styles.input} placeholder="Your phone number" keyboardType="phone-pad" value={phone} onChangeText={setPhone} />

        <Text style={styles.label}>Email</Text>
        <TextInput style={styles.input} placeholder="Your email" keyboardType="email-address" autoCapitalize="none" value={email} onChangeText={setEmail} />

        <Text style={styles.label}>Address</Text>
        <TextInput style={styles.input} placeholder="Street address" value={address} onChangeText={setAddress} />

        <View style={styles.row}>
          <View style={styles.halfField}>
            <Text style={styles.label}>City</Text>
            <TextInput style={styles.input} placeholder="City" value={city} onChangeText={setCity} />
          </View>
          <View style={styles.quarterField}>
            <Text style={styles.label}>State</Text>
            <TextInput style={styles.input} placeholder="ST" value={state} onChangeText={setState} maxLength={2} autoCapitalize="characters" />
          </View>
          <View style={styles.quarterField}>
            <Text style={styles.label}>Zip</Text>
            <TextInput style={styles.input} placeholder="Zip" keyboardType="number-pad" value={zipCode} onChangeText={setZipCode} />
          </View>
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Tell Us More</Text>

        <Text style={styles.label}>I am a:</Text>
        <View style={styles.radioGroup}>
          {['First Time Visitor', 'Returning Visitor', 'Regular Attendee', 'Member'].map(opt => (
            <TouchableOpacity key={opt} style={styles.radioRow} onPress={() => setRegarding(opt)}>
              <Ionicons name={regarding === opt ? 'radio-button-on' : 'radio-button-off'} size={20} color={regarding === opt ? COLORS.secondary : COLORS.textLight} />
              <Text style={styles.radioText}>{opt}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <SelectField label="Age Group" value={ageGroup} onValueChange={setAgeGroup} items={[
          { label: 'Select...', value: '' },
          { label: 'Under 18', value: 'Under 18' },
          { label: '18-25', value: '18-25' },
          { label: '26-35', value: '26-35' },
          { label: '36-45', value: '36-45' },
          { label: '46-55', value: '46-55' },
          { label: '56-65', value: '56-65' },
          { label: '65+', value: '65+' },
        ]} />

        <SelectField label="How did you hear about us?" value={hearAbout} onValueChange={setHearAbout} items={[
          { label: 'Select...', value: '' },
          { label: 'Social Media', value: 'Social Media' },
          { label: 'Friend/Family', value: 'Friend/Family' },
          { label: 'Website', value: 'Website' },
          { label: 'Drove By', value: 'Drove By' },
          { label: 'Other', value: 'Other' },
        ]} />

        <SelectField label="I would like to:" value={likeTo} onValueChange={setLikeTo} items={[
          { label: 'Select...', value: '' },
          { label: 'Learn more about the church', value: 'Learn more about the church' },
          { label: 'Join a small group', value: 'Join a small group' },
          { label: 'Volunteer', value: 'Volunteer' },
          { label: 'Speak with the Pastor', value: 'Speak with the Pastor' },
          { label: 'Receive prayer', value: 'Receive prayer' },
        ]} />

        <SelectField label="Ministry of interest:" value={ministry} onValueChange={setMinistry} items={[
          { label: 'Select...', value: '' },
          { label: 'Worship Team', value: 'Worship Team' },
          { label: 'Youth Ministry', value: 'Youth Ministry' },
          { label: 'Outreach', value: 'Outreach' },
          { label: 'Prayer Team', value: 'Prayer Team' },
          { label: 'Media/Tech', value: 'Media/Tech' },
        ]} />

        <Text style={styles.label}>Comments</Text>
        <TextInput style={[styles.input, styles.textArea]} placeholder="Any comments or questions..." multiline numberOfLines={4} textAlignVertical="top" value={comments} onChangeText={setComments} />

        <TouchableOpacity style={[styles.submitBtn, submitting && styles.btnDisabled]} onPress={handleSubmit} disabled={submitting}>
          <Ionicons name="send" size={18} color="#fff" />
          <Text style={styles.submitText}>{submitting ? 'Submitting...' : 'Submit Connection Card'}</Text>
        </TouchableOpacity>
      </View>

      <View style={{ height: 20 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f0ebe3' },
  content: { paddingBottom: 20 },
  headerSection: { backgroundColor: COLORS.primary, paddingVertical: 25, paddingHorizontal: 20, alignItems: 'center' },
  title: { fontSize: 24, fontWeight: '800', color: COLORS.textWhite, marginTop: 8 },
  subtitle: { fontSize: 14, color: 'rgba(255,255,255,0.8)', marginTop: 5 },
  card: {
    backgroundColor: '#fff', marginHorizontal: 15, marginTop: 15, borderRadius: 10,
    padding: 18, shadowColor: '#000', shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1, shadowRadius: 3, elevation: 2,
  },
  sectionTitle: {
    fontSize: 18, fontWeight: '700', color: COLORS.primary, marginBottom: 10,
    borderBottomWidth: 2, borderBottomColor: COLORS.secondary, paddingBottom: 8,
  },
  label: { fontSize: 15, fontWeight: '600', color: COLORS.text, marginBottom: 5, marginTop: 10 },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 5, padding: 10, fontSize: 15, backgroundColor: '#fff' },
  textArea: { height: 80 },
  row: { flexDirection: 'row', gap: 10 },
  halfField: { flex: 2 },
  quarterField: { flex: 1 },
  radioGroup: { marginTop: 5 },
  radioRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 8, gap: 8 },
  radioText: { fontSize: 15, color: COLORS.text },
  selectContainer: { marginBottom: 5 },
  selectBox: { borderWidth: 1, borderColor: '#ccc', borderRadius: 5, backgroundColor: '#fff' },
  selectTouchable: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 10 },
  selectText: { fontSize: 15, color: COLORS.text },
  submitBtn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    backgroundColor: COLORS.primary, paddingVertical: 14, borderRadius: 8, gap: 8, marginTop: 15,
  },
  btnDisabled: { opacity: 0.6 },
  submitText: { color: '#fff', fontWeight: '700', fontSize: 16 },
  successContainer: { flex: 1, backgroundColor: '#f0ebe3', justifyContent: 'center', alignItems: 'center', padding: 30 },
  successTitle: { fontSize: 22, fontWeight: '800', color: COLORS.primary, marginTop: 15 },
  successText: { fontSize: 15, color: COLORS.textLight, textAlign: 'center', marginTop: 10, lineHeight: 22 },
  newBtn: { marginTop: 20, paddingHorizontal: 25, paddingVertical: 12, backgroundColor: COLORS.primary, borderRadius: 8 },
  newBtnText: { color: '#fff', fontWeight: '700', fontSize: 15 },
});
