import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import Guest from '../../../src/features/CurrentSessionView/currentSessionSummary/Guest';
import mockGuests from '../../../fixtures/mockGuests.json';
import { BiteShareContext, biteShareState } from '../../../src/BiteShareContext.js';
import { colors } from '../../../src/infrastructure/colors.js';
import * as DBHelpers from '../../../firebase/helpers/database.firebase.js';

describe('<Guest>', () => {
  beforeEach(() => {
    jest.spyOn(DBHelpers, 'getADocReferenceFromCollection');

    DBHelpers.getADocReferenceFromCollection = jest.fn()
      .mockImplementationOnce(() => Promise.resolve([
        { data: () => ({userId: 'testid'}), id: 'testid2'}
      ]))
      .mockImplementationOnce(() => Promise.resolve([
        { id: 'testid2'}
      ]));

    jest.spyOn(DBHelpers, 'updateADocument');
    DBHelpers.updateADocument = jest.fn(() => Promise.resolve());

    jest.spyOn(DBHelpers, 'readASingleDocument');
    DBHelpers.readASingleDocument = jest.fn(() => Promise.resolve(
      { data: () => ({userId: 'testid', totalBills: 100}), id: 'testid2'}
    ));

    jest.spyOn(DBHelpers, 'deleteADocument');
    DBHelpers.deleteADocument = jest.fn(() => Promise.resolve());
  })

  afterEach(() => {
    jest.clearAllMocks();
  })

  it("should display 'You' for the accountHolder", () => {
    const mockContext = {
      dispatch: jest.fn(),
      state: {
        ...biteShareState,
        guests: mockGuests,
        accountHolderName: 'Susan',
      }
    }
    const { getByText } = render(<BiteShareContext.Provider value={mockContext}><Guest guest={mockGuests[0]} /></BiteShareContext.Provider>);
    const Susan = getByText('You');

    expect(Susan).toBeTruthy();
  })

  it("should display the user name for other attendees", () => {
    const mockContext = {
      dispatch: jest.fn(),
      state: {
        ...biteShareState,
        guests: mockGuests,
        accountHolderName: 'Susan',
      }
    }
    const { getByText } = render(<BiteShareContext.Provider value={mockContext}><Guest guest={mockGuests[1]} /></BiteShareContext.Provider>);
    const Greg = getByText('Greg');

    expect(Greg).toBeTruthy();
  })

  // GUEST view

  it("should display a status indicator for the accountHolder in guest view", () => {
    const mockContext = {
      dispatch: jest.fn(),
      state: {
        ...biteShareState,
        guests: mockGuests,
        accountHolderName: 'Susan',
        accountType: 'GUEST'
      }
    }
    const { getByText } = render(<BiteShareContext.Provider value={mockContext}><Guest guest={mockGuests[0]} /></BiteShareContext.Provider>);
    const indicator = getByText('Not Ready');

    expect(indicator).toBeTruthy();
  })

  it("should not display a status indicator for other attendees in guest view", () => {
    const mockContext = {
      dispatch: jest.fn(),
      state: {
        ...biteShareState,
        guests: mockGuests,
        accountHolderName: 'Susan',
        accountType: 'GUEST'
      }
    }
    const { queryByText } = render(<BiteShareContext.Provider value={mockContext}><Guest guest={mockGuests[1]} /></BiteShareContext.Provider>);
    const indicator = queryByText('Ready');

    expect(indicator).toBeFalsy();
  })

  it("should not display the 'allow'/'deny' buttons for other attendees in guest view", () => {
    const mockContext = {
      dispatch: jest.fn(),
      state: {
        ...biteShareState,
        guests: mockGuests,
        accountHolderName: 'Susan',
        accountType: 'GUEST'
      }
    }
    const { queryByText } = render(<BiteShareContext.Provider value={mockContext}><Guest guest={mockGuests[3]} /></BiteShareContext.Provider>);
    const access = queryByText('Allow');

    expect(access).toBeFalsy();
  })

  // HOST view

  it("should display a status indicator for everyone in host view", () => {
    const mockContext = {
      dispatch: jest.fn(),
      state: {
        ...biteShareState,
        guests: mockGuests,
        accountHolderName: 'Susan',
        accountType: 'HOST'
      }
    }
    const { getByText } = render(<BiteShareContext.Provider value={mockContext}><Guest guest={mockGuests[1]} /></BiteShareContext.Provider>);
    const indicator = getByText('Ready');

    expect(indicator).toBeTruthy();
  })

  it("should display the 'allow'/'deny' buttons for other attendees in host view", () => {
    const mockContext = {
      dispatch: jest.fn(),
      state: {
        ...biteShareState,
        guests: mockGuests,
        accountHolderName: 'Susan',
        accountType: 'HOST'
      }
    }
    const { getByText } = render(<BiteShareContext.Provider value={mockContext}><Guest guest={mockGuests[3]} /></BiteShareContext.Provider>);
    const access = getByText('Allow');

    expect(access).toBeTruthy();
  })

  it("should display the 'allow'/'deny' buttons for other attendees in host view", () => {
    const mockContext = {
      dispatch: jest.fn(),
      state: {
        ...biteShareState,
        guests: mockGuests,
        accountHolderName: 'Susan',
        accountType: 'HOST'
      }
    }
    const { getByText } = render(<BiteShareContext.Provider value={mockContext}><Guest guest={mockGuests[3]} /></BiteShareContext.Provider>);
    const access = getByText('Allow');

    expect(access).toBeTruthy();
  })

  it("should be able to allow a guest into the session as a host", async () => {
    const mockContext = {
      dispatch: jest.fn(),
      state: {
        ...biteShareState,
        guests: mockGuests,
        accountHolderName: 'Susan',
        accountType: 'HOST',
        sessionId: 'test-session-id'
      }
    }
    const { getByText } = render(<BiteShareContext.Provider value={mockContext}><Guest guest={mockGuests[3]} /></BiteShareContext.Provider>);
    const access = getByText('Allow');
    await fireEvent.press(access);

    expect(DBHelpers.getADocReferenceFromCollection).toHaveBeenCalledTimes(1);
    expect(DBHelpers.getADocReferenceFromCollection).toHaveBeenCalledWith('transactions/test-session-id/attendees', 'name', '==', 'Alex');

    expect(DBHelpers.updateADocument).toHaveBeenCalledTimes(1);
    expect(DBHelpers.updateADocument).toHaveBeenCalledWith('transactions/test-session-id/attendees', 'testid2', {
      orderStatus: 'not ready',
      joinRequest: 'allowed',
    });
  })

  it("should be able to deny a guest from the session as a host", async () => {
    const mockContext = {
      dispatch: jest.fn(),
      state: {
        ...biteShareState,
        guests: mockGuests,
        accountHolderName: 'Susan',
        accountType: 'HOST',
        sessionId: 'test-session-id'
      }
    }
    const { getByText } = render(<BiteShareContext.Provider value={mockContext}><Guest guest={mockGuests[3]} /></BiteShareContext.Provider>);
    const access = getByText('Deny');
    await fireEvent.press(access);

    expect(DBHelpers.getADocReferenceFromCollection).toHaveBeenCalledTimes(1);
    expect(DBHelpers.getADocReferenceFromCollection).toHaveBeenCalledWith('transactions/test-session-id/attendees', 'name', '==', 'Alex');

    expect(DBHelpers.updateADocument).toHaveBeenCalledTimes(1);
    expect(DBHelpers.updateADocument).toHaveBeenCalledWith('transactions/test-session-id/attendees', 'testid2', {
      joinRequest: 'denied',
      individualBills: 0,
    });

    // expect(DBHelpers.readASingleDocument).toHaveBeenCalledTimes(1);
  })
});