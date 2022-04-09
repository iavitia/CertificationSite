/// <reference types="cypress"/>
import faker from '@faker-js/faker'

describe('Login', () => {
  let randomNum = faker.random.number({ min: 10, max: 100 })
  beforeEach(() => {
    cy.visit('/register')
  })

  it('Register successful', () => {
    cy.fixture('userData').then((data) => {
      cy.sel('username').type(data.username + randomNum)
      cy.sel('email').type(`TestEmail${randomNum}@test.com`)
      cy.sel('password').type(data.password)
      cy.sel('submitRegister').click()
      cy.url().should('include', '/')
    })
  })

  it('Empty input errors', () => {
    cy.url().should('contain', '/register')

    cy.sel('submitRegister').click()

    cy.url().should('contain', '/register')
    cy.muiError(1, 'Username is required')
    cy.muiError(2, 'Email is required')
    cy.muiError(3, 'Password is required')
  })

  it('Username - invalid special characters', () => {
    cy.fixture('userData').then((data) => {
      cy.sel('username').type(data.usernameBadChar)
      cy.sel('email').type(data.email)
      cy.sel('password').type(data.password)
      cy.sel('submitRegister').click()

      cy.muiError(
        1,
        'Letters, numbers, dashes, and underscores only. Please try again without symbols.'
      )
    })
  })

  it('Username - too short', () => {
    cy.fixture('userData').then((data) => {
      cy.sel('username').type(data.usernameShort)
      cy.sel('email').click().type(data.email)
      cy.sel('password').type(data.password)
      cy.sel('submitRegister').click()

      cy.muiError(1, 'Username must be at least 3 characters')
    })
  })
  it('Username - too long', () => {
    cy.fixture('userData').then((data) => {
      cy.sel('username').type(data.usernameLong)
      cy.sel('email').click().type(data.email)
      cy.sel('password').type(data.password)
      cy.sel('submitRegister').click()

      cy.muiError(1, 'Username cannot be longer than 20 characters')
    })
  })

  it('Email - invalid email', () => {
    cy.fixture('userData').then((data) => {
      cy.sel('username').type(data.username)
      cy.sel('email').click().type(data.emailBad)
      cy.sel('password').type(data.password)
      cy.sel('submitRegister').click()

      cy.muiError(2, 'Enter a valid email address')
    })
  })

  it('Password - Too short', () => {
    cy.fixture('userData').then((data) => {
      cy.sel('username').type(data.username)
      cy.sel('email').click().type(data.email)
      cy.sel('password').type(data.passwordShort)
      cy.sel('submitRegister').click()

      cy.muiError(3, 'Password must be at least 8 characters')
    })
  })
})
