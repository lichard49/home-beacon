import * as React from 'react';
import { Linking, TouchableWithoutFeedback, Keyboard, View } from 'react-native';
import { Portal, Modal, Text, TextInput, Button } from 'react-native-paper';

import styles from './styles.js';

const USER_ID_AUTH_ENDPOINT = 'https://homes.cs.washington.edu/~lichard/' +
  'beacon/config/?user=';

const OFFLINE_DEV_USER_ID = '8888';
const OFFLINE_DEV_DEVICE_ID = null;
const OFFLINE_DEV_PROTOCOL = 'forced_choice';
const OFFLINE_DEV_NUM_TRIALS = 2;
const OFFLINE_DEV_PROTOCOL_SETTINGS = {
  frequencyStart: 55,   // frequency in Hz * 10
  frequencyStop: 25,   // frequency in Hz * 10
  frequencyStep: 0.5   // frequency step in Hz/100 ms
};

export default class LoginScreen extends React.Component {
  
  constructor (props) {
    super(props);
    this.inputRefs = Array(4).fill(React.createRef());
    this.state = {
      code0: '',
      code1: '',
      code2: '',
      code3: '',
      codeFinished: false,
      loading: false,
      error: false
    };
  }

  componentDidMount() {
    this.props.navigation.setOptions({
      headerLeft: null
    });
  }

  handleCode(text, index) {
    let nextIndex = index + 1;

    if (!isNaN(parseInt(text))) {
      this.setState({[`code${index}`]: text});

      if (text.length == 1) {
        if (nextIndex < this.inputRefs.length) {
          this.inputRefs[nextIndex].focus();
        } else if (nextIndex == this.inputRefs.length) {
          this.setState({codeFinished: true});
          Keyboard.dismiss();
        }
      }
    } else {
      this.setState({[`code${index}`]: ''});
    }
  }

  validateUserId() {
    let userIdToTest = this.state.code0 + this.state.code1 +
      this.state.code2 + this.state.code3;

    if (userIdToTest === OFFLINE_DEV_USER_ID) {
      this.populateSessionSettings(OFFLINE_DEV_USER_ID, OFFLINE_DEV_DEVICE_ID,
        false, OFFLINE_DEV_NUM_TRIALS, OFFLINE_DEV_PROTOCOL,
        OFFLINE_DEV_PROTOCOL_SETTINGS);
      this.nextScreen();
    } else {
      fetch(USER_ID_AUTH_ENDPOINT + userIdToTest)
        .then((response) => response.text())
        .then((text) => {
          if (text == '-1') {
            this.setState({
              code0: '',
              code1: '',
              code2: '',
              code3: '',
              error: true
            });
            this.inputRefs[0].focus();
          } else {
            let config = JSON.parse(text);
            this.populateSessionSettings(config.id,
              config.device == false ? null : config.device, config.isClinic,
              config.numTrials, config.protocol, config.protocol_settings);
            this.nextScreen();
          }
        });
    }
  }

  nextScreen() {
    writeLog('login', global.sessionSettings, () => {
      this.setState({loading: false});
      this.props.navigation.navigate('Connect');
    });
  }

  populateSessionSettings(userId, deviceId, isClinic, numTrials, protocol,
    protocolSettings, originalConfig=null) {

    global.sessionSettings.userId = userId;
    global.sessionSettings.deviceId = deviceId;
    global.sessionSettings.isClinic = isClinic;
    global.sessionSettings.numTrials = numTrials;
    global.sessionSettings.protocol = protocol;
    global.sessionSettings.protocolSettings = protocolSettings;
    global.sessionSettings.originalConfig = originalConfig;
  }

  render() {

    return (
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={[styles.contentRoot], {flex: 1, padding: 20}}>
          <View style={[styles.contentRow, styles.contentCenter]}>
            <Text style={[styles.textTitle]}>
              Beacon
            </Text>
          </View>
          <View style={[styles.contentRow]}>
            <Text style={[styles.textBody]}>
              Enter the code given to you by the study coordinator.
            </Text>
          </View>
          <View style={[styles.contentRow, styles.contentCenter]}>
            {
              this.inputRefs.map((_, index) => (
                <TextInput
                  key={`code${index}`}
                  onChangeText={text => this.handleCode(text, index)}
                  ref={r => this.inputRefs[index] =  r}
                  value={this.state[`code${index}`]}
                  maxLength={1}
                  style={{
                    width: 50,
                    margin: 10
                  }}
                  keyboardType={'numeric'}
                />
              ))
            }
          </View>
          <View style={[styles.contentRow, styles.contentCenter]}>
            <Button
              mode="contained"
              disabled={!this.state.codeFinished}
              style={[styles.textBody]}
              loading={this.state.loading}
              onPress={() => {
                this.validateUserId();
                this.setState({loading: true});
              }}
            >Connect to device</Button>
          </View>
          <View style={[styles.contentRow], {
            flex: 1,
            justifyContent: 'flex-end',
            marginBottom: 20
            }}>
            <Text style={{fontSize: 15}}>
              This app should only be used as part of a research study run by the University of Washington.
              The measurements provided by this app should not be considered a medical diagnosis.
              In case of emergency, contact a physician or healthcare provider.
              More information on the protocol used by this app can be found in this{' '}
              <Text
                style={{color: 'blue'}}
                onPress={() => {
                  Linking.openURL('https://homes.cs.washington.edu/~rkarkar/pubs/jour-imwut2018-beacon.pdf');
                }}>

                peer-reviewed study
              </Text>
              .
            </Text>
          </View>
          <Portal>
            <Modal
              visible={this.state.error}
              contentContainerStyle={{
                backgroundColor: 'white',
                width: '60%',
                padding: 20,
                margin: '20%'
              }}
              onDismiss={() => this.setState({error: false})}
            >
              <Text>Code was invalid. Try again.</Text>
            </Modal>
          </Portal>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}