import * as React from 'react';
import { View } from 'react-native';
import { Portal, Modal, Text, TextInput, Button } from 'react-native-paper';

import styles from './styles.js';

export default class CodeScreen extends React.Component {
  
  constructor (props) {
    super(props);
    this.inputRefs = Array(4).fill(React.createRef());
    this.state = {
      code0: '',
      code1: '',
      code2: '',
      code3: '',
      codeFinished: false,
      loading: false,
      error: false
    };
  }

  componentDidMount() {
    this.props.navigation.setOptions({
      headerLeft: null
    });
  }

  handleCode(text, index) {
    let nextIndex = index + 1;

    if (!isNaN(parseInt(text))) {
      this.setState({[`code${index}`]: text});

      if (text.length == 1) {
        if (nextIndex < this.inputRefs.length) {
          this.inputRefs[nextIndex].focus();
        } else if (nextIndex == this.inputRefs.length) {
          this.setState({codeFinished: true});
        }
      }
    } else {
      this.setState({[`code${index}`]: ''});
    }
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
          {
            this.inputRefs.map((_, index) => (
              <TextInput
                key={`code${index}`}
                onChangeText={text => this.handleCode(text, index)}
                ref={r => this.inputRefs[index] =  r}
                value={this.state[`code${index}`]}
                maxLength={1}
                style={{
                  width: 50,
                  margin: 10
                }}
                keyboardType={'numeric'}
              />
            ))
          }
        </View>
        <View style={[styles.contentRow, styles.contentCenter]}>
          <Button
            mode="contained"
            disabled={!this.state.codeFinished}
            style={[styles.textBody]}
            loading={this.state.loading}
            onPress={() => {
              const code = this.state.code0 + this.state.code1 + this.state.code2 + this.state.code3;
              fetch('https://homes.cs.washington.edu/~lichard/beacon/auth/?code=' + code)
                .then((response) => response.text())
                .then((text) => {
                  this.setState({loading: false});
                  if (text == 'true') {
                    this.props.navigation.navigate('Instructions');
                  } else {
                    this.setState({
                      code0: '',
                      code1: '',
                      code2: '',
                      code3: '',
                      error: true
                    });
                    this.inputRefs[0].focus();
                  }
                });
              this.setState({loading: true});
            }}
          >Go to instructions</Button>
        </View>
        <Portal>
          <Modal
            visible={this.state.error}
            contentContainerStyle={{
              backgroundColor: 'white',
              width: '60%',
              padding: 20,
              margin: '20%'
            }}
            onDismiss={() => this.setState({error: false})}
          >
            <Text>Code was invalid. Try again.</Text>
          </Modal>
        </Portal>
      </View>
    );
  }
}