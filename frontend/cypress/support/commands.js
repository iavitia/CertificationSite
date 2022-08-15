Cypress.Commands.add('sel', (selector, ...args) => {
  return cy.get(`[data-cy=${selector}]`, ...args)
})

Cypress.Commands.add('selLike', (selector, ...args) => {
  return cy.get(`[data-cy*=${selector}]`, ...args)
})

Cypress.Commands.add('muiError', (key, message) => {
  cy.get(`#mui-${key}-helper-text`).should('contain', message)
})
