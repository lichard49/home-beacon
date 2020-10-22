import React, {useState} from 'react';
import { View } from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper';

import styles from './styles.js';

export default class ExitScreen extends React.Component {

  render() {

    return (
      <View style={[styles.contentRoot]}>
        <View style={[styles.contentRow]}>
          <Text style={[styles.textBody]}>
            Your measured CFF today is 43.5 Hz.
          </Text>
        </View>
        <View style={[styles.contentRow]}>
          <Text style={[styles.textBody]}>
            Is there anything else you would like us or yourself to know when look back your measurement from this session?
          </Text>
        </View>
        <View style={[styles.contentRow, styles.contentCenter]}>
          <TextInput
            style={{
              height: 150,
              width: 300,
              borderColor: 'gray',
              borderWidth: 1,
              margin: 10
            }}
          />
        </View>
        <View style={[styles.contentRow, styles.contentCenter]}>
          <Button
            mode="outlined"
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