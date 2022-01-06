/* eslint-disable indent */
import React from 'react';

export const biteShareState = {
  isEveryoneReady: false,
  accountHolderReady: false,
  splitMethod: '',
  guests: [],
  restaurants: [], //restaurants displayed in ExplorePage
  restaurantsImages: [], //images for ExplorePage
  restaurantName: '',
  restaurantId: null, //updates when user clicks See Full Menu from ExplorePage
  restaurantMenus: [],
  accountHolderName: '',
  accountType: '', //'PENDING', 'HOST', 'GUEST', '' ('pending' is used in join tab while waiting to join a session)
  joinRequest: '',
  sessionId: '',
  orderedItems: [], //matching the name with TJ's code in Guest.js (will updated as needed after checking with TJ)
  email: '',
  authenticated: false,
  biteShareKey: 'ADD_KEY',
  nickname: null,
  openCamera: false,
};

const clearContextReducer = (state, action) => {
  if (action.type === 'SET_CLEAR_CONTEXT') {
    return { ...state, sessionId: '', joinRequest: '', restaurantId: '', restaurantName: '', accountType: '' };
  }
};

export const biteShareReducer = (state, action) => {

  switch (action.type) {
    case 'SET_ORDER_STATUS':
      return { ...state, isEveryoneReady: action.isEveryoneReady };
    case 'SET_ACCOUNT_HOLDER_READY':
      return { ...state, accountHolderReady: action.accountHolderReady };
    case 'SET_SPLIT_METHOD':
      return { ...state, splitMethod: action.splitMethod };
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
    case 'SET_JOIN_REQUEST':
      return { ...state, joinRequest: action.joinRequest };
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
    case 'SET_OPEN_CAMERA':
        return { ...state, openCamera: action.openCamera };
    case 'SET_CLEAR_CONTEXT':
        return clearContextReducer(state, action);
    default:
      return state;
  }
};

export const BiteShareContext = React.createContext({ state: biteShareState, dispatch: () => { } });