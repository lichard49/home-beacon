import * as React from 'react';
import { View } from 'react-native';
import { Button, Text } from 'react-native-paper';

import styles from './styles.js';

export default class ForcedChoiceMeasurement extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      finished: false,
      seconds: this.maxHz
    };
  }

  componentDidMount() {
    this.startRun();
  }

  startRun() {
    this.setState({seconds: this.maxHz});
    this.setState({finished: false});

    global.writeBeacon(0);
  }

  stopRun() {
    this.props.onStop(this.state.seconds/10);
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
              backgroundColor: '#DDDDDD',
              opacity: 0
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
          >Show Choice 1</Button>
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
              this.stopRun()
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
            disabled="true"
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
              this.stopRun()
            }
          >Select Choice 1</Button>
          <Button
            mode="contained"
            disabled="true"
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
              this.stopRun()
            }
          >Select Choice 2</Button>
        </View>
      </View>
    );
  }
}
