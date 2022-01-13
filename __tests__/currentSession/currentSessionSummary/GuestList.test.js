import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import GuestList from '../../../src/features/CurrentSessionView/currentSessionSummary/GuestList';
import mockGuests from '../../../fixtures/mockGuests.json';
import { BiteShareContext, biteShareState } from '../../../src/BiteShareContext.js';
import { colors } from '../../../src/infrastructure/colors.js';
import * as DBHelpers from '../../../firebase/helpers/database.firebase.js';

describe('<GuestList>', () => {
  beforeEach(() => {
    jest.spyOn(DBHelpers, 'readCollectionSnapshotListener');
    DBHelpers.readCollectionSnapshotListener = jest.fn();
  });

  it('should render a list of guests whose joinRequest is "allowed"', () => {
    const mockContext = {
      dispatch: jest.fn(),
      state: {
        ...biteShareState,
        guests: mockGuests,
      }
    };
    const { getByText } = render(<BiteShareContext.Provider value={mockContext}><GuestList /></BiteShareContext.Provider>);
    const Susan = getByText('Susan');
    const Greg = getByText('Greg');

    expect(Susan).toBeTruthy();
    expect(Greg).toBeTruthy();
  });

  it('should reade the list of guests from the database', () => {
    const mockContext = {
      dispatch: jest.fn(),
      state: {
        ...biteShareState,
        sessionId: 'test'
      }
    };
    render(<BiteShareContext.Provider value={mockContext}><GuestList /></BiteShareContext.Provider>);

    expect(DBHelpers.readCollectionSnapshotListener).toHaveBeenCalledTimes(1);
  });

  it('should not render guests whose joinRequest is "denied"', () => {
    const mockContext = {
      dispatch: jest.fn(),
      state: {
        ...biteShareState,
        guests: mockGuests,
      }
    };
    const { queryByText } = render(<BiteShareContext.Provider value={mockContext}><GuestList /></BiteShareContext.Provider>);
    const Ava = queryByText('Ava');

    expect(Ava).toBeFalsy();
  });

  // it("should update the context with isEveryoneReady === true when every guest has placed an order", () => {
  //   const mockContext = {
  //     dispatch: jest.fn(),
  //     state: {
  //       ...biteShareState,
  //       guests: [mockGuests[0], mockGuests[1]],
  //     }
  //   }
  //   render(<BiteShareContext.Provider value={mockContext}><GuestList /></BiteShareContext.Provider>);
  //   console.log(mockContext.state.guests);
  //   mockContext.state.guests[0].orderStatus = 'ready';
  //   console.log(mockContext.state.guests);

  //   expect(mockContext.dispatch).toHaveBeenCalledTimes(1);
  // })
});