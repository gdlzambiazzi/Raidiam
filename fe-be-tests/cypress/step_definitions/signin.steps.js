import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps';
import Signin from '../pages/Signin';
import Signup from '../pages/Signup';
import HomePage from '../pages/HomePage';
import { faker } from '@faker-js/faker';

const user = {
  username: faker.internet.userName(),
  email: faker.internet.email(),
  password: faker.internet.password()
};

And('I have previously signed up', () => {
  Signup.signupAPI(user.username, user.email, user.password);
})

And('I click on Sign in link', () => {
  Signin.clickSigninLink();
})

And('I\'m redirected to the login page', () => {
  Signin.assertSigninPage();
})

And('fill in the sign in credentials with email and password', () => {
  Signin.fillSigninForm(user.email, user.password);
})

When('I click on sign in button', () => {
  Signin.clickSigninBtn();
})

Then('I\'m redirected to the home page', () => {
  HomePage.articlesLoaded();
})

And('my user is successfully signed in', () => {
  Signin.assertSignedIn(user.username);
})