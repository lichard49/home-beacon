import * as React from 'react';
import { FlatList, View } from 'react-native';
import { Button, Text } from 'react-native-paper';

import styles from './styles.js';

const INSTRUCTIONS_TEXT = [
  'When you start each run, the Beacon device\'s light will turn on.\n',
  'The light will slowly begin to flicker.\n',
  'Once you are confident that the light is steadily flickering, press the button.\n',
  'A measurement consists of 8 runs.\n'
];

getIndex = (_, index) => index.toString()

renderRow = ({ item, index }) => (
  <View style={{flexDirection: 'row', width: '95%'}}>
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
            mode="contained"
            style={[styles.textBody]}
            onPress={() =>
              this.props.navigation.navigate('Measurement')
            }
          >Start run 1 of 8</Button>
        </View>
      </View>
    );
  }
}