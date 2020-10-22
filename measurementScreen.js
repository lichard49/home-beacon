import * as React from 'react';
import { View } from 'react-native';
import { TouchableRipple, Text } from 'react-native-paper';

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
        <TouchableRipple
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
          rippleColor="rgba(0, 0, 0, .32)"
          onPress={() => {
            this.props.navigation.push('MeasurementFinished');
          }}
        >
          <Text style={[styles.textBody]}>
            Press Here
          </Text>
        </TouchableRipple>
      </View>
    );
  }
}
