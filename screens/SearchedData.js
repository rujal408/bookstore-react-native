import axios from 'axios';
import React from 'react';
import Lists from '../components/List';
import {Context} from '../context/BookContext';

const SearchedData = ({navigation}) => {
  const [state, dispatch] = React.useContext(Context);

  const loadMoreItems = async () => {
    const page = state.page + 1;
    dispatch({type: 'SET_PAGE', payload: page});
    try {
      const res = await axios.get(
        'https://api.itbook.store/1.0/search/' + state.text + '/' + page,
      );

      if (res.status === 200) {
        dispatch({
          type: 'SET_BOOKS',
          payload: {
            ...res.data,
            books: [...state.searchedBooks.books, ...res.data.books], // Append loaded books in existing state books
          },
        });
        return true;
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Lists
      data={state.searchedBooks}
      navigation={navigation}
      pagination={+state.searchedBooks.total !== 0}
      loadMore={loadMoreItems}
    />
  );
};

export default SearchedData;
