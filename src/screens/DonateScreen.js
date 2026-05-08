import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Alert, Linking, Modal,
} from 'react-native';
import { WebView } from 'react-native-webview';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, CHURCH } from '../constants/theme';

const CATEGORIES = [
  { key: 'tithes', label: 'Tithes' },
  { key: 'offering', label: 'General Offering' },
  { key: 'building', label: 'Building Fund' },
  { key: 'events', label: 'Special Events' },
  { key: 'other', label: 'Other' },
];

const PRESETS = [25, 50, 100, 250, 500];

export default function DonateScreen() {
  const [amounts, setAmounts] = useState({});
  const [otherSpecify, setOtherSpecify] = useState('');
  const [donorName, setDonorName] = useState('');
  const [donorEmail, setDonorEmail] = useState('');
  const [activePreset, setActivePreset] = useState(null);
  const [showCheckout, setShowCheckout] = useState(false);

  const setAmount = (key, value) => {
    setAmounts(prev => ({ ...prev, [key]: value }));
  };

  const selectPreset = (val) => {
    setActivePreset(val);
    setAmounts(prev => ({ ...prev, offering: String(val) }));
  };

  const getTotal = () => {
    return Object.values(amounts).reduce((sum, val) => sum + (parseFloat(val) || 0), 0);
  };

  const [checkoutHtml, setCheckoutHtml] = useState('');

  const handleStripeCheckout = () => {
    const total = getTotal();
    if (total < 1) {
      Alert.alert('Error', 'Please enter a donation amount of at least $1.00 in one or more categories.');
      return;
    }
    if ((parseFloat(amounts.other) || 0) > 0 && !otherSpecify.trim()) {
      Alert.alert('Error', 'Please specify what your "Other" donation is for.');
      return;
    }
    const html = `<!DOCTYPE html><html><head><meta name="viewport" content="width=device-width,initial-scale=1"></head><body onload="document.forms[0].submit()"><p style="text-align:center;margin-top:40%;font-family:sans-serif;color:#5a3e1b">Processing your donation...</p><form method="POST" action="${CHURCH.stripeCheckoutUrl}"><input type="hidden" name="amount_tithes" value="${amounts.tithes || '0'}"><input type="hidden" name="amount_offering" value="${amounts.offering || '0'}"><input type="hidden" name="amount_building" value="${amounts.building || '0'}"><input type="hidden" name="amount_events" value="${amounts.events || '0'}"><input type="hidden" name="amount_other" value="${amounts.other || '0'}"><input type="hidden" name="other_specify" value="${otherSpecify}"><input type="hidden" name="donor_name" value="${donorName || 'Anonymous'}"><input type="hidden" name="donor_email" value="${donorEmail}"></form></body></html>`;
    setCheckoutHtml(html);
    setShowCheckout(true);
  };

  const handlePayPal = () => {
    Linking.openURL(`https://www.paypal.com/donate?hosted_button_id=${CHURCH.paypalButtonId}`);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Stripe / Card Section */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Give with Credit or Debit Card</Text>
        <Text style={styles.note}>Enter an amount for each category you would like to give to.</Text>

        {CATEGORIES.map((cat) => (
          <View key={cat.key} style={styles.catRow}>
            <Text style={styles.catLabel}>{cat.label}</Text>
            {cat.key === 'offering' && (
              <View style={styles.presets}>
                {PRESETS.map(val => (
                  <TouchableOpacity
                    key={val}
                    style={[styles.presetBtn, activePreset === val && styles.presetActive]}
                    onPress={() => selectPreset(val)}
                  >
                    <Text style={[styles.presetText, activePreset === val && styles.presetTextActive]}>
                      ${val}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
            <TextInput
              style={styles.amountInput}
              placeholder="0.00"
              keyboardType="decimal-pad"
              value={amounts[cat.key] || ''}
              onChangeText={(val) => {
                setAmount(cat.key, val);
                if (cat.key === 'offering') setActivePreset(null);
              }}
            />
            {cat.key === 'other' && (parseFloat(amounts.other) || 0) > 0 && (
              <TextInput
                style={styles.specifyInput}
                placeholder="Please specify..."
                value={otherSpecify}
                onChangeText={setOtherSpecify}
              />
            )}
          </View>
        ))}

        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>TOTAL</Text>
          <Text style={styles.totalAmount}>${getTotal().toFixed(2)}</Text>
        </View>

        <TextInput
          style={styles.input}
          placeholder="Your Name (optional)"
          value={donorName}
          onChangeText={setDonorName}
        />
        <TextInput
          style={styles.input}
          placeholder="Your Email (optional - for receipt)"
          keyboardType="email-address"
          autoCapitalize="none"
          value={donorEmail}
          onChangeText={setDonorEmail}
        />

        <TouchableOpacity style={styles.stripeBtn} onPress={handleStripeCheckout}>
          <Ionicons name="card-outline" size={20} color="#fff" />
          <Text style={styles.stripeBtnText}>Donate with Card</Text>
        </TouchableOpacity>
      </View>

      {/* Divider */}
      <View style={styles.divider}><Text style={styles.dividerText}>OR</Text></View>

      {/* PayPal */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Give with PayPal</Text>
        <TouchableOpacity style={styles.paypalBtn} onPress={handlePayPal}>
          <Ionicons name="logo-paypal" size={22} color="#fff" />
          <Text style={styles.paypalBtnText}>Donate with PayPal</Text>
        </TouchableOpacity>
      </View>

      {/* Divider */}
      <View style={styles.divider}><Text style={styles.dividerText}>OR</Text></View>

      {/* Zelle / CashApp */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Give with Zelle or CashApp</Text>
        <View style={styles.altRow}>
          <Ionicons name="wallet-outline" size={22} color={COLORS.secondary} />
          <View style={styles.altInfo}>
            <Text style={styles.altLabel}>Zelle</Text>
            <Text style={styles.altValue}>{CHURCH.zelle}</Text>
          </View>
        </View>
        <View style={styles.altRow}>
          <Ionicons name="cash-outline" size={22} color={COLORS.secondary} />
          <View style={styles.altInfo}>
            <Text style={styles.altLabel}>CashApp</Text>
            <Text style={styles.altValue}>{CHURCH.cashapp}</Text>
          </View>
        </View>
      </View>

      <Text style={styles.secureNote}>
        All transactions are secure and encrypted.{'\n'}
        Hallelujah In The City is a registered nonprofit organization.{'\n\n'}
        For gifts of $10,000 or more, please contact us directly at {CHURCH.phone} to arrange a bank wire transfer.{'\n\n'}
        Thank you for your support.
      </Text>

      <View style={{ height: 20 }} />

      <Modal visible={showCheckout} animationType="slide" onRequestClose={() => setShowCheckout(false)}>
        <View style={{ flex: 1, backgroundColor: '#fff' }}>
          <View style={styles.modalHeader}>
            <TouchableOpacity onPress={() => setShowCheckout(false)} style={styles.closeBtn}>
              <Ionicons name="close" size={28} color={COLORS.textWhite} />
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Complete Donation</Text>
          </View>
          <WebView
            source={{ html: checkoutHtml }}
            style={{ flex: 1 }}
            javaScriptEnabled
            domStorageEnabled
            setSupportMultipleWindows={false}
            originWhitelist={['*']}
          />
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.primary },
  content: { paddingBottom: 20 },
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
  cardTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.primary,
    marginBottom: 10,
    borderBottomWidth: 2,
    borderBottomColor: COLORS.secondary,
    paddingBottom: 8,
  },
  note: {
    fontSize: 13,
    color: COLORS.textLight,
    fontStyle: 'italic',
    marginBottom: 12,
  },
  catRow: { marginBottom: 14 },
  catLabel: { fontSize: 15, fontWeight: '600', color: COLORS.text, marginBottom: 4 },
  presets: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginBottom: 6,
  },
  presetBtn: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderWidth: 2,
    borderColor: COLORS.secondary,
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  presetActive: { backgroundColor: COLORS.secondary },
  presetText: { fontSize: 14, fontWeight: '600', color: COLORS.primary },
  presetTextActive: { color: '#fff' },
  amountInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    fontSize: 15,
    backgroundColor: '#fff',
  },
  specifyInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    fontSize: 14,
    backgroundColor: '#fff',
    marginTop: 6,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 2,
    borderTopColor: COLORS.secondary,
    paddingTop: 12,
    marginBottom: 15,
  },
  totalLabel: { fontSize: 18, fontWeight: '700', color: COLORS.primary },
  totalAmount: { fontSize: 22, fontWeight: '800', color: COLORS.primary },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    fontSize: 15,
    marginBottom: 10,
    backgroundColor: '#fff',
  },
  stripeBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.primary,
    paddingVertical: 14,
    borderRadius: 8,
    gap: 8,
    marginTop: 5,
  },
  stripeBtnText: { color: '#fff', fontWeight: '700', fontSize: 16 },
  divider: { alignItems: 'center', marginVertical: 10 },
  dividerText: { fontSize: 15, fontWeight: '600', color: '#d4a853' },
  paypalBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0070ba',
    paddingVertical: 14,
    borderRadius: 8,
    gap: 8,
  },
  paypalBtnText: { color: '#fff', fontWeight: '700', fontSize: 16 },
  altRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  altInfo: { marginLeft: 12 },
  altLabel: { fontSize: 14, fontWeight: '700', color: COLORS.text },
  altValue: { fontSize: 16, color: COLORS.primary, marginTop: 2 },
  secureNote: {
    textAlign: 'center',
    color: 'rgba(255,255,255,0.7)',
    fontSize: 13,
    marginTop: 15,
    marginHorizontal: 20,
    lineHeight: 19,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    paddingTop: 50,
    paddingBottom: 12,
    paddingHorizontal: 15,
  },
  closeBtn: { marginRight: 12 },
  modalTitle: { flex: 1, color: COLORS.textWhite, fontSize: 16, fontWeight: '600' },
});
