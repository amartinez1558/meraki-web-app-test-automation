import { DevicesListPage } from './../../pages/devices-list-page';
import { DeviceDetailsPage } from "../../pages/device-details-page";
import { LoginPage } from '../../pages/login-page';

describe('Devices Details', () => {

  let pg: DeviceDetailsPage
  let testDevice: { name?: string, ip?: string }

  before(() => {
    const loginPage = new LoginPage()
    loginPage.visit()
    loginPage.login()
    // Save session to prevent having to relogin after each test
    cy.storeSessionCookie() 
    pg = new DeviceDetailsPage();
    // Could visit url directly to save time
    // But without api, not able to dynamically get these values instead of hard coded
    // pg.visit({ network_id: 'L_575334852396581596', serial: 'Q2FD-TR63-PBC2'})  
    
    visitDeviceFromListPage(0) 
  })

  beforeEach(() => {
    cy.applySessionCookie()
  })

  const visitDeviceFromListPage = (index: number) => {
    const deviceListPage = new DevicesListPage();
    deviceListPage.visit()
    
    // Set up data for device
    // Usually this is best done through API, but we just have access to the UI
    testDevice = {}
    deviceListPage
      .getDeviceNameField(index)
      .then(nameField => testDevice.name = nameField.text())
    deviceListPage
      .getDeviceIpField(index)
      .then(ipField => testDevice.ip = ipField.text())

    // Navigate to device
    deviceListPage
      .getDeviceByIndex(0)
      .click()
  }

  describe('Fields', () => {

    it('has the header: Device Details', () => {
      pg.getPageHeader()
        .should('be.visible')
        .should('have.text', 'Device Details')
    })
  
    it('has an image', () => {
      const imageSrc = '/MR34.png'
      pg.getImage()
        .should('be.visible')
        .should('have.attr', 'src', imageSrc)
    })
  
    it('has a name field', () => {
      pg.getNameField()
        .should('be.visible')
        .should('have.text', testDevice.name)
        .should('have.css', 'font-weight', '700') // bold
    })
  
    it('has a valid IP address field', () => {
      pg.getIpField()
        .should('be.visible')
        .should('have.text', testDevice.ip)
        .invoke('text')
        .validateIpAddress()
  
    })
  
    it('has a serial number field', () => {
      pg.getSerialField()
        .should('be.visible')
        .should('contain.text', 'Serial: ')
        .invoke('text')
        .should('match', /Serial: [A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}$/)
    })
  })
  
  describe('Live Updates', () => {

    beforeEach(() => {
      visitDeviceFromListPage(0)
    })

    const waitUntilValueUpdated = (currentValue: string, updateValueFn: () => Cypress.Chainable<string>) => {
      cy.waitUntil(() => updateValueFn().then(updatedValue => currentValue != updatedValue), {
        interval: 2000, // Check every 2 seconds
        timeout: 20000, // 20 Seconds
        errorMsg: `Was expecting the value ${currentValue} to be updated! But it never was...`
      })
    }
  
    it('has a clients field with a value that updates', () => {
      pg.getClientsField()
        .should('be.visible')
        .should('contain.text', 'Clients: -') // Initial value until loaded
      pg.getClientsValue()
        .invoke('text')
        .should('match', /\d+/)
        .then(clientsValue => {
          waitUntilValueUpdated(clientsValue, () => pg.getClientsValue().invoke('text'))
        })
    })
  
    it('has a usage field with a value that updates', () => {
      pg.getUsageField()
        .should('be.visible')
        .should('contain.text', 'Usage: -') // Initial value until loaded
      pg.getUsageValue()
        .invoke('text')
        .should('match', /\d+\.\d+ (KiB|MiB|GiB)/)
        .then(usageValue => {
          waitUntilValueUpdated(usageValue, () => pg.getUsageValue().invoke('text'))
        })
    })
  })

  
})