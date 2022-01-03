import React from 'react';
import axios from 'axios';
import {SearchBar as Search} from 'react-native-elements';

const SearchBar = ({handleSearch, state, dispatch}) => {
  const searchData = async text => {
    dispatch({type: 'SET_SEARCH_TEXT', payload: text});

    try {
      let res = await axios.get(
        'https://api.itbook.store/1.0/search/' + text + '/' + state.page,
      );
      if (res.status === 200) {
        // Send data and text to parent Header
        handleSearch(res.data, text);
      } else {
        throw new Error(res);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Search
      placeholder="Search Here..."
      lightTheme
      round
      value={state.searchText}
      onChangeText={searchData}
      autoCorrect={false}
    />
  );
};

export default SearchBar;
