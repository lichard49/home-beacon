import * as React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';

import styles from './styles.js';

export default class MeasurementScreen extends React.Component {

  render() {

    this.props.navigation.setOptions({
      title: 'Step ' + global.trialNum + ' of ' + global.TOTAL_NUM_TRIALS
    });

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
            this.props.navigation.push('MeasurementFinished');
          }}
        >
          <Text style={[styles.textBody]}>
            Press Here
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}
