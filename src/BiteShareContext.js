import React from 'react';

export const biteShareState = {
  role: 'host',
  restaurantName: 'BRAZILIAN RESTAURANT BREWING',
  accountHolderName: 'Susan',
  accountType: 'HOST'
};

export const biteShareReducer = (state, action) => {
  switch (action.type) {
  case 'SET_ROLE':
    return {...state, role: action.role}; // dispatch({ type: 'SET_ROLE', role: 'guest' })
  case 'SET_RESTAURANT_NAME':
    return {...state, restaurantName: action.restaurantName};
  case 'SET_ACCOUNT_HOLDER_NAME':
    return {...state, accountHolderName: action.accountHolderName};
  case 'SET_ACCOUNT_TYPE':
    return {...state, accountType: action.accountType};
  default:
    return state;
  }
};

export const BiteShareContext = React.createContext({ state: biteShareState, dispatch: () => {} });