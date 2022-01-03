import React from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  FlatList,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';

const Lists = ({navigation, data, pagination, loadMore}) => {
  const [loading, setLoading] = React.useState(false);

  const loadMoreData = async () => {
    setLoading(true);
    const res = await loadMore();
    if (res) {
      setLoading(false);
    }
  };

  const ItemView = ({item, navigation}) => {
    return (
      // Flat List Item
      <Text style={styles.itemStyle} onPress={() => getItem(navigation, item)}>
        {item.title.toUpperCase()}
      </Text>
    );
  };

  const getItem = (navigation, item) => {
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

  const renderFooter = () =>
    pagination ? (
      <View style={styles.footer}>
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={loadMoreData}
          //On Click of button load more data
          style={styles.loadMoreBtn}>
          <Text style={styles.btnText}>Load More</Text>
          {loading ? (
            <ActivityIndicator color="white" style={{marginLeft: 8}} />
          ) : null}
        </TouchableOpacity>
      </View>
    ) : null;
  return (
    <SafeAreaView>
      <View>
        <FlatList
          data={data.books}
          keyExtractor={item => item.isbn13}
          ItemSeparatorComponent={ItemSeparatorView}
          renderItem={({item}) => (
            <ItemView item={item} navigation={navigation} />
          )}
          enableEmptySections={true}
          ListFooterComponent={renderFooter}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 32,
  },
  itemStyle: {
    padding: 15,
  },
  footer: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  loadMoreBtn: {
    padding: 10,
    backgroundColor: '#800000',
    borderRadius: 4,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText: {
    color: 'white',
    fontSize: 15,
    textAlign: 'center',
  },
});
export default Lists;
