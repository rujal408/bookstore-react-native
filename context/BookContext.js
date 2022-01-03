import React, {createContext, useReducer} from 'react';
const initialState = {
  searchedBooks: {error: '0', total: '0', books: []},
  searchText: '',
  page: 1,
};

function reducer(state, action) {
  switch (action.type) {
    case 'SET_BOOKS':
      return {
        ...state,
        searchedBooks: action.payload,
      };
    case 'SET_SEARCH_TEXT':
      return {
        ...state,
        searchText: action.payload,
      };
    case 'SET_PAGE':
      return {
        ...state,
        page: action.payload,
      };
    default:
      return state;
  }
}

export const Context = createContext();

const BookContext = ({children}) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <Context.Provider value={[state, dispatch]}>{children}</Context.Provider>
  );
};

export default BookContext;
