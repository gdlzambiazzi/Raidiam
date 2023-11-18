import { faker } from '@faker-js/faker';

const elements = {
  divs: {
    article: '[class="article-preview"]',
    author: '[class="author"]',
    articlePage: '[class="article-page"]',
    articleTitle: '.banner > .container > h1',
    articleDesc: '[class="row article-content"] > > > p',
    articleContent: '.article-content'
  },
  anchors: {
    newArticle: '[href="#/editor"]',
    navBar: '[class="navbar navbar-light"]',
    articlesNav: '[class="articles-toggle"]'
  },
  buttons: {
    publishArticleBtn: '[type="submit"]'
  },
  text: {
    loadingArticles: 'Loading articles...'
  },
  inputs: {
    title: '[placeholder="Article Title"]', //ideally, we should use a better selector here (in case the placeholder changes)
    summary: '[placeholder="What\'s this article about?"]',
    content: '[placeholder="Write your article (in markdown)"]',
    tags: '[placeholder="Enter tags"]'
  }
}

const articleTitle = faker.lorem.words()
export default class Article {

  static assertArticlePage() {
    cy.url().should('contain', '/articles/')
  }

  static assertArticleElements() {
    cy.get(elements.divs.articlePage).within(() => {
      cy.get(elements.divs.author).should('be.visible')
      cy.get(elements.divs.articleTitle).should('be.visible')
      cy.get(elements.divs.articleDesc).should('be.visible')
    })
  }

  static clickNewArticle() {
    cy.get(elements.anchors.newArticle).click()
  }

  static assertNewArticlePage() {
    cy.url().should('contain', '/editor')
    cy.get(elements.inputs.title).should('be.visible')
  }

  static fillArticleForm() {
    cy.fixture('articleData.json').then(article => {
      cy.get(elements.inputs.title).type(articleTitle) //random title from faker
      cy.get(elements.inputs.summary).type(article.summary)
      cy.get(elements.inputs.content).type(article.content)
      cy.get(elements.inputs.tags).type(article.tags)
    })
  }

  static clickPublishArticle() {
    cy.get(elements.buttons.publishArticleBtn).click()
  }

  static assertPublishedArticle() {
    const firstWord = articleTitle.split(' ')[0]
    cy.url().should('contain', `/${firstWord}`)
    cy.fixture('defaultUser.json').then(user => {
      cy.fixture('articleData.json').then(article => {
        cy.get(elements.divs.articlePage).within(() => {
          cy.get(elements.divs.author).should('contain', user.username)
          cy.get(elements.divs.articleTitle).should('contain', articleTitle)
          cy.get(elements.divs.articleContent).should('contain', article.content)
        })
      })
    })
  }

  static assertInArticlesSection() {
    cy.fixture('defaultUser.json').then(user => {
      cy.fixture('articleData.json').then(article => {
      cy.get(elements.anchors.navBar).contains(user.username).click() //clicks on profile
      cy.get(elements.divs.article).first().within(() => { //recently published article must be always on top of the list
        cy.contains(user.username)
        cy.contains(articleTitle)
        cy.contains(article.summary)
      })
    })
  })
  }

}