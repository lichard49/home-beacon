import * as React from 'react';
import { View } from 'react-native';
import { Button, Text } from 'react-native-paper';

import styles from './styles.js';

export default class MeasurementFinishedScreen extends React.Component {

  render() {

    this.props.navigation.setOptions({
      title: 'Step ' + global.trialNum + ' of ' + global.TOTAL_NUM_TRIALS
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
            If you were distracted or unable to accurately perform this step, you can choose to discard and redo it.
          </Text>
        </View>
        <View style={[styles.contentRow, styles.contentCenter]}>
          <Button
            mode="outlined"
            style={[styles.textBody]}
            onPress={() =>
              this.props.navigation.navigate('Measurement')
            }
          >Redo step</Button>
        </View>
        <View style={[styles.contentRow]}>
          <Text style={[styles.textBody]}>
            Otherwise, you can move on to the next step.
          </Text>
        </View>
        <View style={[styles.contentRow, styles.contentCenter]}>

          <Button
            mode="outlined"
            style={[styles.textBody]}
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
            'Start measurement ' + (global.trialNum + 1) : 'Go to next step'
          }</Button>
        </View>
      </View>
    );
  }
}
