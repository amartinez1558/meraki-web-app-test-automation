export class CommonPage {

  getPageUrl = (params?: any) => '/'

  visit(params?: any) {
    cy.visit(this.getPageUrl(params))
  }
}