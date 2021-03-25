import { CommonPage } from "./common-page";

type PageParams = { network_id: string, serial: string }

export class DeviceDetailsPage extends CommonPage {

  getPageUrl = (params: PageParams) => `/networks/${params.network_id}/devices/${params.serial}`

  visit = (params: PageParams) => CommonPage.prototype.visit.call(this, params) 

  getPageHeader = () => cy.get('h1')

  getDevice = () => cy.get('#device')

  getImage = () => this.getDevice().find('div.image img')

  getNameField = () => this.getDevice().find('p.name')

  getIpField = () => this.getDevice().find('p').eq(2) // hacky solution

  getSerialField = () => this.getDevice().contains('p', 'Serial:')

  getClientsField = () => this.getDevice().contains('p', 'Clients:')

  getClientsValue = () => cy.get('span.clients')

  getUsageField = () => this.getDevice().contains('p', 'Usage:')

  getUsageValue = () => cy.get('span.usage')
}