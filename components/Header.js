import React, {useContext} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Link} from '@react-navigation/native';
import SearchBar from './SearchBar';
import {Context} from '../context/BookContext';

const Header = ({navigation}) => {
  const [state, dispatch] = useContext(Context);

  // Receives fetched data and typed text
  const handleSearch = (data, text) => {
    if (text.length === 0) {
      dispatch({type: 'SET_PAGE', payload: 1});
      navigation.navigate('Home');
    } else {
      dispatch({type: 'SET_BOOKS', payload: data});
      navigation.navigate('SearchedData');
    }
  };

  return (
    <View style={styles.header}>
      <Text style={styles.text}>Book Store</Text>
      <SearchBar
        handleSearch={handleSearch}
        state={state}
        dispatch={dispatch}
      />
      <Link
        style={{color: 'red', padding: 12, fontWeight: '500', fontSize: 30}}
        to={{screen: 'CartScreen'}}>
        Go to Cart List
      </Link>
    </View>
  );
};
const styles = StyleSheet.create({
  header: {
    padding: 15,
    backgroundColor: 'darkslateblue',
  },
  text: {
    color: '#fff',
    fontSize: 23,
    textAlign: 'center',
  },
});
export default Header;
