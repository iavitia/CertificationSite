/// <reference types="cypress"/>

describe("Login", () => {
  beforeEach(() => {
    cy.visit("/login")
  })

  it("Login successful", () => {
    cy.fixture("userData").then((data) => {
      cy.sel("username").type(data.username)
      cy.sel("password").type(data.password)
      cy.sel("submitLogin").click()
      cy.url().should("include", "/dashboard")
    })
  })

  it("Empty input errors", () => {
    cy.url().should("contain", "/login")
    cy.sel("submitLogin").click()
    cy.url().should("contain", "/login")
    cy.muiError(1, "Username is required")
    cy.muiError(2, "Password is required")
  })

  it("Password input errors", () => {
    cy.fixture("userData").then((data) => {
      cy.sel("username").type(data.username)
      cy.sel("submitLogin").click()
      cy.muiError(2, "Password is required")
    })
  })

  it("Username input errors", () => {
    cy.fixture("userData").then((data) => {
      cy.sel("password").type(data.password)
      cy.sel("submitLogin").click()
      cy.muiError(1, "Username is required")
    })
  })
})
