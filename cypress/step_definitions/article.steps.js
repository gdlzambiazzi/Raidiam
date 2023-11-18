import { Before, Given, When, Then } from 'cypress-cucumber-preprocessor/steps';
import Article from '../pages/Article';

Before({ tags: '@clearSession' }, () => {
  cy.clearAllSessionStorage();
  Cypress.session.clearAllSavedSessions();
  Cypress.session.clearCurrentSessionData();
  cy.clearCookies();
})

Then('I am redirected to the article page', () => {
  Article.assertArticlePage();
})

And('the article contains an author, a title and a description', () => {
  Article.assertArticleElements();
})

And('I click on the New Article link', () => {
  Article.clickNewArticle();
})

And('I\'m redirected to the article editor page', () => {
  Article.assertNewArticlePage();
})

And('I fill in the article title, summary, content and tags', () => {
  Article.fillArticleForm();
})

When('I click on Publish Article button', () => {
  Article.clickPublishArticle();
})

Then('my article should be published', () => {
  Article.assertPublishedArticle();
})

And('I should see my article on My Articles section', () => {
  Article.assertInArticlesSection();
})