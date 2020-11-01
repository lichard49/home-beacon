import React, {useState} from 'react';
import { View } from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper';

import styles from './styles.js';

export default class ExitScreen extends React.Component {

  componentDidMount() {
    this.props.navigation.setOptions({
      headerLeft: null
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
          <TextInput style={[styles.inputBox]} />
        </View>
        <View style={[styles.contentRow, styles.contentCenter]}>
          <Button
            mode="contained"
            style={[styles.textBody]}
            onPress={() =>
              this.props.navigation.navigate('Exit')
            }
          >Upload Results</Button>
        </View>
      </View>
    );
  }
}