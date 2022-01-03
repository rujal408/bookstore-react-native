import React, {useState} from 'react';
import axios from 'axios';
import {StyleSheet, Image, Text, View, Pressable} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const BookDetail = ({route}) => {
  const [detail, setDetail] = useState({});
  const [isInCart, setIsInCart] = useState(true);

  React.useEffect(() => {
    const fetchDetail = async () => {
      try {
        let res = await axios.get(
          'https://api.itbook.store/1.0/books/' + route.params.itemId,
        );

        if (res.status === 200) {
          setDetail(res.data);
          checkCart(res.data);
        } else {
          throw new Error(res);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchDetail();
  }, [route.params.itemId]);

  const checkCart = async det => {
    // Check whether this detail is added in cart or not
    const a = await AsyncStorage.getItem('cart');
    const d = JSON.parse(a);
    const check = d && d.some(x => x.isbn13 === det.isbn13);
    setIsInCart(check);
  };

  const addItemsToCart = async () => {
    const d = await AsyncStorage.getItem('cart');
    if (d === null) {
      await AsyncStorage.setItem('cart', JSON.stringify([detail]));
      setIsInCart(true);
    } else {
      const a = JSON.parse(d);
      await AsyncStorage.setItem('cart', JSON.stringify([...a, detail]));
      setIsInCart(true);
    }
  };

  return (
    <View style={styles.main}>
      <View>
        {!isInCart && (
          <Pressable style={styles.button} onPress={addItemsToCart}>
            <Text style={{color: 'white'}}>Buy</Text>
          </Pressable>
        )}
        <View
          style={{
            display: 'flex',
            justifyContent: 'space-around',
            flexDirection: 'row',
          }}>
          <Image source={{uri: detail.image}} style={styles.image} />
          <View style={{marginTop: 11}}>
            <Text style={styles.price}>Price: {detail.price}</Text>
            <Text>Language: {detail.language}</Text>
            <Text>Rating: {detail.rating}</Text>
            <Text>Year: {detail.year}</Text>
            <Text>Pages: {detail.pages}</Text>
          </View>
        </View>
      </View>
      <View>
        <Text style={styles.proName}>Author: {detail.authors}</Text>
        <Text style={{flexShrink: 1, textAlign: 'justify'}}>{detail.desc}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    display: 'flex',
    flexDirection: 'column',
    margin: 10,
  },
  image: {
    height: 200,
    width: 200,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: '#841584',
  },
  price: {
    color: 'orange',
    fontWeight: 'bold',
  },
  proName: {
    color: 'blue',
  },
});

export default BookDetail;
