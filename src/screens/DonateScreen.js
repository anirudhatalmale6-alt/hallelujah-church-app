import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity, Linking, ActivityIndicator,
} from 'react-native';
import { WebView } from 'react-native-webview';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, CHURCH } from '../constants/theme';

export default function DonateScreen() {
  const [loading, setLoading] = useState(true);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content} nestedScrollEnabled>
      {/* Donation Page (In-App) */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Give with Credit or Debit Card</Text>
        <View style={styles.webViewContainer}>
          {loading && (
            <View style={styles.loadingOverlay}>
              <ActivityIndicator size="large" color={COLORS.secondary} />
              <Text style={styles.loadingText}>Loading donation form...</Text>
            </View>
          )}
          <WebView
            source={{ uri: CHURCH.donationUrl }}
            style={styles.webView}
            javaScriptEnabled
            domStorageEnabled
            setSupportMultipleWindows={false}
            nestedScrollEnabled
            onLoadEnd={() => setLoading(false)}
            onShouldStartLoadWithRequest={(request) => {
              if (request.url.includes('hallelujahinthecity.org') || request.url.includes('stripe.com') || request.url.includes('js.stripe.com')) {
                return true;
              }
              Linking.openURL(request.url);
              return false;
            }}
          />
        </View>
      </View>

      {/* Divider */}
      <View style={styles.divider}><Text style={styles.dividerText}>OR</Text></View>

      {/* PayPal */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Give with PayPal</Text>
        <TouchableOpacity style={styles.paypalBtn} onPress={() => Linking.openURL(`https://www.paypal.com/donate?hosted_button_id=${CHURCH.paypalButtonId}`)}>
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
        Thank you for your generous support.
      </Text>

      <View style={{ height: 20 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f0ebe3' },
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
  webViewContainer: {
    height: 500,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#f9f9f9',
  },
  webView: { flex: 1 },
  loadingOverlay: {
    position: 'absolute',
    top: 0, left: 0, right: 0, bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    zIndex: 1,
  },
  loadingText: { marginTop: 10, fontSize: 14, color: COLORS.textLight },
  divider: { alignItems: 'center', marginVertical: 10 },
  dividerText: { fontSize: 15, fontWeight: '600', color: COLORS.textLight },
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
    color: COLORS.textLight,
    fontSize: 13,
    marginTop: 15,
    marginHorizontal: 20,
    lineHeight: 19,
  },
});
