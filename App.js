import 'react-native-gesture-handler';
import * as React from 'react';
import { TouchableOpacity, StyleSheet, Text, View, Button, TextInput } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { BleManager } from 'react-native-ble-plx';

const Stack = createStackNavigator();
const ble = new BleManager();
const subscription = ble.onStateChange((state) => {
  if (state === 'PoweredOn') {
    scan();
    subscription.remove();
  }
}, true);

function scan() {
  console.log('start scanning');
  ble.startDeviceScan(null, null, (error, device) => {
    if (error) {
      // Handle error (scanning will be stopped automatically)
      return
    }

    // Check if it is a device you are looking for based on advertisement data
    // or other criteria.
    if (device.name === 'Beacon') {

      // Stop scanning as it's not necessary if you are scanning for one device.
      ble.stopDeviceScan();

      // Proceed with connection.
      console.log('yay found');
      connect(device);
    }
  });
}

function hexToBase64(hexstring) {
    return window.btoa(hexstring.match(/\w{2}/g).map(function(a) {
        return String.fromCharCode(parseInt(a, 16));
    }).join(""));
}

function connect(device) {
  console.log('connecting...');
  device.connect()
    .then((device) => {
      return device.discoverAllServicesAndCharacteristics();
    })
    .then((device) => {
      // Do work on device with services and characteristics
      console.log('connected! writing...');

      let data = new Uint16Array(1);
      data[0] = 20;

      ble.writeCharacteristicWithResponseForDevice(
        device.id,
        '6e400001-b5a3-f393-e0a9-e50e24dcca9e',
        '6e400002-b5a3-f393-e0a9-e50e24dcca9e',
        hexToBase64('00')
      );

      console.log('done');
    })
    .catch((error) => {
        // Handle errors
        console.log(error);
    });
}

const styles = StyleSheet.create({
  titleText: {
    fontSize: 30,
    fontWeight: 'bold',
    marginTop: 100
  },
  centeredRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 50
  },
  instructionsText: {
    margin: 50,
  }
})

const CodeDigitInput = (props) => {
  return (
    <TextInput
      style={{
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        margin: 10
      }}
      keyboardType={'numeric'}
      maxLength={1}
    />
  )
}

const HomeScreen = ({ navigation }) => {
  return (
    <View>
      <View
        style={[styles.centeredRow]}
      >
        <Text
          style={[styles.titleText]}
        >
          Beacon
        </Text>
      </View>

      <View
        style={[styles.centeredRow]}
      >
        <CodeDigitInput />
        <CodeDigitInput />
        <CodeDigitInput />
        <CodeDigitInput />
      </View>

      <View
        style={[styles.centeredRow]}
      >
        <Button
          title="Go to instructions"
          onPress={() =>
            navigation.navigate('Instructions')
          }
        />
      </View>
    </View>
  );
};

const InstructionsScreen = ({ navigation }) => {
  return (
    <View>
      <Text
        style={[styles.instructionsText]}
      >{`Instructions:
1. The Beacon device's light will start to flicker.
2. The flickering will get faster.
3. Once you cannot see it flickering anymore, press the button on the screen.
4. Repeat.`}
      </Text>

      <View
        style={[styles.centeredRow]}
      >
        <Button
          title="Go to experiment"
          onPress={() =>
            navigation.navigate('Experiment')
          }
        />
      </View>
    </View>
  );
};

const ExperimentScreen = ({ navigation }) => {
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <TouchableOpacity
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#DDDDDD',
          position: 'absolute',
          top: 10,
          right: 10,
          bottom: 10,
          left: 10
        }}
        onPress={() =>
          navigation.navigate('Exit')
        }
      >
        <Text>Press Here</Text>
      </TouchableOpacity>
    </View>
  );
};

const UploadResults = () => {
  fetch('https://docs.google.com/forms/d/e/1FAIpQLSeSQAW9zh57QgHesjmz7osiyCASwr0PQX5gjaarIVccXxNckQ/formResponse', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: 'entry.275281492=6969&' +
      'entry.367726235=5858&' +
      'entry.1649094572=4747&' +
      'entry.1667763378=3636&' +
      'entry.771158055=2525'
  })
  .then((response) => {
    console.log(response);
  })
  .catch((error) => {
    console.error(error);
  });
};

const ExitScreen = ({ navigation }) => {
  return (
    <View
      style={[styles.centeredRow]}
    >
      <Button
        title="Upload Results"
        onPress={() =>
          UploadResults()
        }
      ></Button>
    </View>
  );
};

const HelloWorldApp = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: 'Welcome' }}
        />
        <Stack.Screen name="Instructions" component={InstructionsScreen} />
        <Stack.Screen name="Experiment" component={ExperimentScreen} />
        <Stack.Screen name="Exit" component={ExitScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default HelloWorldApp;
