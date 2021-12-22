import React from 'react';

export const biteShareState = {
  role: 'host',
  isEveryoneReady: false,
  splitMethod: '',
  totalBill: 0,
  guests: [],
};

export const biteShareReducer = (state, action) => {
  switch (action.type) {
  case 'SET_ROLE':
    return {...state, role: action.role}; // dispatch({ type: 'SET_ROLE', role: 'guest' })
  case 'SET_ORDER_STATUS':
    return {...state, isEveryoneReady: action.isEveryoneReady};
  case 'SET_SPLIT_METHOD':
    return {...state, splitMethod: action.splitMethod};
  case 'SET_TOTAL_BILL':
    return {...state, totalBill: action.totalBill};
  case 'SET_GUESTS':
    return {...state, guests: action.guests};
  default:
    return state;
  }
};

export const BiteShareContext = React.createContext({ state: biteShareState, dispatch: () => {} });