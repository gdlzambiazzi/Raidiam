const elements = {
  divs: {
    home: '[class="home-page"]',
    articleList: '[class="home-global"]',
    article: '[class="article-preview"]',
    author: '[class="author"]',
    title: '.preview-link > h1',
    description: '.preview-link > p'
  },
  buttons: {
  },
  text: {
    loadingArticles: 'Loading articles...'
  }
}

const conduitURL = 'https://vue-vuex-realworld.netlify.app/#/';

export default class HomePage {
  static visitConduit() {
    cy.visit(conduitURL);
    cy.get(elements.divs.home).should('be.visible');
  }

  static articlesLoaded() {
    cy.get(elements.divs.articleList).should('be.visible');
    cy.get(elements.divs.article).should('have.length', 10);
    cy.contains(elements.text.loadingArticles).should('not.exist');
  }

  static assertTenArticles() {
    const expectedCount = 10;
    cy.get(elements.divs.articleList).get(elements.divs.article).should('have.length', expectedCount);
  }

  static assertArticlesListElements() {
    cy.get(elements.divs.article).first().within(() => {
      cy.get(elements.divs.author).should('be.visible');
      cy.get(elements.divs.title).should('be.visible');
      cy.get(elements.divs.description).should('be.visible');
    })
  }

  static clickFirstArticle() {
    cy.get(elements.divs.article).first().click();
  }

}