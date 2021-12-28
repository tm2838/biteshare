/* eslint-disable indent */
import React from 'react';

export const biteShareState = {
  isEveryoneReady: false,
  splitMethod: '',
  totalBill: 0,
  guests: [],
  restaurants: [], //restaurants displayed in ExplorePage
  restaurantName: 'BRAZILIAN RESTAURANT BREWING',
  restaurantId: null, //updates when user clicks See Full Menu from ExplorePage
  restaurantMenus: [],
  accountHolderName: 'Susan',
  accountType: 'HOST',
  sessionId: 1234,
};

export const biteShareReducer = (state, action) => {
  switch (action.type) {
    case 'SET_ORDER_STATUS':
      return { ...state, isEveryoneReady: action.isEveryoneReady };
    case 'SET_SPLIT_METHOD':
      return { ...state, splitMethod: action.splitMethod };
    case 'SET_TOTAL_BILL':
      return { ...state, totalBill: action.totalBill };
    case 'SET_GUESTS':
      return { ...state, guests: action.guests };
    case 'SET_RESTAURANTS':
      return { ...state, restaurants: action.restaurants };
    case 'SET_RESTAURANT_NAME':
      return { ...state, restaurantName: action.restaurantName };
    case 'SET_RESTAURANT_ID':
      return { ...state, restaurantId: action.restaurantId };
    case 'SET_RESTAURANT_MENU':
      return { ...state, restaurantMenus: action.restaurantMenus };
    case 'SET_ACCOUNT_HOLDER_NAME':
      return { ...state, accountHolderName: action.accountHolderName };
    case 'SET_ACCOUNT_TYPE':
      return { ...state, accountType: action.accountType };
    case 'SET_SESSION_ID':
      return { ...state, sessionId: action.sessionId };
    default:
      return state;
  }
};

export const BiteShareContext = React.createContext({ state: biteShareState, dispatch: () => { } });