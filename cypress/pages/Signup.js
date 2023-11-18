import signupAPI from '../support/signupAPI';

const elements = {
  divs: {
    authPage: '[class="auth-page"]'
  },
  buttons: {
    signupBtn: 'button'
  },
  text: {
    loadingArticles: 'Loading articles...'
  },
  anchors: {
    signup: '[href="#/register"]',
    navBar: '[class="navbar navbar-light"]'
  },
  inputs: {
    username: '[placeholder="Username"]', //ideally, we should use a better selector here (in case the placeholder changes)
    email: '[placeholder="Email"]',
    password: '[placeholder="Password"]'
  }
}

export default class Signup {

  static clickSignupLink() {
    cy.get(elements.anchors.signup).click()
  }

  static assertSignupPage() {
    cy.get(elements.divs.authPage).should('contain','Sign up')
    cy.url().should('contain', '/register')
  }

  static fillSignupForm(username, email, password) {
    cy.get(elements.inputs.username).type(username)
    cy.get(elements.inputs.email).type(email)
    cy.get(elements.inputs.password).type(password)
  }

  static clickSignupBtn() {
    cy.get(elements.buttons.signupBtn).contains('Sign up').click()
  }

  static assertSignedUp(username) {
    cy.get(elements.anchors.navBar).contains(username)
  }

  static signupViaAPI(username, email, password) {
    cy.request(signupAPI(username, email, password))
      .then(response => {
        expect(response.status).to.eq(201)
      })
  }

}