import React, {useState} from 'react';
import { ScrollView, TouchableWithoutFeedback, Keyboard, View } from 'react-native';
import { RadioButton, TextInput, Button, Text } from 'react-native-paper';

import styles from './styles.js';

export default class QuestionnaireScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      question1Selection: null,
      question2Selection: null,
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
        <ScrollView style={styles.scrollView}>
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
            <RadioButton.Group
              value={this.question1Selection}
              onValueChange={(value) => this.setState({question1Selection: value})}
            >
              <RadioButton.Item
                label="Yes"
                value="yes"
                mode="android"
                status={this.state.question1Selection == 'yes' ? 'checked' : 'unchecked'}
              />
              <RadioButton.Item
                label="No"
                value="no"
                mode="android"
                status={this.state.question1Selection == 'no' ? 'checked' : 'unchecked'}
              />
            </RadioButton.Group>
            <View>
              {
                this.state.question1Selection == 'yes' ? (
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
            </View>
            <View style={[styles.contentRow]}>
              <Text style={[styles.textBody]}>
                What prompted you to take a measurement now?
              </Text>
            </View>
            <RadioButton.Group
              value={this.question2Selection}
              onValueChange={(value) => this.setState({question2Selection: value})}
            >
              <RadioButton.Item
                label="This was my daily measurement"
                value="daily"
                mode="android"
                status={this.state.question2Selection == 'daily' ? 'checked' : 'unchecked'}
              />
              <RadioButton.Item
                label="I didn't like my previous result"
                value="like"
                mode="android"
                status={this.state.question2Selection == 'like' ? 'checked' : 'unchecked'}
              />
              <RadioButton.Item
                label="Something happened that raised concern"
                value="concern"
                mode="android"
                status={this.state.question2Selection == 'concern' ? 'checked' : 'unchecked'}
              />
              <RadioButton.Item
                label="I was curious what my measurement would be"
                value="curious"
                mode="android"
                status={this.state.question2Selection == 'curious' ? 'checked' : 'unchecked'}
              />
              <RadioButton.Item
                label="Other"
                value="other"
                mode="android"
                status={this.state.question2Selection == 'other' ? 'checked' : 'unchecked'}
              />
            </RadioButton.Group>
            <View style={[styles.contentRow, styles.contentCenter]}>
              <Button
                mode="contained"
                disabled={this.state.question1Selection == null || this.state.question2Selection == null}
                style={[styles.textBody]}
                loading={this.state.loading}
                onPress={() => {
                  const payload = JSON.stringify({
                    time: Date.now(),
                    question1: this.state.question1Selection,
                    question1Explanation: this.state.answer,
                    question2: this.state.question2Selection
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
              <Button
                mode="contained"
                style={[styles.textBody, {marginLeft: 5}]}
                loading={this.state.loading}
                onPress={() => {
                }}
              >Discard</Button>
            </View>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    );
  }
}