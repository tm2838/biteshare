import React from 'react';
import { render, fireEvent, waitFor, cleanup, waitForElementToBeRemoved } from '@testing-library/react-native';
import { useNavigation } from '@react-navigation/native';
const TestRenderer = require('react-test-renderer');

import LoginScreen from '../../src/features/LoginView/Login.Screen.js';
import InputField from '../../src/components/InputField';

jest.mock('@react-navigation/native');

const getNestedElements = (arr, flatResult = []) => {
  for (let i = 0; i < arr.length; i++) {
    let child = arr[i];
    flatResult.push(child)
    if (child.children != null) {
      // console.log('WTF------', flatResult)
      getNestedElements(child.children, flatResult)
    }
    return flatResult;
  }
}

describe('Login Screen', () => {
  afterEach(cleanup);

  const mockCallback = jest.fn();
  const props = {
    title: 'Login',
  }

  it('should have Login button', () => {
    const { getAllByText } = render(<LoginScreen {...props} />);
    const loginButton = getAllByText('LOGIN');
    expect(loginButton).toBeTruthy();
  });

  it('should render error message for invalid user', async () => {
    const { getByText, findByTestId } = render(<LoginScreen {...props} />);
    const loginButton = getByText('LOGIN');
    fireEvent.press(loginButton);
    const loginError = await findByTestId('loginButton')
    expect(loginError).toBeTruthy();
  });

  it('has an image logo as 3rd child', async () => {
    const loginTest = TestRenderer.create(<LoginScreen {...props} />).toJSON();
    const image = loginTest.children[0].children[0].children[0];
    expect(image.type).toBe('Image')
  });

  it('should log someone in with valid login credentials', async () => {
    const { getByTestId, findAllByTestId, getByText } = render(<LoginScreen onPress={mockCallback} />);
    const loginInput = await findAllByTestId('emailInput1');
    const loginButton = getByText('LOGIN');
    // console.log('array of items', loginInput);
    fireEvent.changeText(loginInput[0], 'car@car.com')
    fireEvent.changeText(loginInput[1], 'biteshare')
    await waitFor(() => fireEvent.press(loginButton));
    expect(mockCallback).toHaveBeenCalled();
  })

});
