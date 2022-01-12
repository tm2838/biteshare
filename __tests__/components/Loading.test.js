import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import '@testing-library/jest-native/extend-expect';
import Loading from '../../src/components/Loading';
const TestRenderer = require('react-test-renderer');

describe('<Loading>', () => {
  it("should render without crashing", () => {
    const { getByTestId } = render(<Loading />);
    const indicator = getByTestId('activity-indicator');

    expect(indicator).toBeTruthy();
  })

  it("should render with the default style", () => {
    const { getByTestId } = render(<Loading />);
    const indicator = getByTestId('activity-indicator');
    expect(indicator.props.style).toMatchObject({alignItems: 'center', justifyContent: 'center'});
  })

  it("should render the passed in message", () => {
    const { getByText } = render(<Loading primaryMessage='Loading' secondaryMessage='Please wait'/>);
    const primary = getByText('Loading');
    const secondary = getByText('Please wait');
    expect(primary).toBeTruthy();
    expect(secondary).toBeTruthy();
  })
});