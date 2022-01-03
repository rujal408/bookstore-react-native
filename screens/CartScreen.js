import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  StyleSheet,
  SafeAreaView,
  View,
  FlatList,
  Text,
  TouchableOpacity,
  Image,
  TouchableHighlight,
} from 'react-native';

const CartScreen = ({navigation}) => {
  const [list, setList] = useState([]);
  useEffect(() => {
    // Get cart list item from Localstorage
    const setStorageData = async () => {
      const a = await AsyncStorage.getItem('cart');
      const d = JSON.parse(a);
      setList(
        d.map(({isbn13, title, image, price}) => ({
          isbn13,
          title,
          image,
          price,
        })),
      );
    };
    setStorageData();
  }, []);

  const ItemView = ({item}) => {
    console.log(item);
    return (
      // Flat List Item
      <View
        style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
        <TouchableHighlight onPress={getItem}>
          <Image source={{uri: item.image}} style={{height: 55, width: 55}} />
        </TouchableHighlight>
        <Text style={styles.itemStyle}>
          {item.title.toUpperCase().substring(0, 15)}
        </Text>
        <Text style={{color: '#38ada9'}}>{item.price}</Text>
      </View>
    );
  };

  const getItem = item => {
    navigation.navigate('BookDetail', {itemId: item.isbn13});
  };

  const ItemSeparatorView = () => {
    return (
      // Flat List Item Separator
      <TouchableOpacity>
        <View
          style={{
            height: 0.5,
            width: '100%',
            backgroundColor: 'red',
          }}
        />
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView>
      <View>
        <FlatList
          data={list}
          keyExtractor={item => item.isbn13}
          ItemSeparatorComponent={ItemSeparatorView}
          renderItem={({item}) => <ItemView item={item} />}
          enableEmptySections={true}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  itemStyle: {
    padding: 15,
  },
});

export default CartScreen;
