import React from 'react';

export const biteShareState = {
  testState: 'This is a test state',
};

export const biteShareReducer = (state, action) => {
  switch (action.type) {
  case 'SET_TESTSTATE':
    return {...state, testState: action.testState }; // dispatch({ type: 'SET_TESTSTATE', testState: 'This is test No.2' })
  default:
    return state;
  }
};

export const BiteShareContext = React.createContext({ state: biteShareState, dispatch: () => {} });