import React from 'react';
import { render, fireEvent, waitFor, cleanup } from '@testing-library/react-native';
import { useNavigation } from '@react-navigation/native';
const TestRenderer = require('react-test-renderer');

import SignupScreen from '../../src/features/SignupView/Signup.Screen.js';
import * as authMethods from '../../firebase/helpers/authentication.firebase';
import * as DBHelpers from '../../firebase/helpers/database.firebase.js';

jest.mock('@react-navigation/native');

authMethods.signUpNewUser = jest.fn((email, password) => {
  if (email && password) {
    return Promise.resolve('success')
  } else
    return Promise.reject({ message: 'failed' })
})

authMethods.updateProfile = jest.fn(() => {
  return Promise.resolve('success')
})

DBHelpers.addANewAnonymousDocument = jest.fn(() => {
  return Promise.resolve('success')
})

DBHelpers.getADocReferenceFromCollection = jest.fn()
  .mockImplementation(() => Promise.resolve([
    { data: () => ({ userId: 'testid' }), id: 'testid2' }
  ]))

const props = {
  title: 'Login',
  handleLogin: () => mockCallback()
}


describe('Signup Screen', () => {
  afterEach(cleanup);

  it('should have inputField', () => {
    const { getByText } = render(<SignupScreen />);
    const email = getByText('CREATE ACCOUNT');
    expect(email).toBeTruthy();
  })

  it('should perform a signup and login when someone creates a new user', async () => {
    const { findByTestId, findAllByTestId, getByText, debug } = render(<SignupScreen />);
    const signupButton = getByText('CREATE ACCOUNT');
    const signupInput = await findAllByTestId('emailInput1');
    fireEvent.changeText(signupInput[0], 'dur bur')
    fireEvent.changeText(signupInput[1], 'dur@dur.com')
    fireEvent.changeText(signupInput[2], 'biteshare')
    fireEvent.changeText(signupInput[3], 'biteshare')
    fireEvent.press(signupButton)
    expect(authMethods.signUpNewUser).toHaveBeenCalledWith('dur@dur.com', 'biteshare');
  })

});
