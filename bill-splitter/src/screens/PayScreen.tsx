import React, { useMemo } from 'react';
import { Button, FlatList, Linking, StyleSheet, Text, View } from 'react-native';
import SvgQRCode from 'react-native-qrcode-svg';
import { useReceipt } from '../context/ReceiptContext';
import { computeAllocations } from '../services/splitter';
import { buildUpiDeepLink } from '../services/upi';

export default function PayScreen() {
  const { receipt, people } = useReceipt();
  const peopleIds = useMemo(() => people.map((p) => p.id), [people]);
  const allocation = useMemo(() => (receipt ? computeAllocations(receipt, peopleIds) : undefined), [receipt, peopleIds]);

  if (!receipt) {
    return (
      <View style={styles.center}><Text>No receipt.</Text></View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={people}
        keyExtractor={(p) => p.id}
        renderItem={({ item: p }) => {
          const amount = allocation?.finalRoundedAmounts[p.id] || 0;
          const note = `Split - ${receipt.meta.merchant || 'Bill'} ${receipt.meta.date || ''}`.trim();
          const vpa = p.vpa || 'yourvpa@oksbi';
          const link = buildUpiDeepLink({ vpa, name: p.name, amount, note });
          return (
            <View style={styles.card}>
              <Text style={styles.name}>{p.name}</Text>
              <Text style={styles.amount}>₹ {amount.toFixed(2)}</Text>
              <View style={styles.qr}><SvgQRCode value={link} size={160} /></View>
              <Button title="Open in UPI app" onPress={() => Linking.openURL(link)} />
              <Text style={styles.link} selectable>{link}</Text>
            </View>
          );
        }}
        ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  card: { borderWidth: 1, borderColor: '#ddd', borderRadius: 12, padding: 12 },
  name: { fontWeight: '700', fontSize: 16 },
  amount: { fontWeight: '700', marginBottom: 8 },
  qr: { alignItems: 'center', justifyContent: 'center', marginVertical: 8 },
  link: { marginTop: 8, color: '#333' },
});