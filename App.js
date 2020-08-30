import 'react-native-gesture-handler';
import * as React from 'react';
import { Text, View, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

const HomeScreen = ({ navigation }) => {
  return (
    <Button
      title="Go to instructions"
      onPress={() =>
        navigation.navigate('Instructions')
      }
    />
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
