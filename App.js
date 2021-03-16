import 'react-native-gesture-handler';
import * as React from 'react';
import { FlatList, TouchableOpacity, StyleSheet, Text, View, Button, TextInput } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { BleManager } from 'react-native-ble-plx';
import { Provider as PaperProvider } from 'react-native-paper';

import ConnectScreen from './connectScreen.js';
import LoginScreen from './loginScreen.js';
import InstructionsScreen from './instructionsScreen.js';
import MeasurementScreen from './measurementScreen.js';
import QuestionnaireScreen from './questionnaireScreen.js';
import ExitScreen from './exitScreen.js';

console.log('App starting!');

const Stack = createStackNavigator();

global.TOTAL_NUM_TRIALS = 4;
global.trialNum = 1;
global.user = null;
global.runs = [];

global.manager = null;
global.device = null;
global.base64abc = [
  'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M',
  'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
  'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm',
  'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
  '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '+', '/'
];

global.writeBeacon = function (value) {
  if (global.sessionSettings.deviceId != null) {
    let data = new Uint8Array(2);
    data[0] = (value >> 8) & 0xFF;
    data[1] = value & 0xFF;

    console.log('raw data', data);
    console.log('formatted data', bytesToBase64(data));

    global.manager.writeCharacteristicWithResponseForDevice(
      global.device.id,
      '6e400001-b5a3-f393-e0a9-e50e24dcca9e',
      '6e400002-b5a3-f393-e0a9-e50e24dcca9e',
      global.bytesToBase64(data)
    );
  }
}

global.bytesToBase64 = function (bytes) {
  let result = '', i, l = bytes.length;
  for (i = 2; i < l; i += 3) {
    result += global.base64abc[bytes[i - 2] >> 2];
    result += global.base64abc[((bytes[i - 2] & 0x03) << 4) | (bytes[i - 1] >> 4)];
    result += global.base64abc[((bytes[i - 1] & 0x0F) << 2) | (bytes[i] >> 6)];
    result += global.base64abc[bytes[i] & 0x3F];
  }

  if (i === l + 1) { // 1 octet yet to write
    result += global.base64abc[bytes[i - 2] >> 2];
    result += global.base64abc[(bytes[i - 2] & 0x03) << 4];
    result += "==";
  }

  if (i === l) { // 2 octets yet to write
    result += global.base64abc[bytes[i - 2] >> 2];
    result += global.base64abc[((bytes[i - 2] & 0x03) << 4) | (bytes[i - 1] >> 4)];
    result += global.base64abc[(bytes[i - 1] & 0x0F) << 2];
    result += "=";
  }
  return result;
}

global.sessionSettings = {
  userId: null,
  deviceId: null,
  protocol: null,
  protocolSettings: {}
};

const HelloWorldApp = () => {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{
          cardStyle: {
            backgroundColor: '#FFFFFF'
          },
          headerStyle: {
            backgroundColor: '#FEFEFE'
          }
        }}>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Connect" component={ConnectScreen} />
          <Stack.Screen name="Instructions" component={InstructionsScreen} />
          <Stack.Screen name="Measurement" component={MeasurementScreen} />
          <Stack.Screen name="Questionnaire" component={QuestionnaireScreen} />
          <Stack.Screen name="Exit" component={ExitScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
};

export default HelloWorldApp;
