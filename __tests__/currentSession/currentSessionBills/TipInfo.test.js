import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import CurrentSessionBills from '../../../src/features/CurrentSessionView/currentSessionBills/CurrentSessionBills.Screen.js';
import TipInfo from '../../../src/features/CurrentSessionView/currentSessionBills/TipInfo.js';
import { BiteShareContext, biteShareState } from '../../../src/BiteShareContext.js';
import { useNavigation } from '@react-navigation/native';

jest.mock('@react-navigation/native');

describe('<TipInfo/>', () => {

  it('should calculate the correct tip', () => {
    const mockContext = {
      dispatch: jest.fn(),
      state: {
        ...biteShareState,
      }
    };

    const { getByText } = render(<BiteShareContext.Provider value={mockContext}><TipInfo individualBill={20} tipPercentage={0.1} /></BiteShareContext.Provider>);

    const tip = getByText('Add 10% tip: $2.00');
    expect(tip).toBeTruthy();
  });

  it('should call setSelected when pressed', () => {
    const mockContext = {
      dispatch: jest.fn(),
      state: {
        ...biteShareState,
      }
    };

    const mockCallback = jest.fn();
    const props = {
      setSelected: () => mockCallback()
    };

    const { getByText } = render(<BiteShareContext.Provider value={mockContext}><TipInfo individualBill={20} tipPercentage={0.1} index={0} selected={null} setSelected={props.setSelected} /></BiteShareContext.Provider>);

    const tip = getByText('Add 10% tip: $2.00');
    fireEvent.press(tip);
    expect(mockCallback).toHaveBeenCalledTimes(1);
  });

});