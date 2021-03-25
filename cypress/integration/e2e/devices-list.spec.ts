import { DeviceDetailsPage } from "../../pages/device-details-page"
import { DevicesListPage } from "../../pages/devices-list-page"
import { LoginPage } from "../../pages/login-page"

describe('Devices List', () => {

  let pg: DevicesListPage

  before(() => {
    const loginPage = new LoginPage()
    loginPage.visit()
    loginPage.login()
    // Save session to prevent having to relogin after each test
    cy.storeSessionCookie()
  })

  beforeEach(() => {
    cy.applySessionCookie()
    pg = new DevicesListPage()
    // pg.visit() // not necessary to reset after the given tests (makes tests faster)
  })

  it('has the header: Devices', () => {
    pg.getPageHeader()
      .should('be.visible')
      .should('have.text', 'Devices')
  })

  it('lists the devices', () => {
    pg.getDeviceList()
      .should('have.length.greaterThan', 0)
      .first()
      .should('be.visible')
  })

  it('can show the device images', () => {
    const imageSrc = '/MR34.png'
    pg.getDeviceList()
      .each(device => {
        cy.wrap(device)
          .find('div.image img')
          .should('be.visible')
          .should('have.attr', 'src', imageSrc)
      })
  })

  it('shows each device name', () => {
    pg.getDeviceList()
      .each(device => {
        cy.wrap(device)
          .find('div.details')
          .should('be.visible')
          .find('p.name')
          .should('have.css', 'font-weight', '700') // bold
          .invoke('text')
          .should('match', /\w+/)
      })
  })

  it('shows a valid IP address for each device', () => {
    pg.getDeviceList()
      .each(device => {
        cy.wrap(device)
          .find('div.details')
          .find('p')
          .eq(2)
          .invoke('text')
          .validateIpAddress()
      })
  })

  it('can click on each device and navigate to details', () => {
    pg.getDeviceList()
      .its('length')
      .then(numDevices => {
        const deviceDetailsPage = new DeviceDetailsPage()
        // Check each device navigation verify name
        for (let i = 0; i < numDevices; i++) {
          pg.getDeviceNameField(i)
            .invoke('text')
            .then(deviceName => {
              pg.getDeviceByIndex(i)
                .click()
              deviceDetailsPage
                .getPageHeader()
                .should('have.text', 'Device Details')
              deviceDetailsPage
                .getNameField()
                .should('contain.text', deviceName)
              pg.visit() // go back and check other devices
            })
        }
      })
  })

  it('cannot access directly without authentication', () => {
    cy.clearSessionCookie()
    pg.visit()
    const loginPage = new LoginPage()
    loginPage
      .getApiKeyInput()
      .should('be.visible')
  
  })
})