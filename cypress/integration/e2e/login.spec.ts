import { DevicesListPage } from "../../pages/devices-list-page";
import { LoginPage } from "../../pages/login-page";

describe('Login', () => {

  let pg: LoginPage;

  beforeEach(() => {
    pg = new LoginPage();
    pg.visit()
  })

  it('shows the Cisco Meraki Logo', () => {
    const merakiSrc = 'meraki.png'
    pg.getLogoImg()
      .should('be.visible')
      .should('have.attr', 'src', merakiSrc)
  })

  it('has an api key field with placeholder', () => {
    pg.getApiKeyInput()
      .should('be.visible')
      .should('have.attr', 'placeholder', 'API Key')
  })

  it('has a submit button', () => {
    pg.getSubmitButton()
      .should('be.visible')
      .should('have.attr', 'type', 'submit')
  })

  describe('Login Functionality', () => {

    const verifyLoggedIn = () => {
      pg.getApiKeyInput()
        .should('not.exist')
      const devicesListPage = new DevicesListPage()
      devicesListPage
        .getPageHeader()
        .should('have.text', 'Devices')
    }

    it('can login using a valid api key', () => {
      pg.getApiKeyInput()
        .type(Cypress.env('API_KEY'))
      pg.getSubmitButton()
        .click()
      verifyLoggedIn()
    })
  
    it('can stay logged in after refresh', () => {
      pg.getApiKeyInput()
        .type(Cypress.env('API_KEY'))
      pg.getSubmitButton()
        .click()
      verifyLoggedIn()
      cy.reload()
      verifyLoggedIn()
    })

    describe('Login Failure', () => {

      const verifyNotLoggedIn = () => {
        pg.getApiKeyInput()
          .should('exist')
        pg.getErrorMessage()
          .should('have.text', 'Invalid API key')
        const devicesListPage = new DevicesListPage()
        devicesListPage
          .getPageHeader()
          .should('not.exist')
      }

      it('cannot login without an api key', () => {
        pg.getSubmitButton()
          .click()
        verifyNotLoggedIn()
      })
    
      const invalidKeys = [
        'asdfghjkl',
        '0',
        '    ',
        Cypress.env('API_KEY') + '1',
      ]
      invalidKeys.forEach(invalidKey => {
        it('cannot login with invalid api key: ' + invalidKey, () => {
          pg.getApiKeyInput()
            .type(invalidKey)
          pg.getSubmitButton()
            .click()
          verifyNotLoggedIn()
        })
      })
    })
  })
})