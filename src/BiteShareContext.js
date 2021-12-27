import React from 'react';

export const biteShareState = {
  isEveryoneReady: false,
  splitMethod: '',
  totalBill: 0,
  guests: [],
  restaurantName: 'BRAZILIAN RESTAURANT BREWING',
  accountHolderName: 'Susan',
  accountType: 'HOST',
  sessionId: 1234
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
  case 'SET_ACCOUNT_HOLDER_NAME':
    return {...state, accountHolderName: action.accountHolderName};
  case 'SET_ACCOUNT_TYPE':
    return {...state, accountType: action.accountType};
  case 'SET_SESSION_ID':
    return {...state, sessionId: action.sessionId};
  default:
    return state;
  }
};

export const BiteShareContext = React.createContext({ state: biteShareState, dispatch: () => {} });