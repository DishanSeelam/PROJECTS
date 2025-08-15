import React, { useMemo, useState } from 'react';
import { Button, FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useReceipt } from '../context/ReceiptContext';
import type { Person, ReceiptItem } from '../types';
import { computeAllocations } from '../services/splitter';

export default function AssignScreen({ navigation }: any) {
  const { receipt, setReceipt, people, addPerson, removePerson } = useReceipt();
  const [name, setName] = useState('');
  const [vpa, setVpa] = useState('');

  const peopleIds = useMemo(() => people.map((p) => p.id), [people]);
  const allocation = useMemo(() => (receipt ? computeAllocations(receipt, peopleIds) : undefined), [receipt, peopleIds]);

  if (!receipt) {
    return (
      <View style={styles.center}> 
        <Text>No parsed receipt. Go back and parse.</Text>
        <Button title="Back" onPress={() => navigation.goBack()} />
      </View>
    );
  }

  const toggleOwner = (item: ReceiptItem, personId: string) => {
    const owners = new Set(item.owners);
    if (owners.has(personId)) owners.delete(personId);
    else owners.add(personId);
    setReceipt({
      ...receipt,
      items: receipt.items.map((it) => (it.id === item.id ? { ...it, owners: Array.from(owners) } : it)),
    });
  };

  const addNewPerson = () => {
    if (!name.trim()) return;
    const person: Person = { id: Math.random().toString(36).slice(2), name: name.trim(), vpa: vpa.trim() || undefined };
    addPerson(person);
    setName('');
    setVpa('');
  };

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <TextInput style={styles.input} placeholder="Name" value={name} onChangeText={setName} />
        <TextInput style={styles.input} placeholder="VPA (optional)" value={vpa} onChangeText={setVpa} />
        <Button title="Add" onPress={addNewPerson} />
      </View>

      <FlatList
        data={receipt.items}
        keyExtractor={(it) => it.id}
        ListHeaderComponent={() => (
          <View style={styles.sectionHeader}><Text style={styles.sectionTitle}>Items</Text></View>
        )}
        renderItem={({ item }) => (
          <View style={styles.itemRow}>
            <View style={{ flex: 1 }}>
              <Text style={styles.itemName}>{item.name} x{item.quantity}</Text>
              <Text style={styles.itemPrice}>₹ {item.totalPrice.toFixed(2)}</Text>
            </View>
            <View style={styles.owners}>
              {people.map((p) => (
                <TouchableOpacity
                  key={p.id}
                  style={[styles.chip, item.owners.includes(p.id) && styles.chipActive]}
                  onPress={() => toggleOwner(item, p.id)}
                >
                  <Text style={[styles.chipText, item.owners.includes(p.id) && styles.chipTextActive]}>{p.name}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}
      />

      <FlatList
        data={people}
        keyExtractor={(p) => p.id}
        ListHeaderComponent={() => (
          <View style={styles.sectionHeader}><Text style={styles.sectionTitle}>People</Text></View>
        )}
        renderItem={({ item: p }) => (
          <View style={styles.personRow}>
            <View style={{ flex: 1 }}>
              <Text style={styles.personName}>{p.name}</Text>
              <Text style={styles.personMeta}>{p.vpa || 'No VPA'}</Text>
            </View>
            <Text style={styles.amount}>₹ {(allocation?.finalRoundedAmounts[p.id] || 0).toFixed(2)}</Text>
            <TouchableOpacity onPress={() => removePerson(p.id)}>
              <Text style={styles.remove}>Remove</Text>
            </TouchableOpacity>
          </View>
        )}
      />

      <Button title="Generate UPI" onPress={() => navigation.navigate('Pay')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, gap: 12 },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 12 },
  row: { flexDirection: 'row', gap: 8 },
  input: { flex: 1, borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 8 },
  sectionHeader: { paddingVertical: 8 },
  sectionTitle: { fontWeight: '700' },
  itemRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 8, borderBottomWidth: 1, borderBottomColor: '#eee', gap: 8 },
  itemName: { fontWeight: '600' },
  itemPrice: { color: '#555' },
  owners: { flexDirection: 'row', flexWrap: 'wrap', gap: 6, maxWidth: '60%' },
  chip: { borderWidth: 1, borderColor: '#999', borderRadius: 16, paddingHorizontal: 10, paddingVertical: 6, marginRight: 6, marginBottom: 6 },
  chipActive: { backgroundColor: '#222', borderColor: '#222' },
  chipText: { color: '#222' },
  chipTextActive: { color: '#fff' },
  personRow: { flexDirection: 'row', alignItems: 'center', gap: 8, paddingVertical: 8, borderBottomWidth: 1, borderBottomColor: '#eee' },
  personName: { fontWeight: '600' },
  personMeta: { color: '#555' },
  amount: { fontWeight: '700' },
  remove: { color: '#b00020' },
});