import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps';
import HomePage from '../pages/HomePage';

Given('I access conduit home page', () => {
  HomePage.visitConduit();
})

When('all the articles are loaded', () => {
  HomePage.articlesLoaded();
})

Then('I can see a list of 10 articles', () => {
  HomePage.assertTenArticles();
})

And('each article displays an author, a title and a description', () => {
  HomePage.assertArticlesListElements();
})

When('I click on the first article', () => {
  HomePage.clickFirstArticle();
})
