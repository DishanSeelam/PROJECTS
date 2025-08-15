import React, { useCallback, useState } from 'react';
import { Alert, Button, Image, StyleSheet, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useReceipt } from '../context/ReceiptContext';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../App';

export default function CaptureScreen({ navigation }: NativeStackScreenProps<RootStackParamList, 'Capture'>) {
  const { setImageUri, setOcrText, setReceipt } = useReceipt();
  const [localUri, setLocalUri] = useState<string | undefined>(undefined);

  const requestPermissions = useCallback(async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission required', 'Camera permission is needed to capture receipts.');
      return false;
    }
    return true;
  }, []);

  const pickFromCamera = useCallback(async () => {
    if (!(await requestPermissions())) return;
    const result = await ImagePicker.launchCameraAsync({ quality: 1, base64: false });
    if (!result.canceled) {
      const uri = result.assets[0]?.uri;
      setLocalUri(uri);
      setImageUri(uri);
      setOcrText('');
      setReceipt(undefined);
    }
  }, [requestPermissions, setImageUri, setOcrText, setReceipt]);

  const pickFromGallery = useCallback(async () => {
    const result = await ImagePicker.launchImageLibraryAsync({ quality: 1, base64: false });
    if (!result.canceled) {
      const uri = result.assets[0]?.uri;
      setLocalUri(uri);
      setImageUri(uri);
      setOcrText('');
      setReceipt(undefined);
    }
  }, [setImageUri, setOcrText, setReceipt]);

  return (
    <View style={styles.container}>
      <View style={styles.preview}>
        {localUri ? (
          <Image source={{ uri: localUri }} style={styles.image} resizeMode="contain" />
        ) : null}
      </View>
      <View style={styles.row}>
        <Button title="Camera" onPress={pickFromCamera} />
        <Button title="Gallery" onPress={pickFromGallery} />
        <Button title="Next" onPress={() => navigation.navigate('Parse')} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, gap: 12 },
  preview: { flex: 1, backgroundColor: '#f3f3f3', borderRadius: 8, alignItems: 'center', justifyContent: 'center' },
  image: { width: '100%', height: '100%' },
  row: { flexDirection: 'row', justifyContent: 'space-between', gap: 8 },
});