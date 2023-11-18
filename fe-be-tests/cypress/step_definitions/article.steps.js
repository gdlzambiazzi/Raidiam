import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps';
import Article from '../pages/Article';

Then('I am redirected to the article page', () => {
  Article.assertArticlePage();
})

And('the article contains an author, a title and a description', () => {
  Article.assertArticleElements();
})