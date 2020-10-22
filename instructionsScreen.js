import * as React from 'react';
import { FlatList, View } from 'react-native';
import { Button, Text } from 'react-native-paper';

import styles from './styles.js';

const INSTRUCTIONS_TEXT = [
  'On the next screen, when you press the button, the Beacon device\'s light will turn on.\n',
  'The light will slowly start flickering (or shimmering).\n',
  'Once you are certain that the light is steadily flickering (or shimmering), press the button.\n',
  'This process will repeat 8 times.\n'
];

getIndex = (item, index) => index.toString()

renderRow = ({ item, index }) => (
  <View style={{flexDirection: "row"}}>
    <Text style={[styles.textBody]}>{ index+1 }. </Text>
    <Text style={[styles.textBody]}>{ item }</Text>
  </View>
)

export default class InstructionsScreen extends React.Component {

  render() {

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
            data={INSTRUCTIONS_TEXT}
            renderItem={renderRow}
          />
        </View>
        <View style={[styles.contentRow, styles.contentCenter]}>
          <Button
            mode="outlined"
            style={[styles.textBody]}
            onPress={() =>
              this.props.navigation.navigate('Measurement')
            }
          >Start measurement 1</Button>
        </View>
      </View>
    );
  }
}