import { CommonPage } from "./common-page";

export class DevicesListPage extends CommonPage {

  getPageUrl = () => '/devices'

  getPageHeader = () => cy.get('h1')

  getDeviceList = () => cy.get('div.devices a')

  getDeviceByIndex = (index: number) => this.getDeviceList().eq(index)

  getDeviceNameField = (index: number) => {
    const deviceName = 
      this.getDeviceByIndex(index)
          .find('div.details')
          .should('be.visible')
          .find('p.name')
    return deviceName
  }

  getDeviceIpField = (index: number) => {
    const deviceName = 
      this.getDeviceByIndex(index)
          .find('div.details')
          .should('be.visible')
          .find('p')
          .eq(2) // Unfortunately no id to choose from : (
    return deviceName
  }
}