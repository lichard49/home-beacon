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

const BEACON_API_ROOT = 'https://homes.cs.washington.edu/~lichard/beacon/';
const BEACON_API_LOG = BEACON_API_ROOT + 'log';

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
  let value10 = value * 10;
  let data = new Uint8Array(2);
  data[0] = (value10 >> 8) & 0xFF;
  data[1] = value10 & 0xFF;
  let formattedData = bytesToBase64(data);

  console.log('[beacon] value:', value, ', value10:', value10,
    ', raw data:', data, ', formatted data:', formattedData);

  if (global.sessionSettings.deviceId != null) {
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

global.writeLog = function (screen, message, callback) {
  const payload = JSON.stringify({
    time: Date.now(),
    screen: screen,
    message: message
  });
  console.log('[' + screen + '] ' + payload);
  fetch(BEACON_API_LOG + '/?user=' + global.sessionSettings.userId + '&data=' + payload)
    .then((response) => response.text())
    .then(callback);
}

global.sessionSettings = {
  userId: null,
  deviceId: null,
  isClinic: null,
  numTrials: null,
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
