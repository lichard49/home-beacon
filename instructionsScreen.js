import * as React from 'react';
import { FlatList, View } from 'react-native';
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
      'When you start each run, press "Show choice 1" to start the Beacon device\'s light.\n',
      'Then, press "Show choice 2" to see a different light pattern.\n',
      'One option is a steady light, and the other is a flickering light. Decide which one appeared to flicker, and press the corresponding button.\n',
      'A measurement consists of ' + global.sessionSettings.numTrials + ' runs.\n'
    ];

    let instructionsText = '';
    if (global.sessionSettings.protocol == 'descending_only') {
      instructionsText = DESCENDING_ONLY_INSTRUCTIONS_TEXT;
    } else if (global.sessionSettings.protocol == 'forced_choice') {
      instructionsText = FORCED_CHOICE_INSTRUCTIONS_TEXT;
    }

    return (
      <View style={[styles.contentRoot]}>
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
          >{'Start run 1 of ' + global.sessionSettings.numTrials}</Button>
        </View>
      </View>
    );
  }
}