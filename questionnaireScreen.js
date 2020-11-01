import React, {useState} from 'react';
import { TouchableWithoutFeedback, Keyboard, View } from 'react-native';
import { RadioButton, TextInput, Button, Text } from 'react-native-paper';

import styles from './styles.js';

export default class QuestionnaireScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      selection: null,
      loading: false,
      answer: ''
    };
  }

  componentDidMount() {
    this.props.navigation.setOptions({
      headerLeft: null
    });
  }

  render() {

    return (
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={[styles.contentRoot]}>
          <View style={[styles.contentRow]}>
            <Text style={[styles.textBody]}>
              Many factors, including insufficient sleep, fatigue, or distractions, can affect a measurement.
            </Text>
          </View>
          <View style={[styles.contentRow]}>
            <Text style={[styles.textBody]}>
              Do you think any of these or any other factor affected your measure?
            </Text>
          </View>
          <View style={[styles.contentRow, styles.contentCenter]}>
            <RadioButton.Group
              value={''}
              onValueChange={(value) => this.setState({selection: value})}
            >
              <View style={[{marginRight: 50}]}>
                <Text style={[styles.textBody]}>Yes</Text>
                <RadioButton.Android
                  value="yes"
                  status={this.state.selection == 'yes' ? 'checked' : 'unchecked'}
                />
              </View>
              <View style={[]}>
                <Text style={[styles.textBody]}>&nbsp;No</Text>
                <RadioButton.Android
                  value="no"
                  status={this.state.selection == 'no' ? 'checked' : 'unchecked'}
                />
              </View>
            </RadioButton.Group>
          </View>
          <View>
            {
              this.state.selection == 'yes' ? (
                <View>
                  <View style={[styles.contentShortRow]}>
                    <Text style={[styles.textBody]}>Please explain:</Text>
                  </View>
                  <View style={[styles.contentCenter, styles.contentShortRow]}>
                    <TextInput
                      style={[styles.inputBox]}
                      onChangeText={text => this.setState({answer: text})}
                    />
                  </View>
                </View>
              ) : null
            }
            <View style={[styles.contentRow, styles.contentCenter]}>
              <Button
                mode="contained"
                disabled={this.state.selection == null}
                style={[styles.textBody]}
                loading={this.state.loading}
                onPress={() => {
                  const payload = JSON.stringify({
                    time: Date.now(),
                    question1: this.state.selection,
                    question2: this.state.answer
                  });
                  fetch('https://homes.cs.washington.edu/~lichard/beacon/log/?user=' + global.user + '&data=' + payload)
                    .then((response) => response.text())
                    .then(() => {
                      this.setState({loading: false});
                      this.props.navigation.navigate('Exit');
                    });
                  this.setState({loading: true});
                }}
              >Submit</Button>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}