import React from 'react';

export const biteShareState = {
  isEveryoneReady: false,
  splitMethod: '',
  totalBill: 0,
  guests: [],
  restaurantName: 'BRAZILIAN RESTAURANT BREWING',
  resturantAddress: '3316 17th St, San Francisco, CA 94110',
  accountHolderName: 'Susan',
  accountType: 'HOST',
  accountId: 1234
};

export const biteShareReducer = (state, action) => {
  switch (action.type) {
  case 'SET_ORDER_STATUS':
    return {...state, isEveryoneReady: action.isEveryoneReady};
  case 'SET_SPLIT_METHOD':
    return {...state, splitMethod: action.splitMethod};
  case 'SET_TOTAL_BILL':
    return {...state, totalBill: action.totalBill};
  case 'SET_GUESTS':
    return {...state, guests: action.guests};
  case 'SET_RESTAURANT_NAME':
    return {...state, restaurantName: action.restaurantName};
  case 'SET_RESTAURANT_ADDRESS':
    return {...state, resturantAddress: action.resturantAddress};
  case 'SET_ACCOUNT_HOLDER_NAME':
    return {...state, accountHolderName: action.accountHolderName};
  case 'SET_ACCOUNT_TYPE':
    return {...state, accountType: action.accountType};
  case 'SET_ACCOUNT_ID':
    return {...state, accountId: action.accountId};
  default:
    return state;
  }
};

export const BiteShareContext = React.createContext({ state: biteShareState, dispatch: () => {} });