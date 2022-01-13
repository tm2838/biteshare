import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import SplitBillOptions from '../../../src/features/CurrentSessionView/currentSessionSummary/SplitBillOptions';
import { BiteShareContext, biteShareState } from '../../../src/BiteShareContext.js';
import { colors } from '../../../src/infrastructure/colors.js';
import * as DBHelpers from '../../../firebase/helpers/database.firebase.js';
import { useNavigation } from '@react-navigation/native';

jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  __esModule: true,
  useNavigation: () => {},
}));

describe('<SplitBillOptions>', () => {

  beforeEach(() => {
    jest.spyOn(DBHelpers, 'updateADocument');
    DBHelpers.updateADocument = jest.fn(() => Promise.resolve());
  });

  it('should render two buttons', () => {
    const mockContext = {
      dispatch: jest.fn(),
      state: {
        ...biteShareState,
        isEveryoneReady: false,
      }
    };
    const { getByText } = render(<BiteShareContext.Provider value={mockContext}><SplitBillOptions changeTab={() => {}}/></BiteShareContext.Provider>);
    const optionEvenly = getByText('Evenly');
    const optionByItem = getByText('By Item');

    expect(optionEvenly).toBeTruthy();
    expect(optionByItem).toBeTruthy();
  });

  it('should display the disabled style when not everyone is ready', () => {
    const mockContext = {
      dispatch: jest.fn(),
      state: {
        ...biteShareState,
        isEveryoneReady: false,
      }
    };
    const { getAllByTestId } = render(<BiteShareContext.Provider value={mockContext}><SplitBillOptions changeTab={() => {}}/></BiteShareContext.Provider>);
    const button = getAllByTestId('biteshare-button')[0];
    expect(button.props.style).toMatchObject({});
  });

  it('should display the enabled style when not everyone is ready', () => {
    const mockContext = {
      dispatch: jest.fn(),
      state: {
        ...biteShareState,
        isEveryoneReady: true,
      }
    };
    const { getAllByTestId } = render(<BiteShareContext.Provider value={mockContext}><SplitBillOptions changeTab={() => {}}/></BiteShareContext.Provider>);
    const button = getAllByTestId('biteshare-button')[0];
    expect(button.props.style).toMatchObject({backgroundColor: colors.brand.ebisuLight});
  });

  it('should update the DB with the "split by item" method', () => {
    const mockContext = {
      dispatch: jest.fn(),
      state: {
        ...biteShareState,
        isEveryoneReady: true,
      }
    };
    const { getAllByTestId } = render(<BiteShareContext.Provider value={mockContext}><SplitBillOptions changeTab={() => {}}/></BiteShareContext.Provider>);
    const button = getAllByTestId('biteshare-button')[1];
    fireEvent.press(button);
    expect(DBHelpers.updateADocument).toHaveBeenCalledTimes(1);
    expect(DBHelpers.updateADocument).toHaveBeenCalledWith('transactions', '', {splitMethod: 'By item'});
  });

  it('should update the DB with the "split evenly" method', () => {
    const mockContext = {
      dispatch: jest.fn(),
      state: {
        ...biteShareState,
        isEveryoneReady: true,
      }
    };
    const { getAllByTestId } = render(<BiteShareContext.Provider value={mockContext}><SplitBillOptions changeTab={() => {}}/></BiteShareContext.Provider>);
    const button = getAllByTestId('biteshare-button')[0];
    fireEvent.press(button);
    expect(DBHelpers.updateADocument).toHaveBeenCalledTimes(1);
    expect(DBHelpers.updateADocument).toHaveBeenCalledWith('transactions', '', {splitMethod: 'Evenly'});

  });

});