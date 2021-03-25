import { CommonPage } from "./common-page";

export class LoginPage extends CommonPage {
  
  getPageUrl = () => '/'

  getLogoImg = () => cy.get('img[class="logo"]')

  getApiKeyInput = () => cy.get('input[name="api_key"]')

  getSubmitButton = () => cy.get('input[type="submit"]')

  getErrorMessage = () => cy.get('p.message')

  // Actions

  login = () => {
    this.getApiKeyInput()
        .type(Cypress.env('API_KEY'))
    this.getSubmitButton()
        .click()
  }

}