const elements = {
  divs: {
    authPage: '[class="auth-page"]'
  },
  buttons: {
    signinBtn: 'button'
  },
  text: {
    loadingArticles: 'Loading articles...'
  },
  anchors: {
    signin: '[href="#/login"]',
    navBar: '[class="navbar navbar-light"]'
  },
  inputs: {
    email: '[placeholder="Email"]',
    password: '[placeholder="Password"]'
  }
}

export default class Signin {

  static clickSigninLink() {
    cy.get(elements.anchors.signin).click()
  }

  static assertSigninPage() {
    cy.get(elements.divs.authPage).should('contain','Sign in')
    cy.url().should('contain', '/login')
  }

  static fillSigninForm(email, password) {
    cy.get(elements.inputs.email).type(email)
    cy.get(elements.inputs.password).type(password)
  }

  static clickSigninBtn() {
    cy.get(elements.buttons.signinBtn).click()
  }

  static assertSignedIn(username) {
    cy.get(elements.anchors.navBar).contains(username)
  }

}