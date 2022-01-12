import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import '@testing-library/jest-native/extend-expect';
import BigButton from '../../src/components/BigButton';
import BackButton from '../../src/components/BackButton';
import BiteshareButton from '../../src/components/BiteshareButton';
const TestRenderer = require('react-test-renderer');
import { useNavigation } from '@react-navigation/native';

jest.mock('@react-navigation/native');

describe ('<BigButton>', () => {
  const mockCallback = jest.fn();
  const props = {
    title: 'BiteShare button',
    handleLogin: () => mockCallback()
  };

  it('should have a title', () => {
    const { getByText } = render(<BigButton {...props} />);
    const button = getByText('BiteShare button');
    expect(button).not.toBe(null);
  });

  it ('should have one children', () => {
    const bigButton = TestRenderer.create(<BigButton {...props} />).toJSON();
    expect(bigButton?.children?.length).toBe(1);
  });

  it('should click the button', () => {
    const { getByText } = render(<BigButton {...props} />);
    const button = getByText('BiteShare button');
    fireEvent.press(button);
    expect(mockCallback).toHaveBeenCalledTimes(1);

  });
});

describe('<BackButton>', () => {
  useNavigation.mockResolvedValue(12);
  const props = {
    screenName: 'Home'
  };
  it('should have one children', () => {
    const backButton = TestRenderer.create(<BackButton {...props} />).toJSON();
    expect(backButton?.children?.length).toBe(1);
  });
});

describe('<BiteshareButton>', () => {
  it("should render without crashing", () => {
    const { getByText } = render(<BiteshareButton title='Hi button' />);
    const buttonText = getByText('Hi button');
    expect(buttonText).toBeTruthy();
  })

  it("should render with the default style", () => {
    const { getByText } = render(<BiteshareButton title='Hi button' />);
    const buttonText = getByText('Hi button');
    expect(buttonText.props.style).toMatchObject([{"color": "#000", "fontSize": 20}, {}]);
  })

  it("should render with the given style", () => {
    const { getByText } = render(<BiteshareButton title='Hi button' size={150} textStyle={{ color: 'red' }}/>);
    const buttonText = getByText('Hi button');
    expect(buttonText.props.style).toMatchObject([{"color": "#000", "fontSize": 30}, {"color": "red"}]);
  })

  it('should be not be disabled by default', () => {
    const { getByTestId } = render(<BiteshareButton title='Hi button' />);
    const button = getByTestId('biteshare-button');
    expect(button).toBeEnabled();
  })

  it('should be not be disabled if given the argument', () => {
    const { getByTestId } = render(<BiteshareButton title='Hi button' disabled={true}/>);
    const button = getByTestId('biteshare-button');
    expect(button).toBeDisabled();
  })

  it('should be accept a press event handler', () => {
    const pressHandler = jest.fn();
    const { getByTestId } = render(<BiteshareButton title='Hi button' onPress={pressHandler}/>);
    const button = getByTestId('biteshare-button');
    fireEvent.press(button);
    expect(pressHandler).toHaveBeenCalledTimes(1);
  })

});
