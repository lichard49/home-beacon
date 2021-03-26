import React, {useState} from 'react';
import { TouchableWithoutFeedback, Keyboard, View } from 'react-native';
import { Portal, Dialog, Paragraph, TextInput, Button, Text } from 'react-native-paper';

import styles from './styles.js';

export default class ExitScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      finished: false,
      answer: '',
      cff: 0
    };
  }

  componentDidMount() {
    this.props.navigation.setOptions({
      headerLeft: null,
    });

    let averageRun = 0;
    let numValid = 0;
    for (let i = 0; i < global.runs.length; i++) {
      if (global.runs[i].valid) {
        averageRun += global.runs[i].frequency;
        numValid++;
      }
    }
    averageRun /= numValid;
    this.setState({cff: averageRun});
  }

  render() {

    return (
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={[styles.contentRoot]}>
          <View style={[styles.contentRow]}>
            <Text style={[styles.textBody]}>
              Your measured CFF today is:
            </Text>
          </View>
          <View style={[styles.contentShortRow, styles.contentCenter]}>
            <Text style={[styles.textBody, styles.textBold]}>
              {this.state.cff.toFixed(2)} Hz
            </Text>
          </View>
          <View style={[styles.contentRow]}>
            <Text style={[styles.textBody]}>
              Is there anything else you would like us or yourself to know when look back your measurement from this session?
            </Text>
          </View>
          <View style={[styles.contentRow, styles.contentCenter]}>
            <TextInput
              style={[styles.inputBox]}
              onChangeText={text => this.setState({answer: text})}
            />
          </View>
          <View style={[styles.contentRow, styles.contentCenter]}>
            <Button
              mode="contained"
              style={[styles.textBody]}
              loading={this.state.loading}
              onPress={() => {
                writeLog({
                  runs: global.runs,
                  question3: this.state.answer
                }, true, function() {
                  this.setState({
                    loading: false,
                    finished: true
                  })
                });
                this.setState({loading: true});
              }}
            >Upload Results</Button>
          </View>
          <Portal>
            <Dialog
              visible={this.state.finished}
              dismissable="false"
              >
              <Dialog.Title>Measurement Complete</Dialog.Title>
              <Dialog.Content>
                <Paragraph>Please close this app by swiping up on this app in
                  the app switcher.</Paragraph>
              </Dialog.Content>
            </Dialog>
          </Portal>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}