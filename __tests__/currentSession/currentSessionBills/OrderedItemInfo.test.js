import React from 'react';
import { render } from '@testing-library/react-native';
import OrderedItemInfo from '../../../src/features/CurrentSessionView/currentSessionBills/OrderedItemInfo.js';
import { BiteShareContext, biteShareState } from '../../../src/BiteShareContext.js';
import { useNavigation } from '@react-navigation/native';


jest.mock('@react-navigation/native');

describe('<OrderedItemInfo/>', () => {

  it('should render name, price, and description of ordered item', () => {
    const mockContext = {
      dispatch: jest.fn(),
      state: {
        ...biteShareState,
        orderedItems: [{ name: 'Large Pizza', price: '13.59', description: 'thin crust pizza with toppings' }],
      }
    };

    const { getByText } = render(<BiteShareContext.Provider value={mockContext}><OrderedItemInfo orderedItem={mockContext.state.orderedItems[0]} /></BiteShareContext.Provider>);
    const name = getByText('Large Pizza');
    const price = getByText('$13.59');
    const description = getByText('thin crust pizza with toppings');

    expect(name).toBeTruthy();
    expect(price).toBeTruthy();
    expect(description).toBeTruthy();
  });
});