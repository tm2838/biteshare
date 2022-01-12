import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import CurrentSessionBills from '../../../src/features/CurrentSessionView/currentSessionBills/CurrentSessionBills.Screen.js';
import { BiteShareContext, biteShareState } from '../../../src/BiteShareContext.js';
import { useNavigation } from '@react-navigation/native';

// jest.mock('@react-navigation/native', () => ({
//   ...jest.requireActual('@react-navigation/native'),
//   __esModule: true,
//   useNavigation: () => { },
// }));

jest.mock('@react-navigation/native');

describe('<CurrentSessionBills/>', () => {

  it('should render ordered items', () => {
    const mockContext = {
      dispatch: jest.fn(),
      state: {
        ...biteShareState,
        orderedItems: [{ name: 'Large Pizza', price: 13.59, description: 'thin crust pizza with toppings' }],
      }
    };

    const { getByText } = render(<BiteShareContext.Provider value={mockContext}><CurrentSessionBills /></BiteShareContext.Provider>);
    const orderedItem = getByText('Large Pizza');

    expect(orderedItem).toBeTruthy();
  });

  it('should render payment button', () => {
    const { getByText } = render(<CurrentSessionBills />);

    const paymentButton = getByText('MAKE PAYMENT');
    expect(paymentButton).not.toBe(null);
  });

  // it('should press the make payment button', () => {
  //   const mockContext = {
  //     dispatch: jest.fn(),
  //     state: {
  //       ...biteShareState,
  //       userId: 'x0h6HmawBVYC94YcVo5f',
  //       sessionId: '1xCJGGqKUkmzmR3D7J3j'
  //     }
  //   };

  //   const mockCallback = jest.fn();
  //   const props = {
  //     handleEndSession: () => mockCallback()
  //   };

  //   const { getByText } = render(<BiteShareContext.Provider value={mockContext}><CurrentSessionBills /></BiteShareContext.Provider>);
  //   const paymentButton = getByText('MAKE PAYMENT');
  //   fireEvent.press(paymentButton);
  //   expect(mockCallback).toHaveBeenCalledTimes(1);
  // });
});