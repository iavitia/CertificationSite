class BasePage {
  elements = []
  url = ''

  open() {
    cy.visit(this.url)
  }
}

export default BasePage
