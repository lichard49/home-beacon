import * as React from 'react';
import { ScrollView, FlatList, View } from 'react-native';
import { Button, Text } from 'react-native-paper';

import styles from './styles.js';

getIndex = (_, index) => index.toString()

renderRow = ({ item, index }) => (
  <View style={{flexDirection: 'row', width: '95%'}}>
    <Text style={[styles.textBody]}>{ index+1 }. </Text>
    <Text style={[styles.textBody]}>{ item }</Text>
  </View>
)

export default class InstructionsScreen extends React.Component {

  render() {
    const DESCENDING_ONLY_INSTRUCTIONS_TEXT = [
      'When you start each run, the Beacon device\'s light will turn on.\n',
      'The light will slowly begin to flicker.\n',
      'Once you are confident that the light is steadily flickering, press the button.\n',
      'A measurement consists of ' + global.sessionSettings.numTrials + ' runs.\n'
    ];

    const FORCED_CHOICE_INSTRUCTIONS_TEXT = [
      'Press "Show choice 1" to start the run.\n',
      'Determine whether the light you are seeing is flickering or not.\n',
      'Press "Show Choice 2" button to see the second option.\n',
      'Determine whether the light you are seeing is flickering or not.\n',
      'Only one of the two choices is flickering. If you would like, you can review each choice multiple times. Press the corresponding button to report which choice appeared flickering to you.\n',
      'You will repeat steps 1 through 5 till you arrive at your threshold frequency.\n',
      'A measurement consists of ' + global.sessionSettings.numTrials + ' runs.\n'
    ];

    const CLINIC_INSTRUCTIONS_TEXT = [
      'Consult with the study coordinator on how to use this app.\n'
    ];

    let instructionsText = '';
    if (global.sessionSettings.isClinic) {
      instructionsText = CLINIC_INSTRUCTIONS_TEXT;
    } else if (global.sessionSettings.protocol == 'descending_only') {
      instructionsText = DESCENDING_ONLY_INSTRUCTIONS_TEXT;
    } else if (global.sessionSettings.protocol == 'forced_choice') {
      instructionsText = FORCED_CHOICE_INSTRUCTIONS_TEXT;
    }

    return (
      <ScrollView style={[styles.contentRoot]}>
        <View style={[styles.contentRow]}>
          <Text style={[styles.textSubtitle]}>
            Instructions
          </Text>
        </View>
        <View style={[styles.contentRow]}>
          <FlatList
            style={[styles.textBody]}
            keyExtractor={getIndex}
            data={instructionsText}
            renderItem={renderRow}
          />
        </View>
        <View style={[styles.contentRow, styles.contentCenter]}>
          <Button
            mode="contained"
            style={[styles.textBody]}
            onPress={() =>
              this.props.navigation.navigate('Measurement')
            }
          >{global.sessionSettings.isClinic ? 'Start' : 'Start run 1 of ' +
            global.sessionSettings.numTrials
          }</Button>
        </View>
      </ScrollView>
    );
  }
}