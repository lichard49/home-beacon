import * as React from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';
import { BleManager } from 'react-native-ble-plx';

import styles from './styles.js';

export default class HomeScreen extends React.Component {

  constructor() {
    super();
    global.manager = new BleManager();
  }

  componentWillMount() {
    const subscription = global.manager.onStateChange((state) => {
      if (state === 'PoweredOn') {
        this.scanAndConnect();
        subscription.remove();
      }
    }, true);
  }

  scanAndConnect() {
    global.manager.startDeviceScan(null, null, (error, device) => {
      if (error) {
        // Handle error (scanning will be stopped automatically)
        return;
      }

      // Check if it is a device you are looking for based on advertisement data
      // or other criteria.
      // if (device.name === 'Beacon2') {
        if (device != null && device.name != null && device.name.includes('Beacon')) {

          // Stop scanning as it's not necessary if you are scanning for one device.
          global.manager.stopDeviceScan();

          // Proceed with connection.
          device.connect()
            .then((device) => {
                return device.discoverAllServicesAndCharacteristics()
            })
            .then((device) => {
              // Do work on device with services and characteristics
              console.log('connected! writing...');

              global.device = device;
              global.writeBeacon(0);

              console.log('done');

              this.props.navigation.navigate('Code');
            })
            .catch((error) => {
                // Handle errors
                console.log(error);
            });
      }
    });
  }

  render(props) {

    setTimeout(() => {
      this.props.navigation.navigate('Code');
    }, 1000);

    return (
      <View style={[styles.contentRoot]}>
        <View style={[styles.contentRow]}>
          <Text style={[styles.textBody]}>
            Make sure the Beacon device is on and blinking.
          </Text>
        </View>
        <View style={[styles.contentRow]}>
          <Text style={[styles.textBody]}>
            The app will start once it has found the device.
            Make sure your phone's Bluetooth is turned on.
          </Text>
        </View>
      </View>
    );
  }
}
