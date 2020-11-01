import * as React from 'react';
import { View } from 'react-native';
import { Button, Text } from 'react-native-paper';

import styles from './styles.js';

export default class MeasurementFinishedScreen extends React.Component {

  render() {

    this.props.navigation.setOptions({
      title: 'Step #' + global.trialNum + ' of ' + global.TOTAL_NUM_TRIALS
    });

    return (
      <View style={[styles.contentRoot]}>
        <View style={[styles.contentRow]}>
          <Text style={[styles.textBody]}>
            You just completed step {global.trialNum} of {global.TOTAL_NUM_TRIALS} for today's measure.
          </Text>
        </View>
        <View style={[styles.contentRow]}>
          <Text style={[styles.textBody]}>
            If you were distracted or unable to reliably record the measure, you can choose to discard and redo the previous step.
          </Text>
        </View>
        <View style={[styles.contentRow, styles.contentCenter]}>
          <Button
            mode="contained"
            style={[styles.textBody, {backgroundColor: '#00FF00'}]}
            onPress={() => {
              if (global.trialNum < global.TOTAL_NUM_TRIALS) {
                global.trialNum++;
                this.props.navigation.push('Measurement');
              } else {
                this.props.navigation.push('Questionnaire');
              }
            }}
          >{
            global.trialNum < global.TOTAL_NUM_TRIALS ?
            'Start step #' + (global.trialNum + 1) : 'Go to next step'
          }</Button>
        </View>
        <View style={[styles.contentRow, styles.contentCenter]}>
          <Button
            mode="contained"
            style={[styles.textBody, {backgroundColor: '#FF0000'}]}
            onPress={() =>
              this.props.navigation.navigate('Measurement')
            }
          >{
            'Redo step #' + global.trialNum
          }</Button>
        </View>
      </View>
    );
  }
}
