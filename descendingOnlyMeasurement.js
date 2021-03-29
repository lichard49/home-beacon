import * as React from 'react';
import { View } from 'react-native';
import { Button, Text } from 'react-native-paper';

export default class DescendingOnlyMeasurement extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      finished: false,
      seconds: global.sessionSettings.protocolSettings.frequencyStart
    };
  }

  componentDidMount() {
    this.startRun();
  }

  startRun() {
    this.setState({seconds: global.sessionSettings.protocolSettings.frequencyStart});
    this.setState({finished: false});

    global.writeBeacon(0);

    this.timer = setInterval(() => {
      if (this.state.seconds == global.sessionSettings.protocolSettings.frequencyStop) {
        this.stopRun();
      } else {
        // Bluetooth send this.state.seconds to device
        global.writeBeacon(this.state.seconds);

        // decrease according to step size
        this.setState({seconds: this.state.seconds - global.sessionSettings.protocolSettings.frequencyStep});
      }
    }, 100);
  }

  stopRun() {
    this.props.onStop(this.state.seconds);
    clearInterval(this.timer);

    global.writeBeacon(0);
  }

  render() {

    return (

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
        >Press here</Button>
      </View>
    );
  }
}
