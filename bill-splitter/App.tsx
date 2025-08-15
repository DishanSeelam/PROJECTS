import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { ReceiptProvider } from './src/context/ReceiptContext';
import CaptureScreen from './src/screens/CaptureScreen';
import ParseScreen from './src/screens/ParseScreen';
import AssignScreen from './src/screens/AssignScreen';
import PayScreen from './src/screens/PayScreen';

export type RootStackParamList = {
  Capture: undefined;
  Parse: undefined;
  Assign: undefined;
  Pay: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <ReceiptProvider>
      <NavigationContainer>
        <StatusBar style="dark" />
        <Stack.Navigator initialRouteName="Capture">
          <Stack.Screen name="Capture" component={CaptureScreen} options={{ title: 'Receipt' }} />
          <Stack.Screen name="Parse" component={ParseScreen} options={{ title: 'Parse' }} />
          <Stack.Screen name="Assign" component={AssignScreen} options={{ title: 'Assign' }} />
          <Stack.Screen name="Pay" component={PayScreen} options={{ title: 'UPI Requests' }} />
        </Stack.Navigator>
      </NavigationContainer>
    </ReceiptProvider>
  );
}
