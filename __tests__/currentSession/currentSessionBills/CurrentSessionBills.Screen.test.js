import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import CurrentSessionBills from '../../../src/features/CurrentSessionView/currentSessionBills/CurrentSessionBills.Screen.js';
import { BiteShareContext, biteShareState } from '../../../src/BiteShareContext.js';
import * as DBHelpers from '../../../firebase/helpers/database.firebase.js';
import { useNavigation } from '@react-navigation/native';

jest.mock('@react-navigation/native');

describe('<CurrentSessionBills/>', () => {
  beforeEach(() => {
    jest.spyOn(DBHelpers, 'getADocReferenceFromCollection');

    DBHelpers.getADocReferenceFromCollection = jest.fn()
      .mockImplementationOnce(() => Promise.resolve([
        { data: () => ({ userId: 'testid' }), id: 'testid2' }
      ]))
      .mockImplementationOnce(() => Promise.resolve([
        { id: 'testid2' }
      ]));

    jest.spyOn(DBHelpers, 'readDocSnapshotListener');
    DBHelpers.readDocSnapshotListener = jest.fn(() => Promise.resolve());
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render multiple ordered items', () => {
    const mockContext = {
      dispatch: jest.fn(),
      state: {
        ...biteShareState,
        orderedItems: [
          { name: 'Large Pizza', price: '13.59', description: 'thin crust pizza with toppings' },
          { name: 'Salad', price: '13.59', description: 'greek salad' }],
      }
    };

    const { getByText } = render(<BiteShareContext.Provider value={mockContext}><CurrentSessionBills /></BiteShareContext.Provider>);
    const item1 = getByText('Large Pizza');
    const item2 = getByText('Salad');

    expect(item1).toBeTruthy();
    expect(item2).toBeTruthy();
  });

  it('should not get total and individual bill if there is no session id', () => {
    const mockContext = {
      dispatch: jest.fn(),
      state: {
        ...biteShareState,
        sessionId: null,
      }
    };

    const { getByText } = render(<BiteShareContext.Provider value={mockContext}><CurrentSessionBills /></BiteShareContext.Provider>);

    expect(DBHelpers.getADocReferenceFromCollection).toHaveBeenCalledTimes(0);
    expect(DBHelpers.readDocSnapshotListener).toHaveBeenCalledTimes(0);
  });

  it('should get total and individual bill if there is a session id', () => {
    const mockContext = {
      dispatch: jest.fn(),
      state: {
        ...biteShareState,
        sessionId: 'test-session',
        accountHolderName: 'Greg'
      }
    };

    const { getByText } = render(<BiteShareContext.Provider value={mockContext}><CurrentSessionBills /></BiteShareContext.Provider>);

    expect(DBHelpers.getADocReferenceFromCollection).toHaveBeenCalledTimes(1);
    expect(DBHelpers.getADocReferenceFromCollection).toHaveBeenCalledWith('transactions/test-session/attendees', 'name', '==', 'Greg');

    expect(DBHelpers.readDocSnapshotListener).toHaveBeenCalledTimes(1);
  });

  it('should render payment button', () => {
    const { getByText } = render(<CurrentSessionBills />);

    const paymentButton = getByText('MAKE PAYMENT');
    expect(paymentButton).toBeTruthy();
  });

  it('should press the make payment button and call DB functions', () => {
    const mockContext = {
      dispatch: jest.fn(),
      state: {
        ...biteShareState,
        sessionId: 'test-session',
        userId: 'test-user'
      }
    };

    const { getByText } = render(<BiteShareContext.Provider value={mockContext}><CurrentSessionBills /></BiteShareContext.Provider>);
    const paymentButton = getByText('MAKE PAYMENT');
    fireEvent.press(paymentButton);
    expect(DBHelpers.getADocReferenceFromCollection).toHaveBeenCalledTimes(2);
    expect(DBHelpers.getADocReferenceFromCollection).toHaveBeenCalledWith('users/test-user/transactions', 'sessionId', '==', 'test-session');
  });
});