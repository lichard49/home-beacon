import * as React from 'react';
import { View } from 'react-native';
import { Button, Text } from 'react-native-paper';

import styles from './styles.js';

export default class MeasurementScreen extends React.Component {

  constructor(props) {
    super(props);

    this.minHz = 250;   // 25.0 * 10
    this.maxHz = 550;   // 55.0 * 10

    this.state = {
      finished: false,
      seconds: this.minHz
    };
  }

  componentDidMount() {
    this.props.navigation.setOptions({
      title: 'Run ' + global.trialNum + ' of ' + global.TOTAL_NUM_TRIALS,
      headerLeft: null
    });

    this.startRun();
  }

  startRun() {
    this.setState({seconds: this.minHz});
    this.setState({finished: false});

    this.timer = setInterval(() => {
      if (this.state.seconds == this.maxHz) {
        this.stopRun();
      } else {
        // Bluetooth send this.state.seconds to device
        this.setState({ seconds: this.state.seconds + 1 });
      }
    }, 200);
  }

  stopRun() {
    this.setState({finished: true});
    clearInterval(this.timer);
  }

  saveRun(valid) {
    global.runs.push({frequency: this.state.seconds/10, valid: valid});
    console.log(global.runs);
  }

  render() {

    return (
      <View>
        {
          !this.state.finished ? (
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Button
                mode="contained"
                style={{
                  width: '95%',
                  height: '98%',
                  backgroundColor: '#DDDDDD',
                }}
                contentStyle={{
                  width: '100%',
                  height: '100%',
                }}
                labelStyle={{
                  color: '#000000'
                }}
                onPress={() =>
                  this.stopRun()
                }
              >Press here {this.state.seconds}</Button>
            </View>
          ) : (
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
                  style={[styles.textBody, {backgroundColor: '#028A0F'}]}
                  onPress={() => {
                    this.saveRun(true);

                    if (global.trialNum < global.TOTAL_NUM_TRIALS) {
                      global.trialNum++;
                      this.props.navigation.push('Measurement');
                    } else {
                      this.props.navigation.push('Questionnaire');
                    }
                  }}
                >{
                  global.trialNum < global.TOTAL_NUM_TRIALS ?
                  'Start run ' + (global.trialNum + 1) + ' of ' + global.TOTAL_NUM_TRIALS : 'Go to next step'
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
                  'Redo run ' + global.trialNum + ' of ' + global.TOTAL_NUM_TRIALS
                }</Button>
              </View>
            </View>
          )
        }
      </View>
    );
  }
}
