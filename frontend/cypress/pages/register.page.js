import BasePage from './base.page'

class Register extends BasePage {
  constructor() {
    super()

    this.url = '/register'

    this.elements = {
      username: '[data-cy=username] > div > input',
      email: '[data-cy=email] > div > input',
      password: '[data-cy=password] > div > input',
      register: 'submitRegister'
    }
  }

  username() {
    return cy.get(this.elements.username)
  }

  email() {
    return cy.get(this.elements.email)
  }

  password() {
    return cy.get(this.elements.password)
  }

  submit() {
    return cy.sel(this.elements.register)
  }

  register(username, email, password) {
    this.username().type(username)
    this.email().type(email)
    this.password().type(password)
    this.submit().click()
  }
}

export default Register
