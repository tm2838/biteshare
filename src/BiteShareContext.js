/* eslint-disable indent */
import React from 'react';

export const biteShareState = {
  isEveryoneReady: false,
  splitMethod: '',
  totalBill: 0,
  guests: [],
  restaurants: [], //restaurants displayed in ExplorePage
  restaurantsImages: [], //images for ExplorePage
  restaurantName: '',
  restaurantId: null, //updates when user clicks See Full Menu from ExplorePage
  restaurantMenus: [],
  accountHolderName: '',
  accountType: '',
  sessionId: '',
  orderedItems: [], //matching the name with TJ's code in Guest.js (will updated as needed after checking with TJ)
  email: '',
  authenticated: false,
  biteShareKey: '16bcb6bcff21e2fbcbad3fd5c5ca4605',
  nickname: null,
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
    case 'SET_RESTAURANTS_IMAGES':
      return { ...state, restaurantsImages: action.restaurantsImages };
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
    case 'SET_ORDERED_ITEMS':
      return { ...state, orderedItems: action.orderedItems };
    case 'SET_EMAIL':
      return { ...state, email: action.email };
    case 'SET_AUTH':
      return { ...state, authenticated: action.authenticated };
    case 'SET_NICKNAME':
      return { ...state, nickname: action.nickname };
    // case 'SET_USERID':
    //   return { ...state, userId: action.userId };
    default:
      return state;
  }
};

export const BiteShareContext = React.createContext({ state: biteShareState, dispatch: () => { } });