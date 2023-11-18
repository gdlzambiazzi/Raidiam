const elements = {
  divs: {
    author: '[class="author"]',
    articlePage: '[class="article-page"]',
    articleTitle: '.banner > .container > h1',
    articleDesc: '[class="row article-content"] > > > p'
  },
  buttons: {
  },
  text: {
    loadingArticles: 'Loading articles...'
  }
}

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

}