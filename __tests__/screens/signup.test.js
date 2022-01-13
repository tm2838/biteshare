import React from 'react';
import { render, fireEvent, waitFor, cleanup } from '@testing-library/react-native';
import { useNavigation } from '@react-navigation/native';
const TestRenderer = require('react-test-renderer');

import SignupScreen from '../../src/features/SignupView/Signup.Screen.js';

jest.mock('@react-navigation/native');

const mockCallback = jest.fn();
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
