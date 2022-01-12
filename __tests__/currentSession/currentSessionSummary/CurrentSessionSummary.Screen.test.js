import React from 'react';
import { render } from '@testing-library/react-native';
import CurrentSessionSummary from '../../../src/features/CurrentSessionView/currentSessionSummary/CurrentSessionSummary.screen.js';
import { BiteShareContext, biteShareState } from '../../../src/BiteShareContext.js';
import { useNavigation } from '@react-navigation/native';

jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  __esModule: true,
  useNavigation: () => {},
}));

describe('<CurrentSessionSummary>', () => {

  it('should render without crashing', () => {
    const mockContext = {
      dispatch: jest.fn(),
      state: {
        ...biteShareState,
        guests: [{name: 'susan', joinRequest: 'allowed', orderStatus: 'not ready', orderedItems: [], userId: '12345'}],
      }
    };
    const { getByText } = render(<BiteShareContext.Provider value={mockContext}><CurrentSessionSummary /></BiteShareContext.Provider>);
    const screenTitle = getByText('Summary');
    const guest = getByText('susan');

    expect(screenTitle).toBeTruthy();
    expect(guest).toBeTruthy();
  });

  it('should display an overall status indicator for the host', () => {
    const mockContext = {
      dispatch: jest.fn(),
      state: {
        ...biteShareState,
        accountType: 'HOST',
        isEveryoneReady: false,
      }
    };
    const { getByText } = render(<BiteShareContext.Provider value={mockContext}><CurrentSessionSummary /></BiteShareContext.Provider>);
    const indicator = getByText('Still waiting...');
    expect(indicator).toBeTruthy();
  });

  it('should not display an overall status indicator for the guest', () => {
    const mockContext = {
      dispatch: jest.fn(),
      state: {
        ...biteShareState,
        accountType: 'GUEST',
        isEveryoneReady: false,
      }
    };
    const { queryByText } = render(<BiteShareContext.Provider value={mockContext}><CurrentSessionSummary /></BiteShareContext.Provider>);
    const indicator = queryByText('Still waiting...');
    expect(indicator).toBeFalsy();
  });

  it('should display the split bill options for the host', () => {
    const mockContext = {
      dispatch: jest.fn(),
      state: {
        ...biteShareState,
        accountType: 'HOST',
        isEveryoneReady: false,
      }
    };
    const { getByText } = render(<BiteShareContext.Provider value={mockContext}><CurrentSessionSummary /></BiteShareContext.Provider>);
    const splitBillText = getByText('How do you want to split the bill?');
    expect(splitBillText).toBeTruthy();
  });

  it('should not display the split bill options for the guest', () => {
    const mockContext = {
      dispatch: jest.fn(),
      state: {
        ...biteShareState,
        accountType: 'GUEST',
        isEveryoneReady: false,
      }
    };
    const { queryByText } = render(<BiteShareContext.Provider value={mockContext}><CurrentSessionSummary /></BiteShareContext.Provider>);
    const splitBillText = queryByText('How do you want to split the bill?');
    expect(splitBillText).toBeFalsy();
  });

  it('should update the status indicator for the host when everyone is ready', () => {
    const mockContext = {
      dispatch: jest.fn(),
      state: {
        ...biteShareState,
        accountType: 'HOST',
        isEveryoneReady: true,
      }
    };
    const { getByText } = render(<BiteShareContext.Provider value={mockContext}><CurrentSessionSummary /></BiteShareContext.Provider>);
    const indicator = getByText('Everyone is ready!');
    expect(indicator).toBeTruthy();
  });

});