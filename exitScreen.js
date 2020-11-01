import React, {useState} from 'react';
import { View } from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper';

import styles from './styles.js';

export default class ExitScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      answer: ''
    };
  }

  componentDidMount() {
    this.props.navigation.setOptions({
      headerLeft: null,
    });
  }

  render() {

    return (
      <View style={[styles.contentRoot]}>
        <View style={[styles.contentRow]}>
          <Text style={[styles.textBody]}>
            Your measured CFF today is:
          </Text>
        </View>
        <View style={[styles.contentShortRow, styles.contentCenter]}>
          <Text style={[styles.textBody, styles.textBold]}>
            43.5 Hz
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
              const payload = JSON.stringify({
                time: Date.now(),
                question3: this.state.answer
              });
              fetch('https://homes.cs.washington.edu/~lichard/beacon/log/?user=' + global.user + '&data=' + payload)
                .then((response) => response.text())
                .then(() => {
                  this.setState({loading: false});
                  // quit
                });
              this.setState({loading: true});
            }}
          >Upload Results</Button>
        </View>
      </View>
    );
  }
}