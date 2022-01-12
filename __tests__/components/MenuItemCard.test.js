import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import '@testing-library/jest-native/extend-expect';
import MenuItemCard from '../../src/components/MenuItemCard';
import mockParseMenu from '../../fixtures/mockParseMenu';
const TestRenderer = require('react-test-renderer');

describe('<MenuItemCard>', () => {
  it("should render without crashing", () => {
    const { getByText } = render(<MenuItemCard menuItems={mockParseMenu} />);
    const menuItemName = getByText('Organic Kale And Quinoa Salad');
    const menuItemDescription = getByText('local apples, black currants, marcona almonds, pecorino pepato');
    const menuItemPrice = getByText('$21');

    expect(menuItemName).toBeTruthy();
    expect(menuItemDescription).toBeTruthy();
    expect(menuItemPrice).toBeTruthy();
  })

  it("should render with the declared style", () => {
    const { getAllByTestId } = render(<MenuItemCard menuItems={mockParseMenu} />);
    const itemInfoContainer = getAllByTestId('menu-item-info')[0];
    expect(itemInfoContainer.props.style).toMatchObject({flexDirection: 'row', justifyContent: 'flex-start'});
  })
});