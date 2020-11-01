import 'react-native-gesture-handler';
import * as React from 'react';
import { FlatList, TouchableOpacity, StyleSheet, Text, View, Button, TextInput } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { BleManager } from 'react-native-ble-plx';
import { Provider as PaperProvider } from 'react-native-paper';

import HomeScreen from './homeScreen.js';
import CodeScreen from './codeScreen.js';
import InstructionsScreen from './instructionsScreen.js';
import MeasurementScreen from './measurementScreen.js';
import QuestionnaireScreen from './questionnaireScreen.js';
import ExitScreen from './exitScreen.js';

console.log('App starting!');

const Stack = createStackNavigator();

global.TOTAL_NUM_TRIALS = 8;
global.trialNum = 1;

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
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Code" component={CodeScreen} />
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
