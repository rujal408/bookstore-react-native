import React from 'react';
import {StyleSheet, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import BookContext from './context/BookContext';
import Main from './Main';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <BookContext>
      <View style={styles.container}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name={'Main'}
              component={Main}
              options={{headerShown: false}}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </View>
    </BookContext>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
export default App;
