/// <reference types="cypress"/>

import Login from '../../pages/login.page'

describe('Login', () => {
  const login = new Login()

  beforeEach(() => {
    login.open()
  })

  it('Login is successful', () => {
    cy.fixture('userData').then((data) => {
      login.login(data.username, data.password)
      cy.url().should('equal', Cypress.config('baseUrl'))
    })
  })

  it('Password blank input errors', () => {
    cy.fixture('userData').then((data) => {
      login.username().type(data.username)
      login.loginButton().click()
      cy.muiError(2, 'Password is required')
    })
  })

  it('Username blank input errors', () => {
    cy.fixture('userData').then((data) => {
      login.password().type(data.password)
      login.loginButton().click()
      cy.muiError(1, 'Username is required')
    })
  })

  it('Invalid credentials', () => {
    cy.fixture('userData').then((data) => {
      login.errorAlert().should('not.exist')
      login.username().type(data.username)
      login.password().type('fail')
      login.loginButton().click()

      login
        .errorAlert()
        .should('exist')
        .should('contain', 'Incorrect username or password')
    })
  })

  it('Toggle password visibility', () => {
    login.password().should('have.attr', 'type', 'password')
    login.password().type('Password!')
    login.showPassword().click()

    login.password().should('have.attr', 'type', 'text')

    login.showPassword().click()
    login.password().should('have.attr', 'type', 'password')
  })
})
