import * as React from 'react';
import { TextInput, Button, Text, View } from 'react-native';

import styles from './styles.js';

export default class CodeScreen extends React.Component {
  
  DigitInput = (props) => {
    return (
      <TextInput
        style={{
          height: 40,
          width: 40,
          borderColor: 'gray',
          borderWidth: 1,
          margin: 10
        }}
        keyboardType={'numeric'}
        maxLength={1}
      />
    )
  }

  render() {

    return (
      <View style={[styles.contentRoot]}>
        <View style={[styles.contentRow]}>
          <Text style={[styles.textBody]}>
            Enter the code given to you by the study coordinator.
          </Text>
        </View>
        <View style={[styles.contentRow, styles.contentCenter]}>
          <this.DigitInput />
          <this.DigitInput />
          <this.DigitInput />
          <this.DigitInput />
        </View>
        <View style={[styles.contentRow, styles.contentCenter]}>
          <Button
            title="Go to instructions"
            style={[styles.textBody]}
            onPress={() =>
              this.props.navigation.navigate('Instructions')
            }
          />
        </View>
      </View>
    );
  }
}