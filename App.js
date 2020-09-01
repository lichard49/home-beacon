import 'react-native-gesture-handler';
import * as React from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

const styles = StyleSheet.create({
  titleText: {
    fontSize: 30,
    fontWeight: 'bold',
    marginTop: 100
  },
  centeredRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 50
  }
})

const CodeDigitInput = (props) => {
  return (
    <TextInput
      style={{
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        margin: 10
      }}
      keyboardType={'numeric'}
      maxLength={1}
    />
  )
}

const HomeScreen = ({ navigation }) => {
  return (
    <View>
      <View
        style={[styles.centeredRow]}
      >
        <Text
          style={[styles.titleText]}
        >
          Beacon
        </Text>
      </View>

      <View
        style={[styles.centeredRow]}
      >
        <CodeDigitInput />
        <CodeDigitInput />
        <CodeDigitInput />
        <CodeDigitInput />
      </View>

      <View
        style={[styles.centeredRow]}
      >
        <Button
          title="Go to instructions"
          onPress={() =>
            navigation.navigate('Instructions')
          }
        />
      </View>
    </View>
  );
};

const InstructionsScreen = ({ navigation }) => {
  return (
    <View>
      <Text>Do this do that</Text>
      <Button
        title="Go to experiment"
        onPress={() =>
          navigation.navigate('Experiment')
        }
      />
    </View>
  );
};

const ExperimentScreen = ({ navigation }) => {
  return (
    <Button
      title="Experiment"
      onPress={() =>
        navigation.navigate('Exit')
      }
    ></Button>
  );
};

const ExitScreen = ({ navigation }) => {
  return (
    <Button
      title="Exit"
    ></Button>
  );
};

const HelloWorldApp = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: 'Welcome' }}
        />
        <Stack.Screen name="Instructions" component={InstructionsScreen} />
        <Stack.Screen name="Experiment" component={ExperimentScreen} />
        <Stack.Screen name="Exit" component={ExitScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default HelloWorldApp;
