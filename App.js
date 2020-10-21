import 'react-native-gesture-handler';
import * as React from 'react';
import { FlatList, TouchableOpacity, StyleSheet, Text, View, Button, TextInput } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { BleManager } from 'react-native-ble-plx';

console.log('hihihihihi???');

const Stack = createStackNavigator();

const SIMULATOR = true;
let ble = null;
let beaconDevice = null;
let navigationPointer = null;
let frequencyCounter = 0;
let frequencyInterval = null;
let trialNum = 0;
const TOTAL_NUM_TRIALS = 4;
const MIN_FREQUENCY = 250;
const results = [0, 0, 0, 0];

function connect(device) {
  console.log('connecting...');
  device.connect()
    .then((device) => {
      return device.discoverAllServicesAndCharacteristics();
    })
    .then((device) => {
      beaconDevice = device.id;
      navigationPointer.navigate('Code')
      // Do work on device with services and characteristics
      console.log('connected!');
    })
    .catch((error) => {
        // Handle errors
        console.log(error);
    });
}

function writeToBeacon(value) {
  let data = new Uint8Array(2);
  data[0] = value & 0xFF;
  data[1] = (value >> 8) & 0xFF;

  console.log('writing:');
  console.log(data);
  console.log(bytesToBase64(data));

  if (!SIMULATOR) {
    ble.writeCharacteristicWithResponseForDevice(
      beaconDevice,
      '6e400001-b5a3-f393-e0a9-e50e24dcca9e',
      '6e400002-b5a3-f393-e0a9-e50e24dcca9e',
      bytesToBase64(data)
    );      
  }

  console.log('done');
}

const base64abc = [
  'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M',
  'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
  'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm',
  'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
  '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '+', '/'
];

function bytesToBase64(bytes) {
  let result = '', i, l = bytes.length;
  for (i = 2; i < l; i += 3) {
    result += base64abc[bytes[i - 2] >> 2];
    result += base64abc[((bytes[i - 2] & 0x03) << 4) | (bytes[i - 1] >> 4)];
    result += base64abc[((bytes[i - 1] & 0x0F) << 2) | (bytes[i] >> 6)];
    result += base64abc[bytes[i] & 0x3F];
  }

  if (i === l + 1) { // 1 octet yet to write
    result += base64abc[bytes[i - 2] >> 2];
    result += base64abc[(bytes[i - 2] & 0x03) << 4];
    result += "==";
  }

  if (i === l) { // 2 octets yet to write
    result += base64abc[bytes[i - 2] >> 2];
    result += base64abc[((bytes[i - 2] & 0x03) << 4) | (bytes[i - 1] >> 4)];
    result += base64abc[(bytes[i - 1] & 0x0F) << 2];
    result += "=";
  }
  return result;
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
    marginTop: 50,
    padding: 10
  },
  instructionsTitle: {
    marginTop: 60,
    marginLeft: 35,
    fontSize: 30
  },
  instructionsText: {
    marginLeft: 35,
    marginTop: 35,
    marginRight: 35
  },
  buttonContainer: {
    borderColor: 'black'
  },
  bodyText: {
    fontSize: 20
  },
  textAreaContainer: {
    width: 350,
    borderColor: 'gray',
    borderWidth: 1,
    padding: 5
  },
  textArea: {
    height: 150,
    justifyContent: "flex-start",
    margin: 20
  }
})

const CodeDigitInput = (props) => {
  return (
    <TextInput
      style={{
        height: 40,
        width: 40,
        borderColor: 'gray',
        borderWidth: 1,
        margin: 10
      }}
      keyboardType={'numeric'}
      maxLength={1}
    />
  )
}

const ConnectScreen = ({ navigation }) => {
  navigationPointer = navigation;

  if (!SIMULATOR) {
    ble = new BleManager();
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
  } else {
    // when there's no BLE, just move on
    setTimeout(() => {
      navigation.navigate('Code');
    }, 1000);
  }

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
        <Text style={[styles.bodyText]}>
          {`Make sure the Beacon device is on and blinking.

The app will start once it has found the device.`}
          </Text>
      </View>
    </View>
  );
};

const CodeScreen = ({ navigation }) => {
  return (
    <View>
      <View
        style={[styles.centeredRow]}
      >
        <Text style={[styles.bodyText]}>
          Enter the code given to you by the study coordinator.
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
        style={[styles.centeredRow, styles.buttonContainer]}
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

const list = [
  'On the next screen, when you press the button, the Beacon device\'s light will turn on.\n',
  'The light will slowly start flickering (or shimmering).\n',
  'Once you are certain that the light is flickering (or shimmering) steadily, press the button.\n',
  'This process will repeat 8 times.\n'
]

keyExtractor = (item, index) => index.toString()

renderItem = ({ item, index }) => (
  <View style={{flexDirection:"row"}}>
    <Text style={[styles.bodyText]}>{ index+1 }. </Text>
    <Text style={[styles.bodyText]}>{ item }</Text>
  </View>
)

const InstructionsScreen = ({ navigation }) => {
  return (
    <View>
      <Text
        style={[styles.instructionsTitle]}
      >
        Instructions
      </Text>

      <FlatList
        style={[styles.instructionsText]}
        keyExtractor={this.keyExtractor}
        data={list}
        renderItem={this.renderItem}
      />

      <View
        style={[styles.centeredRow]}
      >
        <Button
          title="Start taking measurements"
          onPress={() =>
            navigation.navigate('Measurement')
          }
        />
      </View>
    </View>
  );
};

const MeasurementScreen = ({ navigation }) => {
  frequencyCounter = MIN_FREQUENCY;
  frequencyInterval = setInterval(() => {
    console.log('frequency', frequencyCounter);
    frequencyCounter++;
    writeToBeacon(frequencyCounter);
  }, 200);

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
        onPress={() => {
          writeToBeacon(0);

          console.log('ANSWER IS', frequencyCounter);

          results[trialNum] = frequencyCounter;

          if (frequencyInterval != null) {
            clearInterval(frequencyInterval);
          }
          trialNum++;

          if (trialNum >= TOTAL_NUM_TRIALS) {
            navigation.navigate('Exit');
          } else {
            navigation.push('Measurement');
          }
        }}
      >
        <Text style={[styles.bodyText]}>
          Press Here
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const UploadResults = () => {
  console.log('contents:');
  console.log('entry.275281492="izzy"&' +
      'entry.367726235="' + results[0] + '"&' +
      'entry.1649094572="' + results[1] + '"&' +
      'entry.1667763378="' + results[2] + '"&' +
      'entry.771158055="' + results[3] + '"');
  fetch('https://docs.google.com/forms/d/e/1FAIpQLSeSQAW9zh57QgHesjmz7osiyCASwr0PQX5gjaarIVccXxNckQ/formResponse', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: 'entry.275281492=izzy&' +
      'entry.367726235=' + results[0] + '&' +
      'entry.1649094572=' + results[1] + '&' +
      'entry.1667763378=' + results[2] + '&' +
      'entry.771158055=' + results[3]
  })
  .then((response) => {
    console.log('SUCCESS!');
    console.log(response);
  })
  .catch((error) => {
    console.log('ERROR!');
    console.error(error);
  });
};

const ExitScreen = ({ navigation }) => {
  return (
    <View style={{marginTop: 35}}>
      <View style={[styles.centeredRow]}>
        <Text style={[styles.bodyText]}>{`Your measured CFF today is 43.5 Hz.


Is there anything else you would like us or yourself to know when look back your measurement from this session?`}
        </Text>
      </View>

      <View style={[styles.centeredRow]} >
        <View style={[styles.textAreaContainer]} >
          <TextInput
            style={styles.textArea}
            underlineColorAndroid="transparent"
            placeholder="Please explain"
            placeholderTextColor="grey"
            numberOfLines={10}
            multiline={true}
          />
        </View>
      </View>

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
    </View>
  );
};

const HelloWorldApp = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Connect"
          component={ConnectScreen}
          options={{ title: 'Welcome' }}
        />
        <Stack.Screen name="Code" component={CodeScreen} />
        <Stack.Screen name="Instructions" component={InstructionsScreen} />
        <Stack.Screen name="Measurement" component={MeasurementScreen} />
        <Stack.Screen name="Exit" component={ExitScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default HelloWorldApp;
