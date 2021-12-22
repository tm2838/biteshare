import React from 'react';

export const biteShareState = {
  role: 'host',
};

export const biteShareReducer = (state, action) => {
  switch (action.type) {
  case 'SET_ROLE':
    return {...state, role: action.role}; // dispatch({ type: 'SET_ROLE', role: 'guest' })
  default:
    return state;
  }
};

export const BiteShareContext = React.createContext({ state: biteShareState, dispatch: () => {} });