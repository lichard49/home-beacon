import * as React from 'react';
import { Text, View } from 'react-native';

import styles from './styles.js';

export default class HomeScreen extends React.Component {

  render(props) {

    setTimeout(() => {
      this.props.navigation.navigate('Code');
    }, 1000);

    return (
      <View style={[styles.contentRoot]}>
        <View style={[styles.contentRow, styles.contentCenter]}>
          <Text style={[styles.textTitle]}>
            Beacon
          </Text>
        </View>
        <View style={[styles.contentRow]}>
          <Text style={[styles.textBody]}>
            Make sure the Beacon device is on and blinking.
          </Text>
        </View>
        <View style={[styles.contentRow]}>
          <Text style={[styles.textBody]}>
            The app will start once it has found the device.
            Make sure your phone's bluetooth is turned on.
          </Text>
        </View>
      </View>
    );
  }
}
