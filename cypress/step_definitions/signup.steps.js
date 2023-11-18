import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps';
import Signup from '../pages/Signup';
import HomePage from '../pages/HomePage'
import { faker } from '@faker-js/faker';

const user = {
  username: faker.internet.userName(),
  email: faker.internet.email(),
  password: faker.internet.password()
};

And('I click on Sign up link', () => {
  Signup.clickSignupLink();
})

And('I\'m redirected to the register page', () => {
  Signup.assertSignupPage();
})

And('fill in the sign up form with username, email and password', () => {
  Signup.fillSignupForm(user.username, user.email, user.password);
})

When('I click on the sign up button', () => {
  Signup.clickSignupBtn();
})

Then('I\'m redirected to the home page', () => {
  HomePage.articlesLoaded();
})

And('my user is successfully signed up', () => {
  Signup.assertSignedUp(user.username);
})