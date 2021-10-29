import * as React from 'react';
import { View } from 'react-native';
import { Button, Text } from 'react-native-paper';

import styles from './styles.js';

const NON_FLICKERING_FREQUENCY = 120;   // frequency in Hz * 10
                                         // too fast to see
const FREQUENCY_INCREMENT = 2;
const DIRECTION_UP = 1;
const DIRECTION_DOWN = -1;

export default class ForcedChoiceMeasurement extends React.Component {

  constructor(props) {
    super(props);

    this.currentFrequency =
      global.sessionSettings.protocolSettings.frequencyStart;
    this.selectedFrequencies = [];
    this.choice1 = 0;
    this.choice2 = 0;
    this.correctChoice = 0;
    this.numCorrect = 0;

    this.prevDirection = DIRECTION_UP;
    this.numReversals = 0;
    this.reversalFrequencies = [];

    this.state = {
      reveal: 0   // 0: only "show choice 1",
                  // 1: "show choice 1 and 2",
                  // 2: "show choice 1 and 2" and "select choice 1",
                  // 3: "show choice 1 and 2" and "select choice 2"
    };
  }

  componentDidMount() {
    this.startRun();
  }

  startRun() {
    if (Math.random() >= 0.5) {
      this.choice1 = NON_FLICKERING_FREQUENCY;
      this.choice2 = this.currentFrequency;
      this.correctChoice = 2;
    } else {
      this.choice1 = this.currentFrequency;
      this.choice2 = NON_FLICKERING_FREQUENCY;
      this.correctChoice = 1;
    }
    this.setState({reveal: 0});
  }

  showChoice(choice) {
    if (choice == 1) {
      console.log('showing', this.choice1);
      global.writeBeacon(this.choice1);

      if (this.state.reveal == 0) {
        this.setState({reveal: 1});
      } else {
        this.setState({reveal: 2});
      }
    } else if (choice == 2) {
      console.log('showing', this.choice2);
      global.writeBeacon(this.choice2);

      this.setState({reveal: 3});
    }
  }

  stopRun(choice) {
    global.writeBeacon(0);

    this.selectedFrequencies.push({
      time: Date.now(),
      frequency: this.currentFrequency,
    });

    if (choice == this.correctChoice) {
      this.numCorrect++;
      if (this.numCorrect >=
        global.sessionSettings.protocolSettings.numInARowCorrect) {

        if (this.prevDirection == DIRECTION_DOWN) {
          this.numReversals++;
          this.reversalFrequencies.push(this.currentFrequency);
        }
        this.prevDirection = DIRECTION_UP;

        this.numCorrect = 0;
        this.currentFrequency += FREQUENCY_INCREMENT;
      }
    } else {
      if (this.prevDirection == DIRECTION_UP) {
        this.numReversals++;
        this.reversalFrequencies.push(this.currentFrequency);
      }
      this.prevDirection = DIRECTION_DOWN;

      this.numCorrect = 0;
      this.currentFrequency -= FREQUENCY_INCREMENT;
    }

    console.log('num correct:', this.numCorrect, 'num reversals',
      this.numReversals);

    if (this.numReversals ==
      global.sessionSettings.protocolSettings.numReversalsToFinish) {

      let averageFrequency = 0;
      for (let index = 0; index <
        global.sessionSettings.protocolSettings.numReversalsToUse; index++) {

        averageFrequency +=
          this.reversalFrequencies[this.reversalFrequencies.length - index - 1];
      }
      averageFrequency /=
        global.sessionSettings.protocolSettings.numReversalsToUse;

      this.props.onStop(averageFrequency.toFixed(2), this.selectedFrequencies);
    } else {
      this.startRun();
    }
  }

  render() {
    return (
      <View
        style={{
          width: '100%',
          height: '100%',
          flexDirection: 'column'
        }}>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'row',
            flex: 1,
            width: '100%',
            height: '100%'
          }}>
          <Button
            mode="contained"
            style={{
              marginLeft: 5,
              marginRight: 5,
              height: '98%',
              flex: 1,
              backgroundColor: '#DDDDDD'
            }}
            contentStyle={{
              width: '100%',
              height: '100%',
            }}
            labelStyle={{
              color: '#000000'
            }}
            onPress={() =>
              this.showChoice(1)
            }
          >Show Choice 1</Button>
          <Button
            mode="contained"
            style={{
              marginLeft: 5,
              marginRight: 5,
              height: '98%',
              flex: 1,
              backgroundColor: '#DDDDDD',
              opacity: this.state.reveal >= 1 ? 100 : 0
            }}
            contentStyle={{
              width: '100%',
              height: '100%',
            }}
            labelStyle={{
              color: '#000000'
            }}
            onPress={() =>
              this.showChoice(2)
            }
          >Show Choice 2</Button>
        </View>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'row',
            flex: 1,
            width: '100%',
            height: '100%'
          }}>
          <Button
            mode="contained"
            style={{
              marginLeft: 5,
              marginRight: 5,
              height: '98%',
              flex: 1,
              backgroundColor: '#DDDDDD',
              opacity: this.state.reveal == 2 ? 100 : 0
            }}
            contentStyle={{
              width: '100%',
              height: '100%',
            }}
            labelStyle={{
              color: '#000000'
            }}
            onPress={() => {
              if (this.state.reveal == 2) {
                this.stopRun(1);
              }
            }}
          >Select Choice 1</Button>
          <Button
            mode="contained"
            style={{
              marginLeft: 5,
              marginRight: 5,
              height: '98%',
              flex: 1,
              backgroundColor: '#DDDDDD',
              opacity: this.state.reveal == 3 ? 100 : 0
            }}
            contentStyle={{
              width: '100%',
              height: '100%',
            }}
            labelStyle={{
              color: '#000000'
            }}
            onPress={() => {
              if (this.state.reveal == 3) {
                this.stopRun(2);
              }
            }}
          >Select Choice 2</Button>
        </View>
      </View>
    );
  }
}
