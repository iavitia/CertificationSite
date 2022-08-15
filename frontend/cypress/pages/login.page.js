import BasePage from './base.page'

class Login extends BasePage {
  constructor() {
    super()

    this.url = '/login'

    this.elements = {
      username: '[data-cy=username] > div > input',
      password: '[data-cy=password] > div > input',
      login: 'submitLogin',
      error: 'loginError',
      showPassword: 'showPassword'
    }
  }

  username() {
    return cy.get(this.elements.username)
  }

  password() {
    return cy.get(this.elements.password)
  }

  loginButton() {
    return cy.sel(this.elements.login)
  }

  errorAlert() {
    return cy.sel(this.elements.error)
  }

  showPassword() {
    return cy.sel(this.elements.showPassword)
  }

  login(username, password) {
    this.username().type(username)
    this.password().type(password)
    this.loginButton().click()
  }
}

export default Login
