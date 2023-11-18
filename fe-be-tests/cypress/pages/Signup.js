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
    username: '[placeholder="Username"]',
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

  static signupAPI(username, email, password) {
    cy.request({
      method: 'POST',
      url: 'https://api.realworld.io/api/users',
      body: {
        "user": {
          "email": email,
          "password": password,
          "username": username
        }
      }
    }).then(response => {
      expect(response.status).to.eq(201)
    })
  }

}