import React from 'react';
import { render, fireEvent, waitFor, cleanup, waitForElementToBeRemoved } from '@testing-library/react-native';
import { useNavigation } from '@react-navigation/native';
const TestRenderer = require('react-test-renderer');

import LoginScreen from '../../src/features/LoginView/Login.Screen.js';
import InputField from '../../src/components/InputField';
import * as authMethods from '../../firebase/helpers/authentication.firebase';
import * as DBHelpers from '../../firebase/helpers/database.firebase.js';

jest.mock('@react-navigation/native');
// jest.mock('../../firebase/helpers/authentication.firebase');

authMethods.loginUser = jest.fn((email, password) => {
  if (email && password) {
    return Promise.resolve('success')
  } else
    return Promise.reject({ message: 'failed' })
})

DBHelpers.getADocReferenceFromCollection = jest.fn()
  .mockImplementation(() => Promise.resolve([
    { data: () => ({ userId: 'testid' }), id: 'testid2' }
  ]))


describe('Login Screen', () => {
  afterEach(cleanup);

  // const mockCallback = jest.fn((email, password) => {
  //   return Promise.resolve({`The user ${email} with password ${password} has logged in`})
  // });
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
    const loginError = await findByTestId('loginError')
    expect(loginError).toBeTruthy();
  });

  it('has an image logo as 3rd child', () => {
    const loginTest = TestRenderer.create(<LoginScreen {...props} />).toJSON();
    const image = loginTest.children[0].children[0].children[0];
    expect(image.type).toBe('Image')
  });

  it('should log someone in with valid login credentials', async () => {
    const { getByTestId, findAllByTestId, getByText, debug } = render(<LoginScreen />);
    const loginInput = await findAllByTestId('emailInput1');
    const loginButton = getByText('LOGIN');
    fireEvent.changeText(loginInput[0], 'car@car.com')
    fireEvent.changeText(loginInput[1], 'biteshare')
    fireEvent.press(loginButton)
    expect(authMethods.loginUser).toHaveBeenCalledWith('car@car.com', 'biteshare');
  })

});
