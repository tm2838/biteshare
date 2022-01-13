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
    const { findByTestId, findAllByTestId, findByRole, debug } = render(<SignupScreen />);
    const signupButton = await findByRole('TouchableOpacity');
    const signupInput = await findAllByTestId('emailInput1');
    fireEvent.changeText(signupInput[2], 'dur bur')
    fireEvent.changeText(signupInput[3], 'dur@dur.com')
    fireEvent.changeText(signupInput[4], 'biteshare')
    fireEvent.changeText(signupInput[5], 'biteshare')
    fireEvent.press(signupButton)
    expect(authMethods.signUpNewUser).toHaveBeenCalledWith('dur@dur.com', 'biteshare');
  })

});

// // describe('Login Screen', () => {

// //   it('should have Login button', () => {
// //     const { getAllByText } = render(<LoginScreen {...props} />);
// //     const loginButton = getAllByText('LOGIN');
// //     expect(loginButton).toBeTruthy();
// //   });

// //   it('should render error message for invalid user', async () => {
// //     const { getByText, findByTestId } = render(<LoginScreen {...props} />);
// //     const loginButton = getByText('LOGIN');
// //     fireEvent.press(loginButton);
// //     const loginError = await findByTestId('loginButton')
// //     expect(loginError).toBeTruthy();
// //   });

// //   it('has an image logo as 3rd child', async () => {
// //     const loginTest = TestRenderer.create(<LoginScreen {...props} />).toJSON();
// //     const image = loginTest.children[0].children[0].children[0];
// //     expect(image.type).toBe('Image')
// //   });

// //   it.only('should log someone in with valid login credentials', async () => {
// //     const { getByTestId, findByTestId } = render(<LoginScreen {...props} />);
// //     const loginInput = getByTestId('emailInput');
// //     console.log(loginInput);
// //     // fireEvent(loginInput, 'inputValue', 'Car@car.com')
// //   })
// // });
