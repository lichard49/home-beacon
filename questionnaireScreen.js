import React, {useState} from 'react';
import { TextInput, Button, Text, View } from 'react-native';

import styles from './styles.js';

export default class QuestionnaireScreen extends React.Component {

  state = {
    shouldShow: false
  }

  render() {

    return (
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
          <Button
            title="Yes"
            style={[styles.textBody]}
            onPress={() => {
              this.setState({shouldShow: true})
            }}
          />
          <Button
            title="No"
            style={[styles.textBody]}
            onPress={() =>
              this.props.navigation.navigate('Exit')
            }
          />
        </View>
        <View>
          {
            this.state.shouldShow ? (
              <View>
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
                    title="Submit"
                    style={[styles.textBody]}
                    onPress={() =>
                      this.props.navigation.navigate('Exit')
                    }
                  />
                </View>
              </View>
            ) : null
          }
        </View>
      </View>
    );
  }
}