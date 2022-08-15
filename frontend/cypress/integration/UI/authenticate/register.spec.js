/// <reference types="cypress"/>

import faker from '@faker-js/faker'
import Register from '../../../pages/register.page'

describe('Login', () => {
  const reg = new Register()
  let randomNum = faker.random.number({ min: 10, max: 100 })
  beforeEach(() => {
    cy.visit('/register')
  })

  it('Register successful', () => {
    cy.fixture('userData').then((data) => {
      reg.register(
        data.username + randomNum,
        `TestEmail${randomNum}@test.com`,
        data.password
      )

      cy.url().should('equal', Cypress.config('baseUrl'))
    })
  })

  it('Empty input errors', () => {
    reg.submit().click()

    cy.url().should('contain', reg.url)
    cy.muiError(1, 'Username is required')
    cy.muiError(2, 'Email is required')
    cy.muiError(3, 'Password is required')
  })

  it('Username - invalid special characters', () => {
    cy.fixture('userData').then((data) => {
      reg.register(data.usernameBadChar, data.email, data.password)

      cy.muiError(
        1,
        'Letters, numbers, dashes, and underscores only. Please try again without symbols.'
      )
    })
  })

  it('Username - too short', () => {
    cy.fixture('userData').then((data) => {
      reg.register(data.usernameShort, data.emailBad, data.password)

      cy.muiError(1, 'Username must be at least 3 characters')
    })
  })
  it('Username - too long', () => {
    cy.fixture('userData').then((data) => {
      reg.register(data.usernameLong, data.email, data.password)

      cy.muiError(1, 'Username cannot be longer than 20 characters')
    })
  })

  it('Email - invalid email', () => {
    cy.fixture('userData').then((data) => {
      reg.register(data.username, data.emailBad, data.password)

      cy.muiError(2, 'Enter a valid email address')
    })
  })

  it('Password - too short', () => {
    cy.fixture('userData').then((data) => {
      reg.register(data.username, data.email, data.passwordShort)

      cy.muiError(3, 'Password must be at least 8 characters')
    })
  })
})
