import * as React from 'react';
import { View } from 'react-native';
import { Button, Text } from 'react-native-paper';

import styles from './styles.js';

export default class ForcedChoiceMeasurement extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      choice1: 250,   // frequency in Hz * 10
      choice2: 1000,
      reveal: 0   // 0: only "show choice 1", 1: "show choice 1 and 2",
                  // 2: "show choice 1 and 2" and "select choice 1",
                  // 3: "show choice 1 and 2" and "select choice 2"
    };
  }

  componentDidMount() {
  }

  showChoice(choice) {
    if (choice == 1) {
      global.writeBeacon(this.state.choice1);

      if (this.state.reveal == 0) {
        this.setState({reveal: 1});
      } else {
        this.setState({reveal: 2});
      }
    } else if (choice == 2) {
      global.writeBeacon(this.state.choice2);

      this.setState({reveal: 3});
    }
  }

  stopRun(choice) {
    if (choice == 1) {
      this.props.onStop(this.state.choice1/10);
    } else if (choice == 2) {
      this.props.onStop(this.state.choice1/10);
    }
    clearInterval(this.timer);
    global.writeBeacon(0);
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
            onPress={() =>
              this.stopRun(1)
            }
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
            onPress={() =>
              this.stopRun(2)
            }
          >Select Choice 2</Button>
        </View>
      </View>
    );
  }
}
