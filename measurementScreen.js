import * as React from 'react';
import { View } from 'react-native';
import { Button, Text } from 'react-native-paper';

import DescendingOnlyMeasurement from './descendingOnlyMeasurement.js'
import ForcedChoiceMeasurement from './forcedChoiceMeasurement.js'
import styles from './styles.js';

export default class MeasurementScreen extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      finished: false,
      finalFrequency: null,
      optionalData: null
    };

    this.stopRun = this.stopRun.bind(this);
  }

  componentDidMount() {
    this.props.navigation.setOptions({
      title: 'Run ' + global.trialNum + ' of ' + global.sessionSettings.numTrials,
      headerLeft: null
    });
  }

  startRun() {
    this.setState({finished: false})
  }

  stopRun(finalFrequency, optionalData=null) {
    this.setState({
      finished: true,
      finalFrequency: finalFrequency,
      optionalData: optionalData
    });
  }

  saveRun(valid) {
    global.runs.push({
      frequency: this.state.finalFrequency,
      optionalData: this.state.optionalData,
      valid: valid
    });
    console.log(global.runs);
  }

  render() {
    let screenContents;
    if (!this.state.finished) {
      if (global.sessionSettings.protocol == 'descending_only') {
        screenContents = <DescendingOnlyMeasurement onStop={this.stopRun}>
          </DescendingOnlyMeasurement>;
      } else if (global.sessionSettings.protocol == 'forced_choice') {
        screenContents = <ForcedChoiceMeasurement onStop={this.stopRun}>
          </ForcedChoiceMeasurement>;
      }
    } else {
      screenContents = <View style={[styles.contentRoot]}>
        <View style={[styles.contentRow]}>
          <Text style={[styles.textBody]}>
            You just completed step {global.trialNum} of {global.sessionSettings.numTrials} for today's measure.
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
            style={[styles.textBody, {backgroundColor: '#028A0F'}]}
            onPress={() => {
              this.saveRun(true);

              if (global.trialNum < global.sessionSettings.numTrials) {
                global.trialNum++;
                this.props.navigation.push('Measurement');
              } else {
                this.props.navigation.push('Questionnaire');
              }
            }}
          >{
            global.trialNum < global.sessionSettings.numTrials ?
            'Start run ' + (global.trialNum + 1) + ' of ' + global.sessionSettings.numTrials : 'Go to next step'
          }</Button>
        </View>
        <View style={[styles.contentRow, styles.contentCenter]}>
          <Button
            mode="contained"
            style={[styles.textBody, {backgroundColor: '#FF0000'}]}
            onPress={() => {
              this.saveRun(false);
              this.startRun();
            }}
          >{
            'Redo run ' + global.trialNum + ' of ' + global.sessionSettings.numTrials
          }</Button>
        </View>
      </View>;
    }

    return (
      <View>
        {screenContents}
      </View>
    );
  }
}
