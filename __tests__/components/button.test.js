import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import BigButton from '../../src/components/BigButton';
import BackButton from '../../src/components/BackButton';
const TestRenderer = require('react-test-renderer');
import { useNavigation } from '@react-navigation/native';

jest.mock('@react-navigation/native');

describe ('<BigButton>', () => {
  const mockCallback = jest.fn();
  const props = {
    title: 'BiteShare button',
    handleLogin: () => mockCallback()
  }

  it('should have a title', () => {
    const { getByText } = render(<BigButton {...props} />);
    const button = getByText('BiteShare button');
    expect(button).not.toBe(null);
  })

  it ('should have one children', () => {
    const bigButton = TestRenderer.create(<BigButton {...props} />).toJSON();
    expect(bigButton?.children?.length).toBe(1);
  })

  it('should click the button', () => {
    const { getByText } = render(<BigButton {...props} />);
    const button = getByText('BiteShare button');
    fireEvent.press(button);
    expect(mockCallback).toHaveBeenCalledTimes(1);

  })
})

describe('<BackButton>', () => {
  useNavigation.mockResolvedValue(12);
  const props = {
    screenName: 'Home'
  }
  it('should have one children', () => {
    const backButton = TestRenderer.create(<BackButton {...props} />).toJSON();
    expect(backButton?.children?.length).toBe(1);
  })
})
