import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Header from './components/Header';
import Home from './screens/Home';
import BookDetail from './screens/BookDetail';
import SearchedData from './screens/SearchedData';
import CartScreen from './screens/CartScreen';
const Stack = createNativeStackNavigator();

const Main = ({navigation}) => {
  return (
    <>
      <Header navigation={navigation} />
      <Stack.Navigator>
        <Stack.Screen
          name={'Home'}
          component={Home}
          options={{title: 'Book List'}}
        />
        <Stack.Screen
          name={'SearchedData'}
          component={SearchedData}
          options={{title: 'Searched Data'}}
        />
        <Stack.Screen
          name={'BookDetail'}
          component={BookDetail}
          options={{title: 'Book Detail'}}
        />
        <Stack.Screen
          name={'CartScreen'}
          component={CartScreen}
          options={{title: 'Cart'}}
        />
      </Stack.Navigator>
    </>
  );
};

export default Main;
