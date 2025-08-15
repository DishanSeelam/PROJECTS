import React, { useCallback, useState } from 'react';
import { Button, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { useReceipt } from '../context/ReceiptContext';
import { parseReceiptText } from '../services/parser';

export default function ParseScreen({ navigation }: any) {
  const { ocrText, setOcrText, setReceipt } = useReceipt();
  const [localText, setLocalText] = useState<string>(ocrText);
  const [output, setOutput] = useState<string>('');

  const onParse = useCallback(() => {
    const parsed = parseReceiptText(localText || '');
    setReceipt(parsed);
    setOutput(JSON.stringify(parsed, null, 2));
  }, [localText, setReceipt]);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Receipt Text (paste or OCR later)</Text>
      <TextInput
        multiline
        style={styles.input}
        value={localText}
        onChangeText={(t) => {
          setLocalText(t);
          setOcrText(t);
        }}
        placeholder="Paste OCR text here"
      />
      <View style={styles.row}>
        <Button title="Parse" onPress={onParse} />
        <Button title="Next" onPress={() => navigation.navigate('Assign')} />
      </View>
      <ScrollView style={styles.output}>
        <Text selectable>{output}</Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, gap: 12 },
  label: { fontSize: 16, fontWeight: '600' },
  input: { minHeight: 160, borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 8, textAlignVertical: 'top' },
  output: { flex: 1, marginTop: 12 },
  row: { flexDirection: 'row', gap: 8 },
});